import { NextResponse } from "next/server";
import Stripe from "stripe";
import { findVariant } from "@/lib/products";
import { site } from "@/lib/site";

/**
 * Creates a Stripe Checkout Session for the cart and returns its URL.
 *
 * The request body carries only variant ids and quantities. Every price, name
 * and weight is looked up from our own catalog here on the server, so editing
 * the cart in localStorage or devtools cannot change what a shopper is charged.
 */

/** Flat-rate domestic shipping. Adjust once real postage costs are known. */
const SHIPPING = {
  standardCents: 995,
  /** Orders at or above this subtotal ship free. */
  freeOverCents: 7500,
  minDays: 3,
  maxDays: 6,
};

const MAX_QUANTITY_PER_LINE = 99;

type RequestBody = { lines?: { variantId?: unknown; quantity?: unknown }[] };

export async function POST(request: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    // Missing configuration is our problem, not the shopper's — but don't leak
    // details to the browser.
    console.error("STRIPE_SECRET_KEY is not set; cannot create a checkout session.");
    return NextResponse.json(
      { error: "Checkout is not configured yet." },
      { status: 503 }
    );
  }

  let body: RequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!Array.isArray(body.lines) || body.lines.length === 0) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  let subtotalCents = 0;

  for (const line of body.lines) {
    if (typeof line?.variantId !== "string") {
      return NextResponse.json({ error: "Invalid cart item." }, { status: 400 });
    }

    const quantity = Number(line.quantity);
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > MAX_QUANTITY_PER_LINE) {
      return NextResponse.json({ error: "Invalid quantity." }, { status: 400 });
    }

    const found = findVariant(line.variantId);
    if (!found) {
      return NextResponse.json(
        { error: "One of those items is no longer available." },
        { status: 400 }
      );
    }

    const { product, variant } = found;
    subtotalCents += variant.priceCents * quantity;

    lineItems.push({
      quantity,
      price_data: {
        currency: "usd",
        unit_amount: variant.priceCents,
        product_data: {
          name:
            product.variants.length > 1
              ? `${product.name} — ${variant.label}`
              : product.name,
          description: product.tagline,
          images: [`${site.url}${product.images[0].src}`],
          metadata: { handle: product.handle, variantId: variant.id },
        },
      },
    });
  }

  const shippingCents =
    subtotalCents >= SHIPPING.freeOverCents ? 0 : SHIPPING.standardCents;

  const stripe = new Stripe(secretKey);
  const origin =
    request.headers.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
      // Marzipan is perishable and made to order, so we ship domestically only.
      shipping_address_collection: { allowed_countries: ["US"] },
      phone_number_collection: { enabled: true },
      allow_promotion_codes: true,
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            display_name:
              shippingCents === 0 ? "Free shipping" : "Standard shipping",
            fixed_amount: { amount: shippingCents, currency: "usd" },
            delivery_estimate: {
              minimum: { unit: "business_day", value: SHIPPING.minDays },
              maximum: { unit: "business_day", value: SHIPPING.maxDays },
            },
          },
        },
      ],
      custom_text: {
        submit: {
          message:
            "Everything is handmade to order. Please allow 2 business days for processing before your order ships.",
        },
      },
    });

    if (!session.url) {
      throw new Error("Stripe returned a session without a URL.");
    }

    return NextResponse.json({ url: session.url });
  } catch (cause) {
    console.error("Failed to create Stripe checkout session:", cause);
    return NextResponse.json(
      { error: "We couldn't start checkout." },
      { status: 502 }
    );
  }
}

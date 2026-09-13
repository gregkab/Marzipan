import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { SquareClient, SquareEnvironment, SquareError } from "square";
import { findVariant } from "@/lib/products";
import { site } from "@/lib/site";

/**
 * Creates a Square-hosted checkout page (a "payment link") for the cart and
 * returns its URL.
 *
 * The request body carries only variant ids and quantities. Every price, name
 * and weight is looked up from our own catalog here on the server, so editing
 * the cart in localStorage or devtools cannot change what a shopper is charged.
 */

/**
 * Flat-rate domestic shipping.
 *
 * $12.95 is anchored to a real number: USPS's retail Small Priority Mail
 * Flat Rate box was $13.65 as of July 2026 (usps.com), with online/commercial
 * rates (Pirate Ship, Shippo, Square's own shipping labels) typically 10–15%
 * below retail. This still isn't final — it assumes the actual packed box
 * fits a Small Flat Rate box. Weigh a real packed order and compare against
 * https://ship.pirateship.com or usps.com/business before launch, especially
 * for multi-box orders or anything needing an ice pack in warm months.
 */
const SHIPPING = {
  standardCents: 1295,
  /** Orders at or above this subtotal ship free. */
  freeOverCents: 7500,
};

const MAX_QUANTITY_PER_LINE = 99;

type RequestBody = { lines?: { variantId?: unknown; quantity?: unknown }[] };

export async function POST(request: Request) {
  const accessToken = process.env.SQUARE_ACCESS_TOKEN;
  const locationId = process.env.SQUARE_LOCATION_ID;
  if (!accessToken || !locationId) {
    // Missing configuration is our problem, not the shopper's — but don't leak
    // details to the browser.
    console.error(
      "SQUARE_ACCESS_TOKEN / SQUARE_LOCATION_ID is not set; cannot create a checkout link."
    );
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

  const lineItems: {
    name: string;
    quantity: string;
    basePriceMoney: { amount: bigint; currency: "USD" };
  }[] = [];
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
      name:
        product.variants.length > 1
          ? `${product.name} — ${variant.label}`
          : product.name,
      quantity: String(quantity),
      basePriceMoney: { amount: BigInt(variant.priceCents), currency: "USD" },
    });
  }

  const shippingCents =
    subtotalCents >= SHIPPING.freeOverCents ? 0 : SHIPPING.standardCents;

  const origin =
    request.headers.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

  const client = new SquareClient({
    token: accessToken,
    environment:
      process.env.SQUARE_ENVIRONMENT === "production"
        ? SquareEnvironment.Production
        : SquareEnvironment.Sandbox,
  });

  try {
    const response = await client.checkout.paymentLinks.create({
      // A fresh key per request — retries of the same submission (a double
      // click, a flaky connection) must not create two payment links.
      idempotencyKey: randomUUID(),
      order: {
        locationId,
        lineItems,
      },
      checkoutOptions: {
        askForShippingAddress: true,
        redirectUrl: `${origin}/checkout/success`,
        merchantSupportEmail: site.email,
        acceptedPaymentMethods: {
          applePay: true,
          googlePay: true,
          cashAppPay: true,
        },
        shippingFee: {
          name: shippingCents === 0 ? "Free shipping" : "Standard shipping",
          charge: { amount: BigInt(shippingCents), currency: "USD" },
        },
      },
    });

    const url = response.paymentLink?.url;
    if (!url) {
      throw new Error("Square returned a payment link without a URL.");
    }

    return NextResponse.json({ url });
  } catch (cause) {
    console.error(
      "Failed to create Square checkout link:",
      cause instanceof SquareError ? cause.body : cause
    );
    return NextResponse.json(
      { error: "We couldn't start checkout." },
      { status: 502 }
    );
  }
}

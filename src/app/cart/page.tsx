"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { findVariant } from "@/lib/products";

export default function CartPage() {
  const { lines, ready, setQuantity, remove, subtotalCents } = useCart();
  const [checkingOut, setCheckingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const items = lines.flatMap((line) => {
    const found = findVariant(line.variantId);
    return found ? [{ ...line, ...found }] : [];
  });

  async function checkout() {
    setCheckingOut(true);
    setError(null);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines }),
      });
      const data: { url?: string; error?: string } = await response.json();
      if (!response.ok || !data.url) {
        throw new Error(data.error ?? "Checkout is unavailable right now.");
      }
      window.location.assign(data.url);
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Checkout is unavailable right now."
      );
      setCheckingOut(false);
    }
  }

  return (
    <div className="mx-auto max-w-[64rem] px-5 py-16 sm:px-8">
      <p className="eyebrow eyebrow-line">Your order</p>
      <h1 className="mt-6 font-display text-[clamp(2.25rem,5vw,3.5rem)] leading-tight text-ink">
        Cart
      </h1>

      {!ready ? (
        <p className="specimen mt-12">Loading your cart…</p>
      ) : items.length === 0 ? (
        <div className="mt-12 border border-gilt/30 bg-sugar-warm p-10 text-center">
          <p className="font-display text-2xl text-ink">Your cart is empty</p>
          <p className="mt-3 text-ink-soft">
            Everything is made to order, by hand, in San Antonio.
          </p>
          <Link href="/shop" className="btn btn-solid mt-8">
            Browse the collection
          </Link>
        </div>
      ) : (
        <>
          <ul className="mt-12 border-t border-gilt/25">
            {items.map(({ variantId, quantity, product, variant }) => (
              <li
                key={variantId}
                className="grid grid-cols-[5.5rem_1fr] gap-5 border-b border-gilt/25 py-6 sm:grid-cols-[7rem_1fr_auto] sm:gap-8"
              >
                <Link
                  href={`/products/${product.handle}`}
                  className="plinth relative aspect-square overflow-hidden"
                >
                  <Image
                    src={product.images[0].src}
                    alt={product.images[0].alt}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </Link>

                <div className="min-w-0">
                  <Link
                    href={`/products/${product.handle}`}
                    className="font-display text-xl text-ink hover:text-verd"
                  >
                    {product.name}
                  </Link>
                  {product.variants.length > 1 && (
                    <p className="specimen mt-1.5">{variant.label}</p>
                  )}
                  <p className="specimen mt-1.5">
                    {variant.pieces} pcs · {variant.grams} g
                  </p>

                  <div className="mt-4 flex items-center gap-4">
                    <div className="flex items-center border border-ink/20">
                      <button
                        type="button"
                        onClick={() => setQuantity(variantId, quantity - 1)}
                        className="px-3 py-1.5 font-data text-sm hover:bg-almond"
                        aria-label={`Decrease ${product.name} quantity`}
                      >
                        −
                      </button>
                      <span
                        className="min-w-10 px-2 text-center font-data text-sm"
                        aria-live="polite"
                      >
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity(variantId, quantity + 1)}
                        className="px-3 py-1.5 font-data text-sm hover:bg-almond"
                        aria-label={`Increase ${product.name} quantity`}
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => remove(variantId)}
                      className="font-data text-[0.6875rem] uppercase tracking-[0.14em] text-ink-soft underline underline-offset-4 hover:text-cherry"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <p className="col-span-2 font-data text-lg text-verd sm:col-span-1 sm:text-right">
                  {formatPrice(variant.priceCents * quantity)}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col items-end gap-4">
            <div className="flex w-full max-w-sm items-baseline justify-between">
              <span className="eyebrow">Subtotal</span>
              <span className="font-data text-2xl text-verd">
                {formatPrice(subtotalCents)}
              </span>
            </div>
            <p className="max-w-sm text-right text-sm leading-relaxed text-ink-soft">
              Shipping and tax are calculated at checkout. Orders are made to
              order and ship within 2 business days.
            </p>

            <button
              type="button"
              onClick={checkout}
              disabled={checkingOut}
              className="btn btn-solid w-full max-w-sm"
            >
              {checkingOut ? "Taking you to checkout…" : "Check out"}
            </button>

            {error && (
              <p
                role="alert"
                className="max-w-sm text-right text-sm text-cherry"
              >
                {error} Email us at marlipan22@gmail.com and we'll take your
                order directly.
              </p>
            )}

            <Link
              href="/shop"
              className="font-data text-[0.6875rem] uppercase tracking-[0.14em] text-ink-soft underline underline-offset-4 hover:text-verd"
            >
              Continue shopping
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

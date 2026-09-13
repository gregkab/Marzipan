"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/products";

export default function ProductPurchase({ product }: { product: Product }) {
  const { add } = useCart();
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);

  const variant =
    product.variants.find((v) => v.id === variantId) ?? product.variants[0];

  function handleAdd() {
    add(variant.id);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2400);
  }

  return (
    <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:gap-16">
      {/* ——— Gallery ——————————————————————————————————— */}
      <div>
        <div className="plinth relative aspect-4/5 overflow-hidden">
          <Image
            src={product.images[activeImage].src}
            alt={product.images[activeImage].alt}
            fill
            priority
            sizes="(max-width: 1024px) 92vw, 46vw"
            className="object-cover"
          />
        </div>

        {product.images.length > 1 && (
          <div className="mt-4 flex flex-wrap gap-3">
            {product.images.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setActiveImage(index)}
                aria-label={`View image ${index + 1} of ${product.images.length}`}
                aria-current={index === activeImage}
                className={`plinth relative h-20 w-20 overflow-hidden transition-opacity ${
                  index === activeImage
                    ? "opacity-100 ring-1 ring-verd"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={image.src}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ——— Purchase ——————————————————————————————————— */}
      <div className="lg:pt-4">
        <h1 className="font-display text-[clamp(2rem,4.5vw,3rem)] leading-tight text-ink">
          {product.name}
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-ink-soft">
          {product.tagline}
        </p>

        <p className="mt-6 font-data text-2xl text-verd">
          {formatPrice(variant.priceCents)}
        </p>

        <p className="specimen mt-5 border-y border-gilt/25 py-3">
          {variant.pieces} pcs · {variant.grams} g · {product.composition}
        </p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {product.dietary.map((label) => (
            <li
              key={label}
              className="border border-pistachio/45 px-3 py-1 font-data text-[0.625rem] uppercase tracking-[0.14em] text-verd"
            >
              {label}
            </li>
          ))}
        </ul>

        {product.variants.length > 1 && (
          <fieldset className="mt-8">
            <legend className="eyebrow">{product.optionName ?? "Option"}</legend>
            <div className="mt-4 flex flex-wrap gap-3">
              {product.variants.map((option) => {
                const selected = option.id === variant.id;
                return (
                  <label
                    key={option.id}
                    className={`cursor-pointer border px-4 py-3 font-data text-xs uppercase tracking-[0.12em] transition-colors ${
                      selected
                        ? "border-verd bg-verd text-sugar"
                        : "border-ink/20 text-ink-soft hover:border-verd"
                    }`}
                  >
                    <input
                      type="radio"
                      name="variant"
                      value={option.id}
                      checked={selected}
                      onChange={() => setVariantId(option.id)}
                      className="sr-only"
                    />
                    {option.label}
                    <span className="ml-2 opacity-70">
                      {formatPrice(option.priceCents)}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button type="button" onClick={handleAdd} className="btn btn-solid">
            Add to cart
          </button>
          <Link href="/cart" className="btn btn-outline">
            View cart
          </Link>
        </div>

        {/* Announced politely so it doesn't interrupt what a screen reader
            is already saying. */}
        <p
          role="status"
          aria-live="polite"
          className={`mt-4 font-data text-xs uppercase tracking-[0.14em] text-pistachio transition-opacity ${
            added ? "opacity-100" : "opacity-0"
          }`}
        >
          {added ? `${product.name} added to your cart` : ""}
        </p>

        <div className="prose-marlipan mt-10 border-t border-gilt/25 pt-8">
          {product.description.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <ul>
            {product.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

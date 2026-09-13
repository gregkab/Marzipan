import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import { startingPriceCents, type Product } from "@/lib/products";

/**
 * A product as an object in a case: photo on an almond plinth, name in the
 * display face, and a specimen line of real catalogue data underneath.
 */
export default function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  /** Set on the first row so the hero images aren't lazy-loaded. */
  priority?: boolean;
}) {
  const from = startingPriceCents(product);
  const multiplePrices = product.variants.some((v) => v.priceCents !== from);
  const [first] = product.variants;

  return (
    <Link
      href={`/products/${product.handle}`}
      className="group flex h-full flex-col"
    >
      <div className="plinth relative aspect-4/5 overflow-hidden">
        <Image
          src={product.images[0].src}
          alt={product.images[0].alt}
          fill
          priority={priority}
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>

      <div className="mt-5 flex flex-1 flex-col">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-xl text-ink">{product.name}</h3>
          <p className="font-data text-sm text-verd">
            {multiplePrices ? `from ${formatPrice(from)}` : formatPrice(from)}
          </p>
        </div>

        <p className="mt-2 pb-4 text-sm leading-relaxed text-ink-soft">
          {product.tagline}
        </p>

        <p className="specimen mt-auto border-t border-gilt/25 pt-3">
          {multiplePrices
            ? `${product.variants[0].pieces}–${
                product.variants[product.variants.length - 1].pieces
              } pcs`
            : `${first.pieces} pcs`}{" "}
          · {first.grams} g · {product.composition}
        </p>
      </div>
    </Link>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import ProductPurchase from "@/components/ProductPurchase";
import { formatPrice } from "@/lib/format";
import {
  getProduct,
  getProductHandles,
  getProducts,
  startingPriceCents,
} from "@/lib/products";
import { site } from "@/lib/site";

type Params = { params: Promise<{ handle: string }> };

export function generateStaticParams() {
  return getProductHandles().map((handle) => ({ handle }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { handle } = await params;
  const product = getProduct(handle);
  if (!product) return { title: "Not found" };

  return {
    title: product.fullTitle,
    description: product.tagline,
    openGraph: {
      title: product.fullTitle,
      description: product.tagline,
      images: [{ url: product.images[0].src }],
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: Params) {
  const { handle } = await params;
  const product = getProduct(handle);
  if (!product) notFound();

  const related = getProducts()
    .filter((p) => p.handle !== product.handle)
    .slice(0, 3);

  // Rich result for Google Shopping / search.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.fullTitle,
    description: product.tagline,
    image: product.images.map((image) => `${site.url}${image.src}`),
    brand: { "@type": "Brand", name: site.name },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: (startingPriceCents(product) / 100).toFixed(2),
      highPrice: (
        Math.max(...product.variants.map((v) => v.priceCents)) / 100
      ).toFixed(2),
      offerCount: product.variants.length,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <div className="mx-auto max-w-[76rem] px-5 py-10 sm:px-8 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav aria-label="Breadcrumb" className="specimen">
        <Link href="/shop" className="hover:text-verd">
          Shop
        </Link>
        <span aria-hidden> / </span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <ProductPurchase product={product} />

      {/* ——— The catalogue entry ——————————————————————————— */}
      <section className="mt-20 grid gap-12 border-t border-gilt/25 pt-12 md:grid-cols-3">
        <div>
          <p className="eyebrow">Ingredients</p>
          <p className="mt-4 leading-relaxed text-ink-soft">
            {product.ingredients}
          </p>
        </div>
        <div>
          <p className="eyebrow">Allergens</p>
          <p className="mt-4 leading-relaxed text-ink-soft">
            {product.allergens}
          </p>
        </div>
        <div>
          <p className="eyebrow">Freshness</p>
          <p className="mt-4 leading-relaxed text-ink-soft">
            Made to order. Please allow {site.processingDays} business days for
            processing — your marzipan is handcrafted fresh just for you.
          </p>
        </div>
      </section>

      <section className="mt-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-3xl text-ink">You might also like</h2>
          <Link
            href="/shop"
            className="border-b border-gilt pb-1 font-data text-[0.6875rem] uppercase tracking-[0.18em] text-verd"
          >
            View all
          </Link>
        </div>
        <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((item) => (
            <ProductCard key={item.handle} product={item} />
          ))}
        </div>
      </section>
    </div>
  );
}

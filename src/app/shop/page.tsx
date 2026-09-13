import type { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { getProducts } from "@/lib/products";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "The full Marlipan collection — handcrafted marzipan flowers, fruits, nests and fingers. Vegan, gluten-free, made to order.",
};

export default function ShopPage() {
  const products = getProducts();

  return (
    <div className="mx-auto max-w-[76rem] px-5 py-16 sm:px-8">
      <header className="max-w-2xl">
        <p className="eyebrow eyebrow-line">The collection</p>
        <h1 className="mt-6 font-display text-[clamp(2.25rem,5vw,3.5rem)] leading-tight text-ink">
          Every piece we make
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-ink-soft">
          Each box is made to order in {site.city} and shipped within{" "}
          {site.processingDays} business days. Everything here is vegan and
          gluten-free.
        </p>
      </header>

      <div className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, index) => (
          <Reveal key={product.handle} delay={(index % 3) * 90}>
            <ProductCard product={product} priority={index < 3} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

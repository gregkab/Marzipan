import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { getProducts } from "@/lib/products";
import { site } from "@/lib/site";

const occasions = [
  {
    title: "Baby Shower",
    copy: "Make your baby shower unforgettable with personalized marzipan in your colors.",
    image: "/images/site/occasion-baby-shower.jpg",
    alt: "Pastel marzipan favors arranged for a baby shower",
  },
  {
    title: "Finger Marzipan",
    copy: "Heart shapes and marzipan fingers, for your love.",
    image: "/images/site/occasion-fingers.jpg",
    alt: "Heart-shaped marzipan and marzipan fingers",
  },
  {
    title: "Flower Art",
    copy: "Blossoming love and passion. Each marzipan flower is a piece of art.",
    image: "/images/site/occasion-flower-art.jpg",
    alt: "Hand-sculpted marzipan flowers",
  },
  {
    title: "Gift Baskets",
    copy: "A mix-and-match basket of homemade marzipan treats, for a touch of magic.",
    image: "/images/site/occasion-gift-basket.jpg",
    alt: "A gift basket of assorted marzipan",
  },
  {
    title: "Holiday & Corporate",
    copy: "Large orders packed and ready, each box thoughtfully wrapped to deliver joy and gratitude.",
    image: "/images/site/occasion-holiday.jpg",
    alt: "Corporate marzipan boxes packed for the holidays",
  },
];

export default function HomePage() {
  const products = getProducts();

  return (
    <>
      {/* ——— Hero ——————————————————————————————————————————
          The thesis: a hand-sculpted piece, at size, next to her own sentence. */}
      <section className="border-b border-almond-deep/60 bg-sugar-warm">
        <div className="mx-auto grid max-w-[76rem] items-center gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:py-20">
          <div>
            <p className="eyebrow eyebrow-line">{site.city}</p>
            <h1 className="mt-6 font-display text-[clamp(2.5rem,6vw,4.25rem)] leading-[1.04] text-ink">
              Handcrafted marzipan
              <span className="block text-verd">delicacies.</span>
              <span className="block">Shipped fresh to your door.</span>
            </h1>
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-ink-soft">
              Marlipan creates handcrafted marzipan treats made with organic
              almonds, vegan and gluten-free ingredients. Each delicacy is
              carefully shaped to bring delight, elegance, and joy to any
              occasion — from weddings and baby showers to everyday
              celebrations.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/shop" className="btn btn-solid">
                Shop all marzipan
              </Link>
              <Link href="/our-story" className="btn btn-outline">
                Our story
              </Link>
            </div>
            <p className="specimen mt-9 border-t border-gilt/25 pt-4">
              Vegan · Gluten-free · No artificial flavors · Made to order
            </p>
          </div>

          <div className="plinth relative aspect-4/5 overflow-hidden lg:aspect-square">
            <Image
              src="/images/site/hero.jpg"
              alt="Nine hand-folded marzipan roses in a gift box"
              fill
              priority
              sizes="(max-width: 1024px) 92vw, 46vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ——— The catalogue ——————————————————————————————— */}
      <section className="mx-auto max-w-[76rem] px-5 py-20 sm:px-8">
        <Reveal>
          <p className="eyebrow eyebrow-line">The collection</p>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
            <h2 className="max-w-xl font-display text-[clamp(2rem,4vw,3rem)] leading-tight text-ink">
              Nine things, each shaped by hand
            </h2>
            <Link
              href="/shop"
              className="border-b border-gilt pb-1 font-data text-[0.6875rem] uppercase tracking-[0.18em] text-verd"
            >
              View all
            </Link>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <Reveal key={product.handle} delay={(index % 3) * 90}>
              <ProductCard product={product} priority={index < 3} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ——— Tradition ————————————————————————————————————
          The one inverted band on the page. Her history copy, set narrow. */}
      <section className="on-verd bg-verd text-almond">
        <div className="mx-auto grid max-w-[76rem] items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div className="relative aspect-4/5 overflow-hidden">
            <Image
              src="/images/site/tradition.png"
              alt="Raw almonds and pistachios arranged in the shape of a heart"
              fill
              sizes="(max-width: 1024px) 92vw, 42vw"
              className="object-cover"
            />
          </div>

          <Reveal>
            <p className="eyebrow !text-gilt">Tradition · since the 1600s</p>
            <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3rem)] leading-tight text-sugar">
              A famine, a flour shortage, and a better idea
            </h2>
            <div className="mt-7 space-y-5 text-[1.0625rem] leading-relaxed text-almond/85">
              <p>
                During the 17th century famine, the senate of Lübeck, Germany
                ordered bakers to create a replacement for flour, which had
                become scarce. The substitution they came up with was almond
                flour.
              </p>
              <p>
                German bakers began making marzipan cookies with almond flour
                and it became very popular. Italy, Spain, and the Middle East
                have all made their own claims to inventing marzipan. The craft
                continued as a family tradition, and it still is today.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ——— Occasions ————————————————————————————————————— */}
      <section className="mx-auto max-w-[76rem] px-5 py-20 sm:px-8">
        <Reveal>
          <p className="eyebrow eyebrow-line">Occasions</p>
          <h2 className="mt-6 max-w-2xl font-display text-[clamp(2rem,4vw,3rem)] leading-tight text-ink">
            Made for the day you're marking
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {occasions.map((occasion, index) => (
            <Reveal key={occasion.title} delay={(index % 3) * 90}>
              <article>
                <div className="plinth relative aspect-square overflow-hidden">
                  <Image
                    src={occasion.image}
                    alt={occasion.alt}
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-5 font-display text-xl text-ink">
                  {occasion.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {occasion.copy}
                </p>
              </article>
            </Reveal>
          ))}

          <Reveal delay={180}>
            <article className="flex h-full flex-col justify-center border border-gilt/30 bg-sugar-warm p-8">
              <p className="eyebrow">Something else in mind?</p>
              <h3 className="mt-4 font-display text-2xl leading-snug text-ink">
                Custom colors, shapes, and corporate gifting
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                Weddings, bridal showers, branded packaging, holiday platters,
                and wholesale for Texas boutiques and cafés.
              </p>
              <Link href="/custom-orders" className="btn btn-outline mt-6 self-start">
                Talk to us
              </Link>
            </article>
          </Reveal>
        </div>
      </section>

      {/* ——— Maker's note ————————————————————————————————— */}
      <section className="border-t border-almond-deep/60 bg-sugar-warm">
        <div className="mx-auto grid max-w-[76rem] items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow eyebrow-line">A small, woman-owned kitchen</p>
            <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3rem)] leading-tight text-ink">
              Every piece is shaped and decorated by hand
            </h2>
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-ink-soft">
              Premium organic almonds, orange blossom or rose water, and
              all-natural ingredients — sun-dried cherries, blueberries, and
              apricots. Entirely vegan and gluten-free, with no artificial
              flavors, ever.
            </p>
            <Link href="/our-story" className="btn btn-solid mt-8">
              Read our story
            </Link>
          </Reveal>

          <div className="relative aspect-4/3 overflow-hidden">
            <Image
              src="/images/site/gifting.jpg"
              alt="Marzipan lemons and tangerines shaped by hand"
              fill
              sizes="(max-width: 1024px) 92vw, 42vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}

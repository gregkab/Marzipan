import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Marlipan was born in San Antonio, Texas, from a simple idea: to bring truly beautiful, handcrafted marzipan to people across the United States.",
};

const specialties = [
  {
    title: "Custom colors & shapes",
    copy: "For weddings, bridal showers, and baby showers.",
  },
  {
    title: "Corporate gifting",
    copy: "Elegant boxes with custom brand packaging.",
  },
  {
    title: "Holiday platters",
    copy: "Seasonal gift boxes for family gatherings.",
  },
  {
    title: "Wholesale",
    copy: "For Texas boutiques, cafés, and markets.",
  },
];

export default function OurStoryPage() {
  return (
    <>
      <section className="border-b border-almond-deep/60 bg-sugar-warm">
        <div className="mx-auto grid max-w-[76rem] items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-20 lg:py-24">
          <div>
            <p className="eyebrow eyebrow-line">Since 2022 · {site.city}</p>
            <h1 className="mt-6 font-display text-[clamp(2.25rem,5.5vw,4rem)] leading-[1.06] text-ink">
              The story of Marlipan
            </h1>
            <p className="mt-7 text-lg leading-relaxed text-ink-soft">
              Marlipan was born in San Antonio, Texas, from a simple but
              powerful idea: to bring truly beautiful, handcrafted marzipan to
              people across the United States.
            </p>
          </div>

          <div className="plinth relative aspect-4/3 overflow-hidden">
            <Image
              src="/images/site/workshop.jpg"
              alt="Handcrafted marzipan from the Marlipan kitchen"
              fill
              priority
              sizes="(max-width: 1024px) 92vw, 46vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[76rem] px-5 py-20 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          <Reveal>
            <div className="prose-marlipan max-w-xl text-[1.0625rem]">
              <p>
                Every piece is shaped and decorated by hand, using only premium
                organic almonds, orange blossom water or rose water, and
                all-natural ingredients — including sun-dried cherries,
                blueberries, and apricots.
              </p>
              <p>
                Our recipes are entirely vegan and gluten-free, crafted
                carefully with no artificial flavors, ever.
              </p>
              <p>
                Whether you're looking for an elegant gift, a unique party
                favor, or a special treat for yourself, each Marlipan creation
                is made with care and attention to detail.
              </p>
              <p className="font-display text-2xl leading-snug !text-ink">
                Thank you for supporting a small, woman-owned business. It truly
                means everything.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative aspect-3/4 overflow-hidden">
              <Image
                src="/images/site/holiday-table.jpg"
                alt="A holiday table set with Marlipan marzipan"
                fill
                sizes="(max-width: 1024px) 92vw, 40vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ——— How to order ————————————————————————————————— */}
      <section className="on-verd bg-verd text-almond">
        <div className="mx-auto max-w-[76rem] px-5 py-20 sm:px-8">
          <Reveal>
            <p className="eyebrow !text-gilt">How to order</p>
            <h2 className="mt-6 max-w-2xl font-display text-[clamp(2rem,4vw,3rem)] leading-tight text-sugar">
              Simple and easy
            </h2>
            <p className="mt-7 max-w-2xl text-[1.0625rem] leading-relaxed text-almond/85">
              Browse the collection and pick your favorites, or reach out
              directly for custom orders, special events, or bulk quantities. We
              lovingly pack and ship every order fresh, straight from our San
              Antonio kitchen to your door across the United States.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {specialties.map((item, index) => (
              <Reveal key={item.title} delay={index * 80}>
                <div className="border-t border-gilt/40 pt-5">
                  <h3 className="font-display text-xl text-sugar">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-almond/75">
                    {item.copy}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="btn bg-almond text-verd hover:bg-sugar"
            >
              Shop the collection
            </Link>
            <Link
              href="/custom-orders"
              className="btn border-almond/40 text-almond hover:bg-almond hover:text-verd"
            >
              Ask about custom orders
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

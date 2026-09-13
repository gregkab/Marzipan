import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Occasions",
  description:
    "Marzipan for weddings, baby showers, corporate gifting and the holidays — custom colors, shapes and packaging from Marlipan in San Antonio.",
};

const occasions = [
  {
    title: "Baby Showers",
    copy: "Personalized marzipan in your colors, shaped to match the theme of the day. A favor guests remember and photograph before they eat it.",
    image: "/images/site/occasion-baby-shower.jpg",
    alt: "Pastel marzipan favors arranged for a baby shower",
  },
  {
    title: "Weddings & Bridal Showers",
    copy: "Hearts and marzipan fingers for the table, or flower boxes as favors. We match custom colors and shapes to your palette.",
    image: "/images/site/occasion-fingers.jpg",
    alt: "Heart-shaped marzipan and marzipan fingers",
  },
  {
    title: "Flower Art",
    copy: "Blossoming love and passion. Each marzipan flower is folded petal by petal — a piece of art that happens to be edible.",
    image: "/images/site/occasion-flower-art.jpg",
    alt: "Hand-sculpted marzipan flowers",
  },
  {
    title: "Made-For-You Gift Baskets",
    copy: "A delightful mix-and-match basket of our homemade marzipan treats, assembled for a touch of magic.",
    image: "/images/site/occasion-gift-basket.jpg",
    alt: "A gift basket of assorted marzipan",
  },
  {
    title: "Holiday & Corporate Orders",
    copy: "Large orders packed and ready. Each box is thoughtfully packaged — with your branding, if you like — to deliver joy and gratitude.",
    image: "/images/site/occasion-holiday.jpg",
    alt: "Corporate marzipan boxes packed for the holidays",
  },
];

export default function OccasionsPage() {
  return (
    <div className="mx-auto max-w-[76rem] px-5 py-16 sm:px-8">
      <header className="max-w-2xl">
        <p className="eyebrow eyebrow-line">Occasions</p>
        <h1 className="mt-6 font-display text-[clamp(2.25rem,5vw,3.5rem)] leading-tight text-ink">
          Made for the day you're marking
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-ink-soft">
          Custom colors, custom shapes, custom packaging. Tell us the occasion
          and we'll tell you what's possible.
        </p>
      </header>

      <div className="mt-16 space-y-20">
        {occasions.map((occasion, index) => (
          <Reveal key={occasion.title}>
            <article
              className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                index % 2 === 1 ? "lg:[&>figure]:order-2" : ""
              }`}
            >
              <figure className="plinth relative aspect-4/3 overflow-hidden">
                <Image
                  src={occasion.image}
                  alt={occasion.alt}
                  fill
                  sizes="(max-width: 1024px) 92vw, 46vw"
                  className="object-cover"
                />
              </figure>
              <div>
                <p className="specimen">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-4 font-display text-[clamp(1.75rem,3.5vw,2.5rem)] leading-tight text-ink">
                  {occasion.title}
                </h2>
                <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft">
                  {occasion.copy}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="mt-24 border border-gilt/30 bg-sugar-warm p-10 text-center sm:p-14">
        <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] leading-tight text-ink">
          Planning something?
        </h2>
        <p className="mx-auto mt-4 max-w-lg leading-relaxed text-ink-soft">
          Send us the date, the count, and the colors. We'll come back with
          options and pricing.
        </p>
        <Link href="/custom-orders" className="btn btn-solid mt-8">
          Start a custom order
        </Link>
      </div>
    </div>
  );
}

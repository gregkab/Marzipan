import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Custom & Wholesale Orders",
  description:
    "Custom marzipan for weddings, showers, corporate gifting and wholesale. Tell us the date, the count and the colors.",
};

const steps = [
  {
    title: "Tell us the details",
    copy: "The date, roughly how many boxes or pieces, and any colors or shapes you have in mind.",
  },
  {
    title: "We quote it",
    copy: "You'll get options and pricing tailored to the order, usually within a day or two.",
  },
  {
    title: "We make it",
    copy: "Everything is shaped after you confirm, then packed and shipped fresh from San Antonio.",
  },
];

export default function CustomOrdersPage() {
  const subject = encodeURIComponent("Custom marzipan order");
  const body = encodeURIComponent(
    [
      "Hello Marlipan,",
      "",
      "Occasion:",
      "Date needed:",
      "Quantity (boxes or pieces):",
      "Colors or shapes:",
      "Shipping to:",
      "",
      "Anything else:",
    ].join("\n")
  );

  return (
    <div className="mx-auto max-w-[76rem] px-5 py-16 sm:px-8">
      <div className="grid items-start gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <div>
          <p className="eyebrow eyebrow-line">Custom & wholesale</p>
          <h1 className="mt-6 font-display text-[clamp(2.25rem,5vw,3.5rem)] leading-tight text-ink">
            Tell us what you're planning
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">
            We take custom requests — your preferred box size, colors, shapes,
            or branded packaging — and come back with pricing tailored to the
            order.
          </p>

          <ol className="mt-12 space-y-8">
            {steps.map((step, index) => (
              <li key={step.title} className="border-t border-gilt/30 pt-5">
                <p className="specimen">{String(index + 1).padStart(2, "0")}</p>
                <h2 className="mt-3 font-display text-xl text-ink">
                  {step.title}
                </h2>
                <p className="mt-2 max-w-md leading-relaxed text-ink-soft">
                  {step.copy}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-12">
            <a
              href={`mailto:${site.email}?subject=${subject}&body=${body}`}
              className="btn btn-solid"
            >
              Email us your details
            </a>
            <p className="specimen mt-5">
              Or write to {site.email} directly
            </p>
          </div>
        </div>

        <div className="plinth relative aspect-3/4 overflow-hidden">
          <Image
            src="/images/site/custom.jpg"
            alt="A large tray of hand-decorated marzipan flower cookies"
            fill
            priority
            sizes="(max-width: 1024px) 92vw, 40vw"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}

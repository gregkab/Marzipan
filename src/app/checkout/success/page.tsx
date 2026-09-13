import type { Metadata } from "next";
import ClearCart from "@/components/ClearCart";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Thank you",
  robots: { index: false, follow: false },
};

export default function CheckoutSuccessPage() {
  return (
    <div className="mx-auto max-w-[42rem] px-5 py-24 text-center sm:px-8">
      <ClearCart />
      <p className="eyebrow">Order received</p>
      <h1 className="mt-6 font-display text-[clamp(2.25rem,5vw,3.5rem)] leading-tight text-ink">
        Thank you — we're getting started
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-ink-soft">
        A receipt is on its way to your inbox. Everything is made by hand after
        you order, so please allow {site.processingDays} business days for
        processing before your box ships from {site.city}.
      </p>
      <p className="mt-6 leading-relaxed text-ink-soft">
        Questions about your order? Email{" "}
        <a
          href={`mailto:${site.email}`}
          className="border-b border-gilt pb-0.5 text-verd"
        >
          {site.email}
        </a>
        .
      </p>
      <Link href="/shop" className="btn btn-outline mt-10">
        Continue shopping
      </Link>
    </div>
  );
}

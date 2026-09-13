import Link from "next/link";
import { site } from "@/lib/site";

const shopLinks = [
  { href: "/shop", label: "All marzipan" },
  { href: "/our-story", label: "Our story" },
  { href: "/occasions", label: "Occasions" },
  { href: "/custom-orders", label: "Custom & wholesale" },
];

const policyLinks = [
  { href: "/policies/shipping", label: "Shipping" },
  { href: "/policies/refunds", label: "Refunds" },
  { href: "/policies/privacy", label: "Privacy" },
  { href: "/policies/terms", label: "Terms" },
];

const socialLinks = [
  { href: site.social.instagram, label: "Instagram" },
  { href: site.social.facebook, label: "Facebook" },
  { href: site.social.tiktok, label: "TikTok" },
];

export default function Footer() {
  return (
    <footer className="on-verd bg-verd text-almond">
      <div className="mx-auto grid max-w-[76rem] gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr] md:gap-16">
        <div>
          <p className="font-display text-3xl text-sugar">{site.name}</p>
          <p className="specimen mt-3 !text-almond/70">{site.motto}</p>
          <p className="mt-6 max-w-xs leading-relaxed text-almond/80">
            Handcrafted marzipan, shaped by hand in {site.city} and shipped
            fresh across the United States.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-6 inline-block border-b border-gilt pb-0.5 font-data text-sm text-sugar transition-colors hover:border-almond"
          >
            {site.email}
          </a>
        </div>

        <nav aria-label="Shop">
          <p className="eyebrow !text-almond/50">Shop</p>
          <ul className="mt-5 space-y-3">
            {shopLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-almond/85 transition-colors hover:text-sugar"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <nav aria-label="Policies">
            <p className="eyebrow !text-almond/50">Information</p>
            <ul className="mt-5 space-y-3">
              {policyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-almond/85 transition-colors hover:text-sugar"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <p className="eyebrow mt-10 !text-almond/50">Follow</p>
          <ul className="mt-5 space-y-3">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-almond/85 transition-colors hover:text-sugar"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-almond/15">
        <div className="mx-auto flex max-w-[76rem] flex-col gap-2 px-5 py-6 font-data text-[0.6875rem] uppercase tracking-[0.16em] text-almond/55 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            © {new Date().getFullYear()} {site.legalName}
          </p>
          <p>{site.city}</p>
        </div>
      </div>
    </footer>
  );
}

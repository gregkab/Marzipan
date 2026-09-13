"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { nav, site } from "@/lib/site";

export default function Header() {
  const { count, ready } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close the mobile menu whenever navigation happens.
  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-almond-deep/60 bg-sugar/95 backdrop-blur">
      <p className="bg-verd py-2 text-center font-data text-[0.625rem] uppercase tracking-[0.22em] text-almond">
        {site.motto} · Shipped fresh from {site.city}
      </p>

      <div className="mx-auto flex max-w-[76rem] items-center justify-between gap-6 px-5 py-4 sm:px-8">
        <Link href="/" className="shrink-0" aria-label={`${site.name} — home`}>
          <Image
            src="/images/site/wordmark.png"
            alt={site.name}
            width={168}
            height={73}
            priority
            className="h-10 w-auto sm:h-12"
          />
        </Link>

        <nav
          aria-label="Main"
          className="hidden items-center gap-9 font-data text-[0.6875rem] uppercase tracking-[0.18em] md:flex"
        >
          {nav.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`border-b pb-1 transition-colors hover:text-verd ${
                  active
                    ? "border-gilt text-verd"
                    : "border-transparent text-ink-soft"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/cart"
            className="flex items-center gap-2 font-data text-[0.6875rem] uppercase tracking-[0.18em] text-ink transition-colors hover:text-verd"
          >
            Cart
            <span
              aria-hidden
              className="grid h-6 min-w-6 place-items-center rounded-full bg-verd px-1.5 text-[0.625rem] text-sugar"
            >
              {ready ? count : 0}
            </span>
            <span className="sr-only">
              {ready ? `${count} item${count === 1 ? "" : "s"} in cart` : "Cart"}
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            className="md:hidden"
          >
            <span className="sr-only">
              {menuOpen ? "Close menu" : "Open menu"}
            </span>
            <svg width="22" height="14" viewBox="0 0 22 14" aria-hidden>
              {menuOpen ? (
                <g stroke="currentColor" strokeWidth="1.5">
                  <line x1="3" y1="2" x2="19" y2="12" />
                  <line x1="19" y1="2" x2="3" y2="12" />
                </g>
              ) : (
                <g stroke="currentColor" strokeWidth="1.5">
                  <line x1="0" y1="1" x2="22" y2="1" />
                  <line x1="0" y1="7" x2="22" y2="7" />
                  <line x1="0" y1="13" x2="22" y2="13" />
                </g>
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className="border-t border-almond-deep/60 px-5 py-3 md:hidden"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block border-b border-almond-deep/40 py-3 font-data text-[0.75rem] uppercase tracking-[0.18em] last:border-0"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

import type { Metadata } from "next";
import { Fraunces, Figtree, Anonymous_Pro } from "next/font/google";
import { CartProvider } from "@/lib/cart";
import { site } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

/* Display: Fraunces, for its softness and "wonk" axes — a serif with a
   hand-cut wobble rather than the usual glassy high-contrast face. */
const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

/* Body and data faces are carried over from the Shopify site so the brand
   keeps a thread of continuity through the move. */
const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

const anonymous = Anonymous_Pro({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-anonymous",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Handcrafted Marzipan | San Antonio, Texas`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} — Handcrafted Marzipan`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${figtree.variable} ${anonymous.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        <CartProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-verd focus:px-4 focus:py-2 focus:text-sugar"
          >
            Skip to content
          </a>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}

/** Brand-wide facts that appear in more than one place. */
export const site = {
  name: "Marlipan",
  legalName: "Marlipan LLC",
  motto: "Handcrafted With Love",
  description:
    "Handcrafted marzipan made with organic almonds, orange blossom water and all-natural ingredients. Vegan, gluten-free, shipped fresh from San Antonio, Texas.",
  email: "marlipan22@gmail.com",
  city: "San Antonio, Texas",
  /** Set this to the live domain before launch — it seeds absolute OG URLs. */
  url: "https://marlipan.com",
  social: {
    facebook: "https://www.facebook.com/profile.php?id=100086987864547",
    instagram: "https://www.instagram.com/marlipa.n/",
    tiktok: "https://www.tiktok.com/@marlipa.n",
  },
  /** Handling time quoted on product pages and at checkout. */
  processingDays: 2,
} as const;

export const nav = [
  { href: "/shop", label: "Shop" },
  { href: "/our-story", label: "Our Story" },
  { href: "/occasions", label: "Occasions" },
] as const;

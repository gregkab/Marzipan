import { site } from "./site";

/**
 * Policy copy. The refund policy is Marlipan's own long-standing wording; the
 * shipping, privacy and terms pages are written for this site and reference
 * Stripe as the payment processor rather than Shopify.
 *
 * These are plain-language starting points, not legal advice — have them
 * reviewed before launch, and keep `updated` current when they change.
 */
export type Policy = {
  slug: string;
  title: string;
  updated: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
};

const policies: Policy[] = [
  {
    slug: "shipping",
    title: "Shipping",
    updated: "September 2026",
    intro: `Everything is made by hand after you order, so there is a short wait before your box leaves our kitchen in ${site.city}.`,
    sections: [
      {
        heading: "Processing time",
        body: [
          `Please allow ${site.processingDays} business days for processing. Your marzipan is handcrafted fresh just for you, and we don't make it ahead.`,
        ],
      },
      {
        heading: "Delivery",
        body: [
          "Once shipped, orders typically arrive within 3 to 6 business days. We ship within the United States only.",
          "Shipping is a flat rate at checkout, and orders over $75 ship free.",
        ],
      },
      {
        heading: "Warm weather",
        body: [
          "Marzipan travels well, but during hot months we may hold an order a day to ship early in the week and avoid a weekend in transit. If that affects your date, email us and we'll plan around it.",
        ],
      },
      {
        heading: "A problem with your delivery",
        body: [
          `If a box arrives damaged or delayed, email ${site.email} with your order number and a photo, and we'll make it right.`,
        ],
      },
    ],
  },
  {
    slug: "refunds",
    title: "Refunds",
    updated: "September 2026",
    intro:
      "Due to the perishable nature of our food products, we do not accept returns or systematically process refunds.",
    sections: [
      {
        heading: "Inspect your order",
        body: [
          "We encourage you to inspect your order as soon as it arrives and contact us immediately if the goods are damaged or if you received the wrong order, so that we can evaluate the issue and make it right.",
        ],
      },
      {
        heading: "Get in touch",
        body: [
          `Email ${site.email} if your order arrived damaged, if you received the wrong item, or if anything about your order isn't what you expected. Please include your order number and a photo where relevant.`,
        ],
      },
      {
        heading: "Cancellations",
        body: [
          "Because each order is made to order, we can only cancel or change an order before it enters production — generally within 24 hours of placing it. Email us as soon as you can and we'll do our best.",
        ],
      },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy",
    updated: "September 2026",
    intro: `${site.legalName} collects the minimum needed to take your order, ship it, and answer your questions.`,
    sections: [
      {
        heading: "What we collect",
        body: [
          "When you place an order we collect your name, email address, phone number, and shipping address. If you email us, we keep that correspondence so we can help you.",
          "We also collect basic, aggregated information about how the site is used, which does not identify you.",
        ],
      },
      {
        heading: "Payment information",
        body: [
          "We never see or store your card details. Payments are processed by Stripe, which collects your card information directly and is responsible for handling it securely. Stripe's own privacy policy governs that data.",
        ],
      },
      {
        heading: "How we use it",
        body: [
          "To make and ship your order, to send order confirmations and shipping updates, to respond when you contact us, and to meet our tax and accounting obligations.",
          "We do not sell your personal information, and we do not share it with anyone except the services we need to fulfill your order — our payment processor and our shipping carriers.",
        ],
      },
      {
        heading: "Your choices",
        body: [
          `Email ${site.email} to ask what we hold about you, to correct it, or to ask us to delete it. We'll respond as quickly as we can.`,
        ],
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms of Service",
    updated: "September 2026",
    intro: `These terms apply when you browse this site or buy from ${site.legalName}.`,
    sections: [
      {
        heading: "Orders",
        body: [
          "Placing an order is an offer to buy. We confirm by email once we accept it. We may decline or cancel an order — for example if an item is unavailable or if there's an error in the listed price — and if we do, we'll refund you in full.",
          "Prices are in US dollars and may change. The price that applies is the one shown when you check out.",
        ],
      },
      {
        heading: "Food, allergens, and freshness",
        body: [
          "All of our products contain tree nuts, and some contain pine nuts or coconut. Allergens are listed on every product page. If you have a severe allergy, please read those listings carefully before ordering.",
          "Our products are made in a kitchen that handles nuts. We cannot guarantee against cross-contact between nut varieties.",
          "Everything is perishable and made to order. Please refer to our refund policy.",
        ],
      },
      {
        heading: "Shipping and risk",
        body: [
          "We ship within the United States. Risk of loss passes to you on delivery to the address you provide, so please check it carefully before submitting your order.",
        ],
      },
      {
        heading: "Content",
        body: [
          `All photographs, text, and designs on this site belong to ${site.legalName}. Please don't reuse them without asking first.`,
        ],
      },
      {
        heading: "Contact",
        body: [`Questions about these terms? Email ${site.email}.`],
      },
    ],
  },
];

export function getPolicy(slug: string): Policy | undefined {
  return policies.find((policy) => policy.slug === slug);
}

export function getPolicySlugs(): string[] {
  return policies.map((policy) => policy.slug);
}

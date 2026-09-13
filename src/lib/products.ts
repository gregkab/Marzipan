/**
 * The product catalog — the single source of truth for the whole site.
 *
 * Every page reads products through the accessors at the bottom of this file
 * (`getProducts`, `getProduct`, …) and never imports `catalog` directly. If we
 * ever move the catalog into a CMS, this file is the only one that changes.
 *
 * Prices are in whole US cents so nothing ever touches floating point.
 */

export type Variant = {
  /** Stable id. Used as the cart key and sent to Square at checkout. Never reuse one. */
  id: string;
  /** Shown in the variant picker. Omit the picker entirely when there's one. */
  label: string;
  priceCents: number;
  /** Pieces in the box. Drives the specimen line. */
  pieces: number;
  /** Net weight in grams, for shipping and the specimen line. */
  grams: number;
};

export type Product = {
  handle: string;
  /** Short display name used in headings and cards. */
  name: string;
  /** Full title, kept for <title> tags and structured data. */
  fullTitle: string;
  /** One line, under 100 chars, for cards and meta descriptions. */
  tagline: string;
  /** Body copy, one string per paragraph. */
  description: string[];
  /** Bulleted specifics shown under the description. */
  details: string[];
  ingredients: string;
  allergens: string;
  /** How the variants differ, e.g. "Size". Omit when there's a single variant. */
  optionName?: string;
  variants: Variant[];
  images: { src: string; alt: string }[];
  /** Short composition note for the specimen line, e.g. "almond · pistachio". */
  composition: string;
  dietary: string[];
  /** Shown first on the homepage, low to high. */
  order: number;
};

const catalog: Product[] = [
  {
    handle: "esmeralda",
    name: "Esmeralda",
    fullTitle: "Esmeralda — Signature Pistachio Marzipan",
    tagline: "Pure pistachio, sweetened with coconut palm sugar.",
    description: [
      "Indulge in Esmeralda — our signature pistachio marzipan, a luxurious, low-glycemic treat. Bite into Esmeralda and experience the rich, pure pistachio flavor that melts softly in your mouth.",
      "Delicately sweetened with coconut palm sugar and finished with a whisper of shredded coconut, each piece delivers a smooth, luxurious texture that's naturally wholesome.",
    ],
    details: [
      "Regular: 9 pieces in a box",
      "Esmeralda-X: 20 pieces in a box",
      "Freshly made. No preservatives, no artificial flavoring, no additives.",
    ],
    ingredients:
      "Premium almonds (tree nuts), pistachios, coconut palm sugar, shredded coconut.",
    allergens: "Contains tree nuts (almonds, pistachios).",
    optionName: "Size",
    variants: [
      { id: "esmeralda-regular", label: "Regular · 9 pieces", priceCents: 2400, pieces: 9, grams: 150 },
      { id: "esmeralda-x", label: "Esmeralda-X · 20 pieces", priceCents: 4800, pieces: 20, grams: 400 },
    ],
    images: [
      { src: "/images/products/esmeralda-1.jpg", alt: "Esmeralda pistachio marzipan pieces dusted with shredded coconut" },
      { src: "/images/products/esmeralda-2.jpg", alt: "A box of Esmeralda pistachio marzipan" },
      { src: "/images/products/esmeralda-3.jpg", alt: "Close view of the pistachio marzipan texture" },
    ],
    composition: "pistachio · palm sugar",
    dietary: ["Vegan", "Gluten-free", "Low-glycemic"],
    order: 1,
  },
  {
    handle: "luxury-pistachio-nest-marzipan",
    name: "Pistachio Nests",
    fullTitle: "Luxury Pistachio Nest Marzipan",
    tagline: "Almond nests cradling raw pistachios, scented with orange blossom.",
    description: [
      "Handcrafted from premium almonds and raw pistachios, our Pistachio Nest Marzipan is delicately infused with orange blossom water and lightly sweetened with powdered sugar, for a rich, elegant flavor.",
      "Each box includes 12 beautifully crafted pieces — perfect for gifting, special occasions, or simply treating yourself.",
    ],
    details: [
      "12 pieces in a box",
      "Freshly made with the finest ingredients",
      "No preservatives",
    ],
    ingredients:
      "Premium almonds (tree nuts), raw pistachios, powdered sugar, orange blossom water.",
    allergens: "Contains tree nuts (almonds, pistachios).",
    variants: [
      { id: "pistachio-nest", label: "Box of 12", priceCents: 3400, pieces: 12, grams: 400 },
    ],
    images: [
      { src: "/images/products/pistachio-nest-1.jpg", alt: "Pistachio nest marzipan arranged in a gift box" },
      { src: "/images/products/pistachio-nest-2.jpg", alt: "A single pistachio nest marzipan piece" },
      { src: "/images/products/pistachio-nest-3.jpg", alt: "Pistachio nests among other marzipan pieces" },
    ],
    composition: "almond · pistachio",
    dietary: ["Vegan", "Gluten-free"],
    order: 2,
  },
  {
    handle: "artisan-almond-marzipan-flowers",
    name: "Marzipan Flowers",
    fullTitle: "Artisan Almond Marzipan Flowers — Gluten-Free Gift Box",
    tagline: "Nine roses, each one shaped and folded by hand.",
    description: [
      "Inspired by the natural elegance of blooming roses, each piece blends intricate craftsmanship with a rich, authentic almond flavor.",
      "Elegant and exquisitely detailed, this collection is the perfect luxury treat for special celebrations, thoughtful gifting, or creating unforgettable, sweet moments.",
    ],
    details: [
      "Nine individually handcrafted marzipan flowers",
      "Freshly made to order and shipped within 2 days",
      "Naturally gluten-free",
    ],
    ingredients:
      "Premium almonds (tree nuts), powdered sugar, orange blossom water, almond extract.",
    allergens: "Contains tree nuts (almonds).",
    variants: [
      { id: "marzipan-flowers", label: "Box of 9", priceCents: 2000, pieces: 9, grams: 180 },
    ],
    images: [
      { src: "/images/products/marzipan-flowers-1.jpg", alt: "Handcrafted marzipan roses in a gift box" },
      { src: "/images/products/marzipan-flowers-2.jpg", alt: "Close view of hand-shaped marzipan roses" },
    ],
    composition: "almond · orange blossom",
    dietary: ["Vegan", "Gluten-free"],
    order: 3,
  },
  {
    handle: "luxury-marzipan-fruits",
    name: "Marzipan Fruits",
    fullTitle: "Handcrafted Marzipan Fruits — 9 Pieces",
    tagline: "A miniature orchard, painted with natural color and glazed.",
    description: [
      "Delicately handcrafted premium marzipan fruits made with the finest quality almonds, powdered sugar, and fragrant orange blossom water.",
      "Each piece is beautifully finished with natural food coloring and a light fruit glaze for an elegant shine. Perfect for gifting, special occasions, holidays, or simply enjoying a luxurious sweet treat.",
    ],
    details: [
      "9 beautifully handcrafted pieces in an elegant gift box",
      "Natural food coloring",
      "Handmade with love",
    ],
    ingredients:
      "Premium almonds (tree nuts), powdered sugar, orange blossom water, natural food coloring, fruit glaze.",
    allergens: "Contains tree nuts (almonds).",
    variants: [
      { id: "marzipan-fruits", label: "Box of 9", priceCents: 1600, pieces: 9, grams: 170 },
    ],
    images: [
      { src: "/images/products/marzipan-fruits-1.jpg", alt: "Marzipan shaped and painted to look like miniature fruits" },
      { src: "/images/products/marzipan-fruits-2.jpg", alt: "A single glazed marzipan fruit" },
    ],
    composition: "almond · natural color",
    dietary: ["Vegan", "Gluten-free", "Dairy-free"],
    order: 4,
  },
  {
    handle: "marzipan-fingers",
    name: "Marzipan Fingers",
    fullTitle: "Marzipan Fingers with Pistachio Filling",
    tagline: "A smooth almond shell around a velvety pistachio center.",
    description: [
      "Experience the perfect harmony of flavors. We craft our smooth almond base using only the finest premium almonds, delicately blending them with orange blossom water and a touch of powdered sugar.",
      "The rich, velvety pistachio filling creates a truly melt-in-mouth delight that tastes as elegant as it looks. Perfect for premium gifting or a sophisticated personal treat.",
    ],
    details: [
      "All-natural ingredients",
      "No artificial flavors or preservatives",
      "Individually wrapped",
    ],
    ingredients:
      "Premium almonds (tree nuts), pistachios, powdered sugar, orange blossom water.",
    allergens: "Contains tree nuts (almonds, pistachios).",
    optionName: "Pack size",
    variants: [
      { id: "fingers-7", label: "Box of 7", priceCents: 2000, pieces: 7, grams: 210 },
      { id: "fingers-15", label: "Box of 15", priceCents: 4200, pieces: 15, grams: 400 },
    ],
    images: [
      { src: "/images/products/marzipan-fingers-1.jpg", alt: "Marzipan fingers with pistachio filling" },
      { src: "/images/products/marzipan-fingers-2.jpg", alt: "Marzipan fingers sliced to show the pistachio center" },
      { src: "/images/products/marzipan-fingers-3.jpg", alt: "A boxed set of marzipan fingers" },
      { src: "/images/products/marzipan-fingers-4.jpg", alt: "Marzipan fingers arranged on a tray" },
    ],
    composition: "almond · pistachio",
    dietary: ["Vegan", "Gluten-free"],
    order: 5,
  },
  {
    handle: "cherry-bubbles",
    name: "Cherry Bubbles",
    fullTitle: "Cherry Bubbles — Handmade Almond Delicacies",
    tagline: "Sliced almonds around dried cherries, dusted with sugar.",
    description: [
      "Meet Cherry Bubbles, a heavenly treat that balances nutty richness and fruity tartness. Similar to our beloved pignoli cookies, these handcrafted delights are made with sliced almonds and filled with dried, unsweetened cherries or blueberries for a burst of flavor.",
      "Each piece is lightly dusted with powdered sugar, adding a delicate touch of sweetness to every bite. Perfect with coffee, as a holiday treat, or a thoughtful gift for someone special.",
    ],
    details: [
      "9 pieces in a box",
      "Soft, chewy, and delightfully sweet",
      "No artificial flavors",
      "Custom box sizes available on request",
    ],
    ingredients:
      "Sliced almonds (tree nuts), dried unsweetened cherries or blueberries, powdered sugar.",
    allergens: "Contains tree nuts (almonds).",
    variants: [
      { id: "cherry-bubbles", label: "Box of 9", priceCents: 2800, pieces: 9, grams: 400 },
    ],
    images: [
      { src: "/images/products/cherry-bubbles-1.jpg", alt: "Cherry Bubbles, almond cookies filled with dried cherries" },
      { src: "/images/products/cherry-bubbles-2.jpg", alt: "Cherry Bubbles dusted with powdered sugar" },
    ],
    composition: "almond · dried cherry",
    dietary: ["Vegan", "Gluten-free"],
    order: 6,
  },
  {
    handle: "biscuit-bubbles",
    name: "Biscuit Bubbles",
    fullTitle: "Biscuit Bubbles — Almonds, Pine Nuts, Pistachios",
    tagline: "Crisp outside, chewy within. Three nuts, eight pieces.",
    description: [
      "Want a unique treat that stands out? Dive into our Biscuit Bubbles. Immerse yourself in the luxurious pine nuts, pistachios, and almonds — delicately crisp on the outside and soft, chewy inside, with just the right hint of sweetness.",
      "Pignoli cookies made with almond paste and topped with golden pine nuts, pistachios, and almonds.",
    ],
    details: [
      "8 pieces in a box",
      "2 pine nut (pignoli) · 2 pistachio · 4 almond",
      "No preservatives, no additives",
    ],
    ingredients:
      "Almond paste (tree nuts), pine nuts, pistachios, powdered sugar.",
    allergens: "Contains tree nuts (almonds, pistachios) and pine nuts.",
    variants: [
      { id: "biscuit-bubbles", label: "Box of 8", priceCents: 2600, pieces: 8, grams: 215 },
    ],
    images: [
      { src: "/images/products/biscuit-bubbles-1.jpg", alt: "Biscuit Bubbles topped with pine nuts, pistachios and almonds" },
      { src: "/images/products/biscuit-bubbles-2.jpg", alt: "A box of assorted Biscuit Bubbles" },
      { src: "/images/products/biscuit-bubbles-3.jpg", alt: "Close view of a pine nut topped biscuit bubble" },
    ],
    composition: "almond · pine nut",
    dietary: ["Vegan", "Gluten-free"],
    order: 7,
  },
  {
    handle: "marzi-coco",
    name: "Marzi-Coco",
    fullTitle: "Marzi-Coco — Coconut Marzipan, Gluten-Free",
    tagline: "Coconut palm sugar gives it a dusky color and caramel note.",
    description: [
      "A wholesome twist on our signature handcrafted marzipan. Made with premium almonds, shredded coconut, and orange blossom water, naturally sweetened with organic coconut palm sugar.",
      "The palm sugar gives it a beautiful dusky brown color and a rich, caramel-like taste with a lower glycemic index. Freshly made to order.",
    ],
    details: [
      "9 pieces in an elegant gift box",
      "Naturally sweetened, lower glycemic index",
    ],
    ingredients:
      "Premium almonds (tree nuts), shredded coconut, organic coconut palm sugar, orange blossom water.",
    allergens: "Contains tree nuts (almonds) and coconut.",
    variants: [
      { id: "marzi-coco", label: "Box of 9", priceCents: 2000, pieces: 9, grams: 185 },
    ],
    images: [
      { src: "/images/products/marzi-coco-1.jpg", alt: "Marzi-Coco, coconut marzipan with a dusky brown color" },
      { src: "/images/products/marzi-coco-2.jpg", alt: "Marzi-Coco pieces in a gift box" },
    ],
    composition: "almond · coconut",
    dietary: ["Vegan", "Gluten-free", "Dairy-free"],
    order: 8,
  },
  {
    handle: "margaritas",
    name: "Margaritas",
    fullTitle: "Margaritas — Organic Marzipan Flower Cookies",
    tagline: "Sixteen little daisies, each with a hand-painted center.",
    description: [
      "Sweet and irresistibly cute. These delicate flower-shaped almond cookies are made with simple, high-quality ingredients for a light and beautiful presentation.",
      "Each piece is hand-decorated with a pop of natural color in the center — perfect for tea parties, baby showers, birthdays, or treating yourself.",
    ],
    details: [
      "16 pieces per box",
      "Box design may vary",
      "Naturally gluten-free",
    ],
    ingredients:
      "Premium almonds (tree nuts), powdered sugar, orange blossom water, almond extract.",
    allergens: "Contains tree nuts (almonds).",
    variants: [
      { id: "margaritas", label: "Box of 16", priceCents: 1900, pieces: 16, grams: 400 },
    ],
    images: [
      { src: "/images/products/margaritas-1.jpg", alt: "Margaritas, flower-shaped almond cookies with colored centers" },
      { src: "/images/products/margaritas-2.jpg", alt: "A tray of Margaritas flower cookies" },
    ],
    composition: "almond · orange blossom",
    dietary: ["Vegan", "Gluten-free", "Dairy-free"],
    order: 9,
  },
];

/** Every product, in display order. */
export function getProducts(): Product[] {
  return [...catalog].sort((a, b) => a.order - b.order);
}

/** One product by handle, or undefined if the handle is unknown. */
export function getProduct(handle: string): Product | undefined {
  return catalog.find((p) => p.handle === handle);
}

/** Handles for `generateStaticParams`. */
export function getProductHandles(): string[] {
  return catalog.map((p) => p.handle);
}

/**
 * Look up a variant by its id across the whole catalog. The checkout route uses
 * this to price the cart server-side, so a tampered client price is ignored.
 */
export function findVariant(
  variantId: string
): { product: Product; variant: Variant } | undefined {
  for (const product of catalog) {
    const variant = product.variants.find((v) => v.id === variantId);
    if (variant) return { product, variant };
  }
  return undefined;
}

/** The lowest price across a product's variants, for "from $X" on cards. */
export function startingPriceCents(product: Product): number {
  return Math.min(...product.variants.map((v) => v.priceCents));
}

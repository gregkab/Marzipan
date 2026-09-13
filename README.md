# Marlipan

The storefront for [Marlipan](https://marlipan.com) — handcrafted marzipan, made
by hand in San Antonio, Texas.

Next.js (App Router) + TypeScript + Tailwind v4, with Square Checkout for
payments. Built to replace the Shopify store: no monthly platform fee, and the
whole site deploys free on Vercel's hobby tier.

## Running it locally

```bash
npm install
cp .env.example .env.local   # then paste in a Square sandbox token
npm run dev                  # http://localhost:3000
```

The site runs fine without Square configured — you just can't complete a
checkout. Everything else (browsing, the cart) works.

| Command | What it does |
| --- | --- |
| `npm run dev` | Local dev server with hot reload |
| `npm run build` | Production build |
| `npm run typecheck` | TypeScript, no emit |

## Editing the shop

**Everything about the products lives in one file: `src/lib/products.ts`.**

Pages never read that data directly — they go through `getProducts()`,
`getProduct(handle)`, and `findVariant(id)` at the bottom of the file. That
indirection is deliberate: if the catalog ever moves into a CMS, this is the
only file that changes.

### Changing a price

Prices are in **whole cents**, so `2400` is $24.00. Never write `24.00`.

```ts
variants: [
  { id: "esmeralda-regular", label: "Regular · 9 pieces", priceCents: 2400, pieces: 9, grams: 150 },
]
```

### Adding a product

Copy an existing entry in `src/lib/products.ts` and change the fields. Two rules:

1. **`handle` becomes the URL** (`/products/your-handle`) and must be unique.
2. **`id` on each variant must be unique across the whole catalog and must never
   be reused.** It's the cart key and it's what the checkout prices against. If
   you rename an id, anyone with that item already in their cart loses it.

Add photos to `public/images/products/` and reference them in `images`. Every
image needs `alt` text describing what's in the shot.

`order` controls where it appears on the homepage and shop, low to high.

### Changing contact details, social links, or the motto

`src/lib/site.ts`.

### Changing policy text

`src/lib/policies.ts`. The shipping, privacy, and terms pages were written for
this site — they reference Square as the payment processor rather than Shopify,
so they're accurate once you've moved. **Have them reviewed before launch.**
They're a plain-language starting point, not legal advice.

## How checkout works

1. The cart lives in the browser's `localStorage` (`src/lib/cart.tsx`). It stores
   only variant ids and quantities — never prices.
2. On checkout, the browser posts that list to `POST /api/checkout`.
3. That route looks up every price, name, and weight **from `products.ts` on the
   server**, then asks Square to create a payment link (a Square-hosted
   checkout page) for exactly that order, and returns its URL.
4. The browser redirects to Square, which handles the card, the shipping
   address, and the receipt.
5. Square sends the customer back to `/checkout/success`, which empties the cart.

Because step 3 prices the order server-side, editing the cart in devtools can't
change what someone is charged. Don't "optimize" that by trusting a price sent
from the browser.

Square's hosted checkout is plainer than some alternatives — no Apple Pay/Google
Pay button by default, and it doesn't restrict the shipping address to the US the
way a country allowlist would. Since Marlipan ships domestically only, keep an
eye out for an international order slipping through and follow up by hand if
one does.

### Getting your Square credentials

1. Create an app at [developer.squareup.com/apps](https://developer.squareup.com/apps).
2. Its **Credentials** tab has a Production/Sandbox toggle in the lower-left
   corner. Each mode has its own access token.
3. The **Locations** tab (a separate tab from Credentials, same toggle) lists
   a **Location ID** for each mode. `SQUARE_LOCATION_ID` must match whichever
   token you're using — a sandbox token needs the sandbox location id, a
   production token needs the production one.
4. The access token her Square account already has for taking payments (from
   her existing Square usage) is a different thing from an app credential —
   this is a new app she authorizes to create payment links on her account's
   behalf. She stays the merchant of record; nothing about her existing Square
   setup changes.

### Shipping rates

Flat rate, set in `src/app/api/checkout/route.ts`:

```ts
const SHIPPING = {
  standardCents: 995,     // $9.95
  freeOverCents: 7500,    // free over $75
};
```

Adjust these once you know real postage costs.

### Sales tax

Not enabled. Texas taxes candy — it isn't covered by the state's grocery
exemption — so this is worth resolving before launch, not after. Square can
calculate and collect tax automatically for registered sellers; check current
support for automatic tax on payment links in the Square dashboard, or
calculate it into `subtotalCents` server-side as a fallback. Talk to an
accountant about registration and rate.

## Deploying

1. Push this repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new). Vercel detects Next.js;
   no configuration needed.
3. Add environment variables in **Project → Settings → Environment Variables**:
   - `SQUARE_ACCESS_TOKEN` — the **production** token for Production, the
     sandbox token for Preview.
   - `SQUARE_ENVIRONMENT` — `production` for Production, `sandbox` for Preview.
   - `SQUARE_LOCATION_ID` — matching whichever token is set above.
   - `NEXT_PUBLIC_SITE_URL` — `https://marlipan.com`
4. Update `site.url` in `src/lib/site.ts` to the live domain.
5. Point the domain at Vercel. The domain is on GoDaddy — add Vercel's DNS
   records there (**Vercel → Settings → Domains** shows exactly what to add).
   No transfer needed, just new records.

**Test a real order before switching the domain over.** Sandbox mode doesn't
charge a real card — see [Square's sandbox test values](https://developer.squareup.com/docs/testing/test-values)
for a test card number.

Don't cancel Shopify until orders are arriving through Square.

## Layout

```
src/
  app/
    page.tsx                  Homepage
    shop/                     All products
    products/[handle]/        Product detail
    our-story/                About
    occasions/                Weddings, showers, corporate
    custom-orders/            Custom & wholesale enquiries
    cart/                     Cart + checkout button
    checkout/success/         Post-payment confirmation
    policies/[slug]/          Shipping, refunds, privacy, terms
    api/checkout/             Creates the Square payment link
    globals.css               Design tokens — colors, type, the specimen label
  components/                 Header, Footer, ProductCard, ProductPurchase, …
  lib/
    products.ts               THE CATALOG
    site.ts                   Brand facts
    policies.ts               Policy copy
    cart.tsx                  Cart state
```

## Design notes

The palette comes off the product: almond paste, powdered sugar, raw pistachio
green, and a muted gilt from old sweet-shop tins.

Type is three faces — **Fraunces** for display (its softness and "wonk" axes give
it a hand-cut wobble that suits sugar shaped by hand), **Figtree** for body, and
**Anonymous Pro** for data. The last two carry over from the Shopify theme, so the
brand keeps a thread of continuity through the move.

The signature device is the **specimen label**: every product carries a line of
real catalog data — pieces, net weight, composition — set in the monospace face,
the way a confectioner's case labels what's under the glass. It's generated from
the `pieces`, `grams`, and `composition` fields, so it can't drift out of sync
with what's actually in the box.

Gilt is a hairline color only. The moment it fills an area it stops reading as a
confectioner's mark and starts reading as a luxury template.

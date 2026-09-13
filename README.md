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
  standardCents: 1295,    // $12.95
  freeOverCents: 7500,    // free over $75
};
```

$12.95 is anchored to USPS's actual retail Small Priority Mail Flat Rate box
price ($13.65 as of July 2026), assuming online/commercial rates run their
usual 10–15% below retail. It's still an estimate — it assumes a filled order
fits that box. Weigh a real packed order and check it against
[Pirate Ship](https://ship.pirateship.com) or usps.com/business before launch,
especially for larger or multi-box orders, or anything needing an ice pack in
warm months (see the shipping policy in `src/lib/policies.ts`, which already
mentions holding orders to avoid a hot weekend in transit).

### Sales tax

**Not enabled — and this needs two things outside this codebase before it can
be, not just a code change.**

Texas taxes candy; it isn't covered by the state's grocery exemption. San
Antonio's combined rate is 8.25% (6.25% state + 1% city + local additions —
confirmed against [Avalara](https://www.avalara.com/taxrates/en/state-rates/texas/cities/san-antonio.html)
and [TaxCloud](https://taxcloud.com/sales-tax/texas/bexar/san-antonio/), September 2026).

1. **She needs a Texas Sales and Use Tax Permit** from the
   [Texas Comptroller](https://comptroller.texas.gov/taxes/permit/) before
   collecting anything. This is a business/legal step, not a code change —
   an accountant can confirm whether she also owes tax in any other state she
   ships to (unlikely at this order volume, but worth asking once).
2. **Tax should then be configured in Square's own dashboard settings**
   (Account & Settings → Business Information → Sales Tax), not hardcoded
   here. The reason isn't laziness: this checkout route creates the Square
   order *before* the buyer enters a shipping address, so it has no way to
   know whether a given order is going to a Texas address (taxable) or
   somewhere else (not, since she has no nexus there). Square's own checkout
   page collects the address and can calculate tax against it in the moment,
   which a flat rate baked into the API request cannot do correctly.
   A rate hardcoded here would either overcharge every out-of-state customer
   or undercollect from every Texas one.
3. Once it's registered and configured, place one real test order to confirm
   tax actually appears correctly on a Square-hosted payment link (this
   project didn't confirm that specifically — see the note below).

This is worth resolving before launch, not after — but it isn't a step I can
finish alone, since it needs her Comptroller registration first.

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

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

/** 2400 -> "$24.00". Takes whole cents; never pass dollars. */
export function formatPrice(cents: number): string {
  return usd.format(cents / 100);
}

"use client";

import { useEffect } from "react";
import { useCart } from "@/lib/cart";

/**
 * Empties the cart once, on the order confirmation page. Rendered as a bare
 * effect so the confirmation page itself can stay a server component.
 */
export default function ClearCart() {
  const { clear, ready } = useCart();

  useEffect(() => {
    if (ready) clear();
  }, [ready, clear]);

  return null;
}

"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { findVariant } from "./products";

const STORAGE_KEY = "marlipan.cart.v1";

/**
 * Only the variant id and quantity are persisted. Everything shown to the
 * shopper — name, photo, price — is resolved from the catalog at render time,
 * so a price change never leaves a stale number sitting in someone's cart.
 */
export type CartLine = { variantId: string; quantity: number };

type CartContextValue = {
  lines: CartLine[];
  /** True until the cart has been read from localStorage. */
  ready: boolean;
  add: (variantId: string, quantity?: number) => void;
  setQuantity: (variantId: string, quantity: number) => void;
  remove: (variantId: string) => void;
  clear: () => void;
  count: number;
  subtotalCents: number;
};

const CartContext = createContext<CartContextValue | null>(null);

function read(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (line): line is CartLine =>
        typeof line === "object" &&
        line !== null &&
        typeof (line as CartLine).variantId === "string" &&
        Number.isFinite((line as CartLine).quantity) &&
        // Drop lines whose variant no longer exists in the catalog.
        findVariant((line as CartLine).variantId) !== undefined
    );
  } catch {
    // Private browsing, blocked storage, or malformed JSON — start empty.
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  // Read after mount so the server and first client render agree.
  useEffect(() => {
    setLines(read());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // Storage unavailable — the cart still works for this page session.
    }
  }, [lines, ready]);

  const add = useCallback((variantId: string, quantity = 1) => {
    if (!findVariant(variantId)) return;
    setLines((current) => {
      const existing = current.find((line) => line.variantId === variantId);
      if (existing) {
        return current.map((line) =>
          line.variantId === variantId
            ? { ...line, quantity: Math.min(line.quantity + quantity, 99) }
            : line
        );
      }
      return [...current, { variantId, quantity: Math.min(quantity, 99) }];
    });
  }, []);

  const setQuantity = useCallback((variantId: string, quantity: number) => {
    setLines((current) =>
      quantity <= 0
        ? current.filter((line) => line.variantId !== variantId)
        : current.map((line) =>
            line.variantId === variantId
              ? { ...line, quantity: Math.min(quantity, 99) }
              : line
          )
    );
  }, []);

  const remove = useCallback((variantId: string) => {
    setLines((current) => current.filter((line) => line.variantId !== variantId));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const { count, subtotalCents } = useMemo(() => {
    let count = 0;
    let subtotalCents = 0;
    for (const line of lines) {
      const found = findVariant(line.variantId);
      if (!found) continue;
      count += line.quantity;
      subtotalCents += found.variant.priceCents * line.quantity;
    }
    return { count, subtotalCents };
  }, [lines]);

  const value = useMemo(
    () => ({ lines, ready, add, setQuantity, remove, clear, count, subtotalCents }),
    [lines, ready, add, setQuantity, remove, clear, count, subtotalCents]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside a CartProvider");
  return context;
}

"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

// A cart line only stores the product index + quantity; everything else is
// resolved from data/products.ts so product info lives in one place.
export type CartLine = { index: string; quantity: number };

type CartContextValue = {
  lines: CartLine[];
  count: number;
  isOpen: boolean;
  add: (index: string) => void;
  increment: (index: string) => void;
  decrement: (index: string) => void;
  remove: (index: string) => void;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const increment = useCallback((index: string) => {
    setLines((prev) => {
      const exists = prev.some((l) => l.index === index);
      if (!exists) return [...prev, { index, quantity: 1 }];
      return prev.map((l) =>
        l.index === index ? { ...l, quantity: l.quantity + 1 } : l
      );
    });
  }, []);

  // Never drops below 1 — removing a line is always an explicit REMOVE
  const decrement = useCallback((index: string) => {
    setLines((prev) =>
      prev.map((l) =>
        l.index === index ? { ...l, quantity: Math.max(1, l.quantity - 1) } : l
      )
    );
  }, []);

  const remove = useCallback((index: string) => {
    setLines((prev) => prev.filter((l) => l.index !== index));
  }, []);

  const add = useCallback(
    (index: string) => {
      increment(index);
      setIsOpen(true);
    },
    [increment]
  );

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({
      lines,
      count: lines.reduce((sum, l) => sum + l.quantity, 0),
      isOpen,
      add,
      increment,
      decrement,
      remove,
      openCart,
      closeCart,
    }),
    [lines, isOpen, add, increment, decrement, remove, openCart, closeCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}

export const pad2 = (n: number) => String(n).padStart(2, "0");

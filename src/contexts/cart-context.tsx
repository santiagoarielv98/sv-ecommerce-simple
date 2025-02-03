"use client";

import { CART_STORAGE_KEY } from "@/config/cart.config";
import { validateQuantity } from "@/lib/cart";
import type { Product } from "@prisma/client";
import React from "react";
export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product) => void;
  addItemWithQuantity: (product: Product, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  total: number;
  incrementItem: (productId: string) => void;
  decrementItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
}

export const CartContext = React.createContext<CartContextType | undefined>(
  undefined,
);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<CartItem[]>([]);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        setItems(JSON.parse(saved));
      }
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product) => {
    if (product.stock === 0) {
      return;
    }

    setItems((prev) => {
      const existingItem = prev.find((item) => item.product.id === product.id);

      if (existingItem) {
        const newQuantity = existingItem.quantity + 1;
        if (!validateQuantity(newQuantity, product.stock)) {
          return prev;
        }

        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: newQuantity }
            : item,
        );
      }

      return [...prev, { product, quantity: 1 }];
    });
  };

  const addItemWithQuantity = (product: Product, quantity: number) => {
    console.log("addItemWithQuantity");
    if (quantity < 1 || product.stock === 0) return;

    setItems((prev) => {
      const existingItem = prev.find((item) => item.product.id === product.id);
      const newQuantity = (existingItem?.quantity || 0) + quantity;

      if (!validateQuantity(newQuantity, product.stock)) {
        return prev;
      }

      if (existingItem) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: newQuantity }
            : item,
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeItem = (productId: string) => {
    console.log("removeItem");
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    console.log("clearCart");
    setItems([]);
  };

  const incrementItem = (productId: string) => {
    console.log("incrementItem");
    setItems((prev) => {
      const item = prev.find((i) => i.product.id === productId);
      if (!item) return prev;

      const newQuantity = item.quantity + 1;

      if (!validateQuantity(newQuantity, item.product.stock)) {
        return prev;
      }

      return prev.map((i) =>
        i.product.id === productId ? { ...i, quantity: newQuantity } : i,
      );
    });
  };

  const decrementItem = (productId: string) => {
    console.log("decrementItem");
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  const updateQuantity = (productId: string, quantity: number) => {
    console.log("updateQuantity");
    if (quantity < 1) return;

    setItems((prev) => {
      const item = prev.find((i) => i.product.id === productId);
      if (!item) return prev;

      if (!validateQuantity(quantity, item.product.stock)) {
        return prev;
      }

      return prev.map((i) =>
        i.product.id === productId ? { ...i, quantity } : i,
      );
    });
  };

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        addItemWithQuantity,
        removeItem,
        clearCart,
        total,
        incrementItem,
        decrementItem,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

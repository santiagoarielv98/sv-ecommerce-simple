"use client";

import { createContext, useContext, useState, useEffect } from "react";
import type { Product } from "@prisma/client";
import { MAX_QUANTITY_PER_ITEM } from "@/lib/constants";

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

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "shopping-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        setItems(JSON.parse(saved));
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product) => {
    if (product.stock === 0) {
      return;
    }

    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.product.id === product.id,
      );

      if (existingItem) {
        const newQuantity = existingItem.quantity + 1;
        if (newQuantity > product.stock) {
          alert(`Only ${product.stock} items available`);
          return currentItems;
        }
        if (newQuantity > MAX_QUANTITY_PER_ITEM) {
          alert(`Maximum ${MAX_QUANTITY_PER_ITEM} items per product allowed`);
          return currentItems;
        }

        return currentItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: newQuantity }
            : item,
        );
      }

      return [...currentItems, { product, quantity: 1 }];
    });
  };

  const addItemWithQuantity = (product: Product, quantity: number) => {
    if (quantity < 1 || product.stock === 0) return;

    setItems((prev) => {
      const existingItem = prev.find((item) => item.product.id === product.id);
      const newQuantity = (existingItem?.quantity || 0) + quantity;

      if (newQuantity > product.stock) {
        alert(`Solo hay ${product.stock} unidades disponibles`);
        return prev;
      }

      if (newQuantity > MAX_QUANTITY_PER_ITEM) {
        alert(`Máximo ${MAX_QUANTITY_PER_ITEM} unidades por producto`);
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
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const incrementItem = (productId: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  const decrementItem = (productId: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item,
      ),
    );
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

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

"use client";

import type { CartItem, CartState } from "@/types/cart";
import { validateCartOperation } from "@/utils/cart";
import type { Product } from "@prisma/client";

import React from "react";
import { cartReducer } from "./actions";

interface CartContextType {
  state: CartState;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getItem: (productId: string) => CartItem | undefined;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const CartContext = React.createContext<CartContextType | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = React.useReducer(cartReducer, {
    items: [],
    error: null,
    isLoading: false,
  });

  const addToCart = React.useCallback(
    async (product: Product, quantity: number) => {
      dispatch({ type: "SET_LOADING", payload: true });
      dispatch({ type: "SET_ERROR", payload: null });

      try {
        validateCartOperation.quantity(quantity, product.stock);
        validateCartOperation.cartLimit(state.items);

        const existingItem = state.items.find((item) => item.id === product.id);
        if (existingItem) {
          validateCartOperation.quantity(
            existingItem.quantity + quantity,
            product.stock,
          );
        }

        dispatch({ type: "ADD_ITEM", payload: { product, quantity } });
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          payload: error instanceof Error ? error.message : "Error desconocido",
        });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    },
    [state.items],
  );

  const removeFromCart = React.useCallback((productId: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: { productId } });
  }, []);

  const updateQuantity = React.useCallback(
    (productId: string, quantity: number) => {
      const item = state.items.find((item) => item.id === productId);
      if (!item) return;

      try {
        validateCartOperation.quantity(
          quantity,
          item.product.stock,
          item.product.maxPurchaseLimit,
        );
        dispatch({ type: "UPDATE_QUANTITY", payload: { productId, quantity } });
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          payload: error instanceof Error ? error.message : "Error desconocido",
        });
      }
    },
    [state.items],
  );

  const clearCart = React.useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);

  const getItem = React.useCallback(
    (productId: string) => {
      return state.items.find((item) => item.id === productId);
    },
    [state.items],
  );

  const getTotalItems = React.useCallback(() => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  }, [state.items]);

  const getTotalPrice = React.useCallback(() => {
    return state.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );
  }, [state.items]);

  const value = React.useMemo(
    () => ({
      state,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getItem,
      getTotalItems,
      getTotalPrice,
    }),
    [
      state,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getItem,
      getTotalItems,
      getTotalPrice,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

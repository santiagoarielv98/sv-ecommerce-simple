import { CartContext } from "@/contexts/cart-context";
import React from "react";

export const useCart = () => {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe ser usado dentro de un CartProvider");
  }

  const { state, ...actions } = context;

  const formatPrice = React.useCallback((price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(price);
  }, []);

  return {
    ...actions,
    items: state.items,
    error: state.error,
    isLoading: state.isLoading,
    formatPrice,
  };
};

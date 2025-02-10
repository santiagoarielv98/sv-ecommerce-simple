import { CART_LIMITS } from "@/config/cart";
import type { CartItem } from "@/types/cart";

export class CartError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CartError";
  }
}

export const validateCartOperation = {
  quantity: (quantity: number, stock: number, maxLimit?: number): void => {
    if (quantity < CART_LIMITS.MIN_QUANTITY) {
      throw new CartError(`La cantidad mínima es ${CART_LIMITS.MIN_QUANTITY}`);
    }

    if (quantity > stock) {
      throw new CartError(`Solo hay ${stock} unidades disponibles`);
    }

    const limit = maxLimit || CART_LIMITS.MAX_QUANTITY_PER_ITEM;
    if (quantity > limit) {
      throw new CartError(`Máximo ${limit} unidades por producto`);
    }
  },

  cartLimit: (currentItems: CartItem[]): void => {
    if (currentItems.length >= CART_LIMITS.MAX_ITEMS_IN_CART) {
      throw new CartError(
        `Máximo ${CART_LIMITS.MAX_ITEMS_IN_CART} items en el carrito`,
      );
    }
  },
};

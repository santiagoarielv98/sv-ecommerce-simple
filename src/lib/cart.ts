import { MAX_QUANTITY_PER_ITEM } from "@/config/cart.config";

export const validateQuantity = (quantity: number, stock: number): boolean => {
  if (quantity > stock) {
    return false;
  }
  if (quantity > MAX_QUANTITY_PER_ITEM) {
    return false;
  }
  return true;
};

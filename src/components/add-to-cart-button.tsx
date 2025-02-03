"use client";

import Button from "@mui/material/Button";
import { useCart } from "@/hooks/use-cart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import type { Product } from "@prisma/client";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <Button
      variant="contained"
      startIcon={<ShoppingCartIcon />}
      onClick={() => addItem(product)}
      fullWidth
    >
      Agregar al carrito
    </Button>
  );
}

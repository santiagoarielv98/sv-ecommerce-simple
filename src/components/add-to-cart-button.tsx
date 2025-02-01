"use client";

import { Button } from "@mui/material";
import { useCart } from "@/contexts/cart-context";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Product } from "@prisma/client";

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

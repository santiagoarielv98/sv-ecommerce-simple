"use client";

import { useCart } from "@/hooks/use-cart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { Product } from "@prisma/client";
import { useState } from "react";
import ImagePreviewDialog from "./image-preview-dialog";
import QuantityControl from "./quantity-control";

interface ProductDetailProps {
  product: Product & {
    category: {
      name: string;
    };
  };
}

const MAX_QUANTITY_PER_ITEM = 10;

export default function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItemWithQuantity } = useCart();

  const handleAddToCart = () => {
    if (product.stock === 0) return;
    if (quantity > MAX_QUANTITY_PER_ITEM) {
      alert(`Máximo ${MAX_QUANTITY_PER_ITEM} unidades por producto`);
      return;
    }
    if (quantity > product.stock) {
      alert(`Solo hay ${product.stock} unidades disponibles`);
      return;
    }
    addItemWithQuantity(product, quantity);
    setQuantity(1);
  };

  return (
    <Grid container spacing={4}>
      <Grid size={{ xs: 12, md: 6 }}>
        <ImagePreviewDialog images={product.images} />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Stack spacing={3}>
          <Box>
            <Typography variant="h4" gutterBottom>
              {product.name}
            </Typography>
            <Chip label={product.category.name} color="primary" size="small" />
          </Box>

          <Typography variant="h5" color="primary">
            ${product.price.toFixed(2)}
          </Typography>

          <Typography variant="body1" color="text.secondary">
            {product.description}
          </Typography>

          <Box>
            <Typography
              variant="subtitle2"
              gutterBottom
              color={product.stock === 0 ? "error" : "text.secondary"}
            >
              {product.stock === 0
                ? "Sin stock disponible"
                : `Stock disponible: ${product.stock}`}
            </Typography>
            <Stack spacing={2}>
              <QuantityControl
                quantity={quantity}
                onIncrease={() =>
                  setQuantity((q) => Math.min(q + 1, product.stock))
                }
                onDecrease={() => setQuantity((q) => Math.max(q - 1, 1))}
                onQuantityChange={(q) =>
                  setQuantity(Math.min(Math.max(1, q), product.stock))
                }
                disabled={product.stock === 0}
              />
              <Button
                variant="contained"
                startIcon={<ShoppingCartIcon />}
                onClick={handleAddToCart}
                fullWidth
                disabled={product.stock === 0}
              >
                {product.stock === 0 ? "Sin stock" : "Agregar al carrito"}
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
}

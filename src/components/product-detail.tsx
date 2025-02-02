"use client";

import { useState } from "react";
import { useCart } from "@/contexts/cart-context";
import type { Product } from "@prisma/client";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Image from "next/image";
import QuantityControl from "./quantity-control";

interface ProductDetailProps {
  product: Product & {
    category: {
      name: string;
    };
  };
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItemWithQuantity } = useCart();

  const handleAddToCart = () => {
    if (product.stock === 0) return;
    addItemWithQuantity(product, quantity);
    setQuantity(1);
  };

  return (
    <Grid container spacing={4}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Paper
          sx={{
            p: 2,
            height: "400px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {product.images?.[0] && (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              style={{ objectFit: "cover" }}
            />
          )}
        </Paper>
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

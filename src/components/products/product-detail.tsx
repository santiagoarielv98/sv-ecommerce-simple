"use client";

import ImagePreview from "@/components/images/image-preview";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { Category, Product } from "@prisma/client";
import { useState } from "react";
import QuantitySelector from "@/components/products/quantity-selector";

interface ProductDetailProps {
  product: Product & { category: Category };
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);

  return (
    <Grid container spacing={4}>
      <Grid size={{ xs: 12, md: 6 }}>
        <ImagePreview images={product.images} />
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
              {product.stock > 0 && (
                <QuantitySelector
                  quantity={quantity}
                  onQuantityChange={setQuantity}
                  maxStock={product.stock}
                />
              )}
              <Button
                variant="contained"
                startIcon={<ShoppingCartIcon />}
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

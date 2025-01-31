"use client";

import React from "react";
import Grid from "@mui/material/Grid2";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useCart } from "@/contexts/cart-context";
import type { Product } from "@prisma/client";

interface ProductListProps {
  products: Product[];
}

const ProductList = ({ products }: ProductListProps) => {
  const { addItem } = useCart();

  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4 }}>
          <Card>
            {product.images.length > 0 && (
              <CardMedia
                component="img"
                height="200"
                image={product.images[0]}
              />
            )}
            <CardContent>
              <Typography variant="h6">{product.name}</Typography>
              <Typography>${product.price.toFixed(2)}</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => addItem(product)}
                sx={{ mt: 2 }}
              >
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;

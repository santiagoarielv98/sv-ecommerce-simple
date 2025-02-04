"use client";

import { useCart } from "@/hooks/use-cart";
import type { ProductWithCategory } from "@/types/product";
import Grid2 from "@mui/material/Grid2";
import MuiLink from "@mui/material/Link";
import type { Product } from "@prisma/client";
import Link from "next/link";
import React from "react";
import ProductCard from "./product-card";

const ProductList = () => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  return (
    <Grid2 container spacing={3} padding={2}>
      {([] as ProductWithCategory[]).map((product) => (
        <Grid2
          key={product.id}
          size={{
            xs: 12,
            sm: 6,
            md: 4,
            lg: 3,
          }}
        >
          <MuiLink
            underline="none"
            component={Link}
            href={`/products/${product.id}`}
          >
            <ProductCard product={product} onAddToCart={handleAddToCart} />
          </MuiLink>
        </Grid2>
      ))}
    </Grid2>
  );
};

export default ProductList;

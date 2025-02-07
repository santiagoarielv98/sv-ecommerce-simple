"use client";

import Grid2 from "@mui/material/Grid2";
import Link from "next/link";
import MuiLink from "@mui/material/Link";
import ProductCard from "@/components/products/product-card";
import React from "react";
import type { Product } from "@prisma/client";
import { route } from "@/config/route";

export interface ListProductProps {
  products: Product[];
}

const ProductList = ({ products = [] }: ListProductProps) => {
  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    console.log(product);
  };

  return (
    <Grid2 container spacing={3}>
      {products.map((product) => (
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
            href={`${route.store.products}/${product.id}`}
          >
            <ProductCard product={product} onAddToCart={handleAddToCart} />
          </MuiLink>
        </Grid2>
      ))}
    </Grid2>
  );
};

export default ProductList;

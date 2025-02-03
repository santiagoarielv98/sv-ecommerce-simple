"use client";

import { useCart } from "@/hooks/use-cart";
import Grid from "@mui/material/Grid2";
import type { Product } from "@prisma/client";
import Link from "next/link";
import React from "react";
import ProductCard from "./product-card";

interface ProductListProps {
  products: Product[];
}

const ProductList = ({ products }: ProductListProps) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4 }}>
          <Link href={`/products/${product.id}`} passHref key={product.id}>
            <ProductCard
              product={product}
              onAddToCart={(e) => handleAddToCart(e, product)}
            />
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;

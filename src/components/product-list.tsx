"use client";

import { getNextPageOfProducts } from "@/actions/products";
import { useCart } from "@/hooks/use-cart";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import type { Product } from "@prisma/client";
import Link from "next/link";
import React from "react";
import ProductCard from "./product-card";

interface ProductListProps {
  products: Product[];
  nextCursor: string | null;
}

const ProductList = ({ products, nextCursor: cursor }: ProductListProps) => {
  const [items, setItems] = React.useState<Product[]>(products);
  const [nextCursor, setNextCursor] = React.useState<string | null>(cursor);

  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  const handleLoadMore = async () => {
    if (!nextCursor) return;
    const data = await getNextPageOfProducts(nextCursor);
    setItems((prev) => [...prev, ...data.products]);
    setNextCursor(data.nextCursor);
  };

  return (
    <Grid container spacing={3}>
      {items.map((product) => (
        <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4 }}>
          <Link href={`/products/${product.id}`} passHref key={product.id}>
            <ProductCard
              product={product}
              onAddToCart={(e) => handleAddToCart(e, product)}
            />
          </Link>
        </Grid>
      ))}
      {nextCursor && (
        <Grid
          size={{ xs: 12 }}
          container
          justifyContent="center"
          alignItems="center"
        >
          <Button variant="contained" color="primary" onClick={handleLoadMore}>
            Load More
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

export default ProductList;

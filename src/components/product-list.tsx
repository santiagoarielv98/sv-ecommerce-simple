"use client";

import { getNextPageOfProducts } from "@/actions/products";
import { useCart } from "@/hooks/use-cart";
import Button from "@mui/material/Button";
import Grid2 from "@mui/material/Grid2";
import type { Product } from "@prisma/client";
import React from "react";
import ProductCard from "./product-card";
import Link from "next/link";
import MuiLink from "@mui/material/Link";
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
    <Grid2 container spacing={3} padding={2}>
      {items.map((product) => (
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
      <Grid2 size={{ xs: 12 }} justifyContent="center" display="flex">
        <Button variant="contained" onClick={handleLoadMore}>
          Load More
        </Button>
      </Grid2>
    </Grid2>
  );
};

export default ProductList;

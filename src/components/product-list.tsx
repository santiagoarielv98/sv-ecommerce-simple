import React from "react";
import Grid from "@mui/material/Grid2";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import type { Product } from "@prisma/client";

interface ProductListProps {
  products: Product[];
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 4,
          }}
          key={product.id}
        >
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
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;

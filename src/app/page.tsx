import ProductList from "@/components/product-list";
import { prisma } from "@/lib/prisma";
import { Container, Grid2 as Grid, Toolbar } from "@mui/material";

export default async function Home() {
  const products = await prisma.product.findMany();

  return (
    <Container>
      <Toolbar />
      <Grid container spacing={3}>
        <ProductList products={products} />
      </Grid>
    </Container>
  );
}

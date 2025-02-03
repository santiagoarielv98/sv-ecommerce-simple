import ProductList from "@/components/product-list";
import { prisma } from "@/lib/prisma";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Toolbar from "@mui/material/Toolbar";

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

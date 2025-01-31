import ProductList from "@/components/product-list";
import client from "@/lib/client";
import { Container, Grid2 as Grid, Toolbar } from "@mui/material";

export default async function Home() {
  const db = (await client).db();
  const products = await db.collection("products").find({}).toArray();

  return (
    <Container>
      <Toolbar />
      <Grid container spacing={3}>
        <ProductList products={products} />
      </Grid>
    </Container>
  );
}

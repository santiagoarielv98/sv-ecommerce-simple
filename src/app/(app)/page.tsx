import { getFirstPageOfProducts } from "@/actions/products";
import ProductList from "@/components/product-list";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default async function Home() {
  const { products, nextCursor } = await getFirstPageOfProducts();

  return (
    <Container sx={{ my: 2 }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h4">Products</Typography>
      </Box>
      <Box>
        <ProductList products={products} nextCursor={nextCursor} />
      </Box>
    </Container>
  );
}

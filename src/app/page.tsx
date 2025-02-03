import { getFirstPageOfProducts } from "@/actions/products";
import ProductList from "@/components/product-list";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default async function Home() {
  const { products, nextCursor } = await getFirstPageOfProducts();

  return (
    <Container>
      <Toolbar />
      <Box sx={{ mb: 2 }}>
        <Typography variant="h4">Products</Typography>
      </Box>
      <Box sx={{ mb: 2 }}>
        <ProductList products={products} nextCursor={nextCursor} />
      </Box>
    </Container>
  );
}

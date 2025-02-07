import ProductList from "@/components/products/product-list";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const products = Array.from({ length: 24 }, (_, index) => ({
  id: index.toString(),
  name: `Product ${index + 1}`,
  description: `Description ${index + 1}`,
  price: 100,
  categoryId: "1",
  createdAt: new Date(),
  images: [
    "https://picsum.photos/id/1/300/200",
    "https://picsum.photos/id/2/300/200",
  ],
  stock: 10,
  updatedAt: new Date(),
}));

const HomePage = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return (
    <Container maxWidth="xl" sx={{ my: 2 }}>
      <Toolbar
        sx={{
          display: { md: "none", xs: "flex" },
        }}
      />
      <Stack spacing={2}>
        <Typography variant="h4" gutterBottom>
          Products
        </Typography>
        <ProductList products={products} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Pagination count={10} />
        </Box>
      </Stack>
    </Container>
  );
};

export default HomePage;

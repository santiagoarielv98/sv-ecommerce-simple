import MuiPagination from "@/components/pagination/mui-pagination";
import ProductList from "@/components/products/product-list";
import { getProducts } from "@/lib/db/product";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const HomePage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    page: string;
    categories: string[];
    minPrice: string;
    maxPrice: string;
  }>;
}) => {
  const { page, categories, maxPrice, minPrice } = await searchParams;

  const data = await getProducts({
    page: parseInt(page),
    categories,
    minPrice: minPrice ? parseInt(minPrice) : undefined,
    maxPrice: maxPrice ? parseInt(maxPrice) : undefined,
  });

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
        <ProductList products={data.products} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <MuiPagination count={data.pages} page={data.currentPage} />
        </Box>
      </Stack>
    </Container>
  );
};

export default HomePage;

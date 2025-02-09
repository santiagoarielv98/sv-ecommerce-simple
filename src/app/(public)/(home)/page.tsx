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
    category: string | string[];
    minPrice: string;
    maxPrice: string;
  }>;
}) => {
  const params = await searchParams;

  const page = parseInt(params.page) || 1;
  const category = Array.isArray(params.category)
    ? params.category
    : [params.category];
  const minPrice = parseInt(params.minPrice) || 0;
  const maxPrice = parseInt(params.maxPrice) || 0;

  const data = await getProducts({
    page,
    category,
    minPrice,
    maxPrice,
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

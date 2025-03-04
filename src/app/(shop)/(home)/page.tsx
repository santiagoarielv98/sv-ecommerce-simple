import MuiPagination from "@/components/pagination/mui-pagination";
import ProductList from "@/components/products/product-list";
import { getProducts } from "@/lib/db/product";
import type { ProductSearchParams } from "@/types/page";
import { parseQueryParams } from "@/utils/query-params";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse our collection of products",
};

const HomePage = async ({
  searchParams,
}: {
  searchParams: Promise<ProductSearchParams>;
}) => {
  const params = await searchParams;

  const parsedParams = parseQueryParams(params);

  const data = await getProducts(parsedParams);

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

import { getFirstPageOfProducts } from "@/actions/products";
import ProductList from "@/components/product-list";
import Sidebar from "@/components/sidebar-filters";
import { prisma } from "@/lib/prisma";
import Box from "@mui/material/Box";
import { AppProvider } from "./provider";

export const drawerWidth = 300;

const EcommerceTemplate = async () => {
  const data = await getFirstPageOfProducts();
  const categories = await prisma.category.findMany();

  return (
    <AppProvider initialValues={data}>
      <Box sx={{ display: "flex" }}>
        <Sidebar categories={categories} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            mt: {
              xs: 16,
              md: 8,
            },
          }}
        >
          <ProductList />
        </Box>
      </Box>
    </AppProvider>
  );
};

export default EcommerceTemplate;

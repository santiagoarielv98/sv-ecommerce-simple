import { getFirstPageOfProducts } from "@/actions/products";
import ProductList from "@/components/product-list";
import Sidebar from "@/components/sidebar-filters";
import { prisma } from "@/lib/prisma";
import Box from "@mui/material/Box";

export const drawerWidth = 300;

const EcommerceTemplate = async () => {
  const { products, nextCursor } = await getFirstPageOfProducts();
  const categories = await prisma.category.findMany();

  return (
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
        <ProductList products={products} nextCursor={nextCursor} />
      </Box>
    </Box>
  );
};

export default EcommerceTemplate;

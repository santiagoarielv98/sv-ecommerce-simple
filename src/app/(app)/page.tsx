import { getFirstPageOfProducts } from "@/actions/products";
import ProductList from "@/components/product-list";
import Sidebar from "@/components/sidebar";
import Box from "@mui/material/Box";

export const drawerWidth = 300;

const EcommerceTemplate = async () => {
  const { products, nextCursor } = await getFirstPageOfProducts();
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
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

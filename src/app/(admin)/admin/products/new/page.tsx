import { getCategories } from "@/actions/products-admin";
import NewProductForm from "@/components/forms/new-product-form";
import { Box, Container, Typography } from "@mui/material";

export default async function NewProductPage() {
  const categories = await getCategories();

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          New Product
        </Typography>
        <NewProductForm categories={categories} />
      </Box>
    </Container>
  );
}

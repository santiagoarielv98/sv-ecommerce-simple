import { getCategories, getProduct } from "@/actions/products";
import EditProductForm from "@/components/forms/edit-product-form";
import { Box, Container, Typography } from "@mui/material";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    getProduct(id),
    getCategories(),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Edit Product
        </Typography>
        <EditProductForm product={product} categories={categories} />
      </Box>
    </Container>
  );
}

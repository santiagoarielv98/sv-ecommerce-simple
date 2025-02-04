import { getCategories, getProduct, updateProduct } from "@/actions/products";
import { ProductForm } from "@/components/product-form";
import type { ProductFormData } from "@/types/product";
import { Box, Container, Typography } from "@mui/material";
import { notFound, redirect } from "next/navigation";

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

  async function onSubmit(data: ProductFormData) {
    "use server";
    await updateProduct(params.id, data);
    redirect("/admin");
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Edit Product
        </Typography>
        <ProductForm
          product={product}
          categories={categories}
          onSubmit={onSubmit}
        />
      </Box>
    </Container>
  );
}

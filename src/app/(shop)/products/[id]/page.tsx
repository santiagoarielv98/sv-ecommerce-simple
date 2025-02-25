import ProductDetail from "@/components/products/product-detail";
import { getProduct } from "@/lib/db/product";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const ProductPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <Container maxWidth="xl" sx={{ my: 2 }}>
      <Stack spacing={2}>
        <ProductDetail product={product} />
      </Stack>
    </Container>
  );
};

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = params;
  const product = await getProduct(id);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: product.name,
    description: product.description,
  };
}

export default ProductPage;

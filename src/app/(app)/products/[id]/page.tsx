import ProductDetail from "@/components/products/product-detail";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { notFound } from "next/navigation";

const product = {
  id: "1",
  name: `Product 1`,
  description: `Description 1`,
  price: 100,
  categoryId: "1",
  createdAt: new Date(),
  images: [
    "https://picsum.photos/id/1/300/200",
    "https://picsum.photos/id/2/300/200",
  ],
  stock: 10,
  updatedAt: new Date(),
  category: {
    id: "1",
    name: "Category 1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};

const ProductPage = async () => {
  await new Promise((resolve) => setTimeout(resolve, 250));

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

export default ProductPage;

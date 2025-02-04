import Container from "@mui/material/Container";

import ProductDetail from "@/components/product-detail";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });

  if (!product) {
    notFound();
  }

  return (
    <Container sx={{ my: 2 }}>
      <ProductDetail product={product} />
    </Container>
  );
}

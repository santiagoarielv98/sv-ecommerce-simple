import Container from "@mui/material/Container";

import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/product-detail";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
    include: { category: true },
  });

  if (!product) {
    notFound();
  }

  return (
    <Container sx={{ py: 8 }}>
      <ProductDetail product={product} />
    </Container>
  );
}

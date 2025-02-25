"use server";

import { prisma } from "@/lib/prisma";

export async function search(query: string) {
  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
      deleted: false,
    },
    select: {
      id: true,
      name: true,
    },
    take: 5,
  });

  return products;
}

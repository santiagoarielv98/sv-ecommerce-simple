"use server";

export async function create() {}
// utilizando prisma
import { prisma } from "@/lib/prisma";

// logica para obtener productos paginados, filtro de categorias y rango de precios
export async function getProducts({
  page = 1,
  limit = 12,
  category = [],
  minPrice,
  maxPrice,
}: {
  page?: number;
  limit?: number;
  category?: string[];
  minPrice?: number;
  maxPrice?: number;
}) {
  const skip = (page - 1) * limit;

  const where = {
    ...(category.length && {
      category: {
        name: {
          in: category,
        },
      },
    }),
    ...((minPrice || maxPrice) && {
      price: {
        ...(minPrice && { gte: minPrice }),
        ...(maxPrice && { lte: maxPrice }),
      },
    }),
  };

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip,
      take: limit,
      include: {
        category: true,
      },
    }),
    prisma.product.count({ where }),
  ]);

  return {
    products,
    total,
    pages: Math.ceil(total / limit),
    currentPage: page,
  };
}

export async function getProduct(id: string) {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
}

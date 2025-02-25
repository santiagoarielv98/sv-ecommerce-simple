"use server";

export async function create() {}
// utilizando prisma
import { prisma } from "@/lib/prisma";
import type { GridSortItem } from "@mui/x-data-grid";

// logica para obtener productos paginados, filtro de categorias y rango de precios
export async function getProducts({
  page = 1,
  limit = 12,
  category = [],
  minPrice,
  maxPrice,
  sort = [],
}: {
  page?: number;
  limit?: number;
  category?: string[];
  minPrice?: number;
  maxPrice?: number;
  sort?: GridSortItem[];
}) {
  const skip = (page - 1) * limit;

  const where = {
    deleted: false,
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
      orderBy: sort.map((s) => ({
        ...(s.field === "category"
          ? {
              category: {
                name: s.sort!,
              },
            }
          : {
              [s.field]: s.sort,
            }),
      })),
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
    where: { id, deleted: false },
    include: {
      category: true,
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
}

"use server";
import { prisma } from "@/lib/prisma";
import type { PaginationOptions } from "@/types/pagination";
import type { ProductWhereInput } from "@/types/prisma";

const PRODUCT_PAGE_SIZE = 25 as const;

export async function getProducts() {
  const products = await prisma.product.findMany({
    include: { category: true },
  });

  return products;
}

export async function getFirstPageOfProducts() {
  const products = await prisma.product.findMany({
    include: { category: true },
    take: PRODUCT_PAGE_SIZE,
  });

  const nextCursor = getNextCursor(products);

  return { products, nextCursor };
}

export async function getNextPageOfProducts(cursor: string) {
  const products = await prisma.product.findMany({
    include: { category: true },
    take: PRODUCT_PAGE_SIZE,
    skip: 1,
    cursor: { id: cursor },
  });

  const nextCursor = getNextCursor(products);

  return { products, nextCursor };
}

function getNextCursor<T extends { id: string }>(items: T[]) {
  return items.length === PRODUCT_PAGE_SIZE ? items[items.length - 1].id : null;
}

export async function getProductsPage(
  options: PaginationOptions = {
    field: "id",
    sort: "desc",
    page: 0,
    pageSize: PRODUCT_PAGE_SIZE,
    searchQuery: "",
  },
) {
  const { page, pageSize, field, sort, searchQuery } = options;

  const where: ProductWhereInput = searchQuery
    ? {
        OR: [
          { name: { contains: searchQuery, mode: "insensitive" } },
          { description: { contains: searchQuery, mode: "insensitive" } },
        ],
      }
    : {};

  const orderBy = sort ? { [field]: sort } : {};

  const products = await prisma.product.findMany({
    where,
    include: { category: true },
    skip: page * pageSize,
    take: pageSize,
    orderBy: orderBy,
  });

  const totalProducts = await prisma.product.count({ where });

  return { products, totalProducts, pageSize, page };
}

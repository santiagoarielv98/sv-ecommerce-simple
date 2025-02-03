"use server";

import { prisma } from "@/lib/prisma";

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

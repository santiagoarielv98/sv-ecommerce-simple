"use server";

export async function create() {}
import { prisma } from "@/lib/prisma";
import type { GridSortItem } from "@mui/x-data-grid";
import type { CategorySchema } from "../schemas/category";
import type { ProductSchema } from "../schemas/product";

export async function getProducts({
  page = 1,
  limit = 12,
  sort = [],
}: {
  page?: number;
  limit?: number;
  sort?: GridSortItem[];
}) {
  const skip = (page - 1) * limit;

  const where = {};

  const [items, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip,
      take: limit,
      include: {
        category: true,
      },
      orderBy: getProductSort(sort),
    }),
    prisma.product.count({ where }),
  ]);

  return {
    items,
    total,
    pages: Math.ceil(total / limit),
    currentPage: page,
  };
}

function getProductSort(sort: GridSortItem[]) {
  return sort.map((s) => ({
    ...(s.field === "category"
      ? {
          category: {
            name: s.sort!,
          },
        }
      : {
          [s.field]: s.sort,
        }),
  }));
}

export async function getOrders({
  page = 1,
  limit = 12,
  sort = [],
}: {
  page?: number;
  limit?: number;
  sort?: GridSortItem[];
}) {
  const skip = (page - 1) * limit;

  const where = {};

  const [items, total] = await Promise.all([
    prisma.order.findMany({
      where,
      skip,
      take: limit,
      select: {
        id: true,
        user: {
          select: {
            name: true,
          },
        },
        createdAt: true,
        _count: {
          select: {
            items: true,
          },
        },
        status: true,
        total: true,
      },
      orderBy: getOrderSort(sort),
    }),
    prisma.order.count({ where }),
  ]);
  console.log(items);

  return {
    items,
    total,
    pages: Math.ceil(total / limit),
    currentPage: page,
  };
}

function getOrderSort(sort: GridSortItem[]) {
  return sort.map((s) => ({
    ...(s.field === "user"
      ? {
          user: {
            name: s.sort!,
          },
        }
      : s.field === "_count"
        ? {
            items: {
              _count: s.sort!,
            },
          }
        : {
            [s.field]: s.sort,
          }),
  }));
}

export async function getCategories({
  page = 1,
  limit = 12,
  sort = [],
}: {
  page?: number;
  limit?: number;
  sort?: GridSortItem[];
}) {
  const skip = (page - 1) * limit;

  const where = {};

  const [items, total] = await Promise.all([
    prisma.category.findMany({
      where,
      skip,
      take: limit,
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            products: true,
          },
        },
      },
      orderBy: getCategorySort(sort),
    }),
    prisma.category.count({ where }),
  ]);

  return {
    items,
    total,
    pages: Math.ceil(total / limit),
    currentPage: page,
  };
}

function getCategorySort(sort: GridSortItem[]) {
  return sort.map((s) => ({
    ...(s.field === "_count"
      ? {
          products: {
            _count: s.sort!,
          },
        }
      : {
          [s.field]: s.sort,
        }),
  }));
}

export async function getAllCategories() {
  return prisma.category.findMany();
}

export async function createProduct(data: ProductSchema) {
  return prisma.product.create({
    data,
  });
}

export async function createCategory(data: CategorySchema) {
  return prisma.category.create({
    data,
  });
}

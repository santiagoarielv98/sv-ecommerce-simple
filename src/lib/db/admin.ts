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

  const where = {
    deleted: false,
  };

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

  const where = {
    deleted: false,
  };

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
  return prisma.category.findMany({
    where: {
      deleted: false,
    },
  });
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

export async function deleteProduct(id: string) {
  return prisma.product.update({
    where: {
      id,
    },
    data: {
      deleted: true,
    },
  });
}

export async function editProduct(id: string, data: ProductSchema) {
  return prisma.product.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteCategory(id: string) {
  return prisma.category.update({
    where: {
      id,
    },
    data: {
      deleted: true,
    },
  });
}

export async function editCategory(id: string, data: CategorySchema) {
  return prisma.category.update({
    where: {
      id,
    },
    data,
  });
}

// Fetch stats
// const totalProducts = await prisma.product.count();
// const totalOrders = await prisma.order.count();
// const totalUsers = await prisma.user.count();
// const totalSales = await prisma.order.aggregate({
//   _sum: {
//     total: true,
//   },
// });

// const recentOrders = await prisma.order.findMany({
//   take: 3,
//   orderBy: {
//     createdAt: "desc",
//   },
//   include: {
//     user: {
//       select: {
//         name: true,
//       },
//     },
//   },
// });

// const topProducts = await prisma.orderItem.groupBy({
//   by: ["productId"],
//   _sum: {
//     quantity: true,
//   },
//   orderBy: {
//     _sum: {
//       quantity: "desc",
//     },
//   },
//   take: 5,
// });

// const topProductsWithDetails = await Promise.all(
//   topProducts.map(async (item) => {
//     const product = await prisma.product.findUnique({
//       where: { id: item.productId },
//       select: {
//         id: true,
//         name: true,
//         images: true,
//       },
//     });
//     return {
//       id: product!.id,
//       name: product!.name,
//       images: product!.images,
//       totalSold: item._sum.quantity || 0,
//     };
//   }),
// );

// const totalSalesAmount = totalSales._sum.total ?? 0;

// // Fetch monthly sales data
// const monthlyData = await prisma.order.groupBy({
//   by: ["createdAt"],
//   _sum: {
//     total: true,
//   },
//   where: {
//     createdAt: {
//       gte: new Date(new Date().getFullYear(), 0, 1), // Desde el inicio del año actual
//     },
//   },
// });

// const monthNames = [
//   "Ene",
//   "Feb",
//   "Mar",
//   "Abr",
//   "May",
//   "Jun",
//   "Jul",
//   "Ago",
//   "Sep",
//   "Oct",
//   "Nov",
//   "Dic",
// ];

// const monthlySales = monthlyData.map((item) => ({
//   month: monthNames[new Date(item.createdAt).getMonth()],
//   total: item._sum.total || 0,
// }));

export async function getStats() {
  const [totalProducts, totalOrders, totalUsers, totalSales] =
    await Promise.all([
      prisma.product.count(),
      prisma.order.count(),
      prisma.user.count(),
      prisma.order.aggregate({
        _sum: {
          total: true,
        },
      }),
    ]);

  return {
    totalProducts,
    totalOrders,
    totalUsers,
    totalSalesAmount: totalSales._sum.total ?? 0,
  };
}

export async function getRecentOrders() {
  return prisma.order.findMany({
    take: 3,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });
}

export async function getTopProducts() {
  const topProducts = await prisma.orderItem.groupBy({
    by: ["productId"],
    _sum: {
      quantity: true,
    },
    orderBy: {
      _sum: {
        quantity: "desc",
      },
    },
    take: 5,
  });

  return Promise.all(
    topProducts.map(async (item) => {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
        select: {
          id: true,
          name: true,
          images: true,
        },
      });
      return {
        id: product!.id,
        name: product!.name,
        images: product!.images,
        totalSold: item._sum.quantity || 0,
      };
    }),
  );
}

export async function getMonthlySales() {
  const monthlyData = await prisma.order.groupBy({
    by: ["createdAt"],
    _sum: {
      total: true,
    },
    where: {
      createdAt: {
        gte: new Date(new Date().getFullYear(), 0, 1),
      },
    },
  });

  const monthNames = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];

  return monthlyData.map((item) => ({
    month: monthNames[new Date(item.createdAt).getMonth()],
    total: item._sum.total || 0,
  }));
}

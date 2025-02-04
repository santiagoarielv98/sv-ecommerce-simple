"use server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { newProductSchema } from "@/lib/schemas/product";
import { deleteImage, uploadImages } from "@/lib/upload";
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

export async function getProduct(id: string) {
  return prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });
}

export async function createProduct(formData: FormData) {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const images = formData.getAll("images") as File[];
  const uploadedImages = await uploadImages(images);

  const productData = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    price: Number(formData.get("price")),
    categoryId: formData.get("categoryId") as string,
    stock: Number(formData.get("stock")),
    images: uploadedImages,
  };

  const validatedData = newProductSchema.parse(productData);

  const product = await prisma.product.create({
    data: validatedData,
    include: { category: true },
  });

  return product;
}

export async function updateProduct(id: string, formData: FormData) {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) {
    throw new Error("Product not found");
  }

  const existingImages = formData.getAll("existingImages") as string[];
  const newImageFiles = formData.getAll("newImages") as File[];

  const imagesToDelete = (product.images || []).filter(
    (img) => !existingImages.includes(img),
  );

  for (const image of imagesToDelete) {
    await deleteImage(image);
  }

  const newUploadedImages = await uploadImages(newImageFiles);

  const finalImages = [...existingImages, ...newUploadedImages];

  const productData = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    price: Number(formData.get("price")),
    categoryId: formData.get("categoryId") as string,
    stock: Number(formData.get("stock")),
    images: finalImages,
  };

  const validatedData = newProductSchema.parse(productData);

  return prisma.product.update({
    where: { id },
    data: validatedData,
    include: { category: true },
  });
}

export async function deleteProduct(id: string) {
  return prisma.product.delete({
    where: { id },
  });
}

export async function getCategories() {
  return prisma.category.findMany();
}

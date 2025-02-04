"use client";

import { createProduct } from "@/actions/products";
import { ProductForm } from "@/components/product-form";
import type { ProductFormData } from "@/types/product";
import type { Category } from "@prisma/client";
import { redirect } from "next/navigation";

export interface NewProductFormProps {
  categories: Category[];
}

export default function NewProductForm({ categories }: NewProductFormProps) {
  async function onSubmit(data: ProductFormData) {
    await createProduct(data);
    redirect("/admin");
  }

  return <ProductForm categories={categories} onSubmit={onSubmit} />;
}

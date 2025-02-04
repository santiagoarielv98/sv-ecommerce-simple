"use client";

import { createProduct } from "@/actions/products-admin";
import { ProductForm } from "@/components/product-form";
import type { ProductFormData } from "@/types/product";
import type { Category } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";

export interface NewProductFormProps {
  categories: Category[];
}

export default function NewProductForm({ categories }: NewProductFormProps) {
  async function onSubmit(data: ProductFormData, files: File[]) {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price.toString());
    formData.append("categoryId", data.categoryId);
    formData.append("stock", data.stock.toString());

    files.forEach((file) => {
      formData.append("images", file);
    });

    await createProduct(formData);
    redirect("/admin");
  }

  return <ProductForm categories={categories} onSubmit={onSubmit} />;
}

"use client";

import { createProduct } from "@/actions/products";
import { ProductForm } from "@/components/product-form";
import type { ProductFormData } from "@/types/product";
import type { Category } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";

export interface NewProductFormProps {
  categories: Category[];
}

export default function NewProductForm({ categories }: NewProductFormProps) {
  const [files, setFiles] = React.useState<File[]>([]);

  async function onSubmit(data: ProductFormData) {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price.toString());
    formData.append("categoryId", data.categoryId);
    formData.append("stock", data.stock.toString());
    files.forEach((file) => formData.append("images", file));

    await createProduct(formData);
    // await createProduct(data);
    redirect("/admin");
  }

  return (
    <ProductForm
      categories={categories}
      onSubmit={onSubmit}
      files={files}
      setFiles={setFiles}
    />
  );
}

"use client";
import { updateProduct } from "@/actions/products-admin";
import { ProductForm } from "@/components/product-form";
import type { ProductFormData, ProductWithCategory } from "@/types/product";
import type { Category } from "@prisma/client";
import { redirect } from "next/navigation";
import React, { useState } from "react";

interface EditProductFormProps {
  categories: Category[];
  product: ProductWithCategory;
}

export default function EditProductForm({
  categories,
  product,
}: EditProductFormProps) {
  const [existingImages, setExistingImages] = useState<string[]>(
    product.images || [],
  );

  async function onSubmit(data: ProductFormData, newFiles: File[]) {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price.toString());
    formData.append("categoryId", data.categoryId);
    formData.append("stock", data.stock.toString());

    existingImages.forEach((image) => {
      formData.append("existingImages", image);
    });

    newFiles.forEach((file) => {
      formData.append("newImages", file);
    });

    await updateProduct(product.id, formData);
    redirect("/admin");
  }

  return (
    <ProductForm
      product={{ ...product, images: existingImages }}
      categories={categories}
      onSubmit={onSubmit}
      onExistingImageDelete={(index) => {
        setExistingImages((prev) => prev.filter((_, i) => i !== index));
      }}
    />
  );
}

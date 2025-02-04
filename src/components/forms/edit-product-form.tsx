"use client";
import { updateProduct } from "@/actions/products";
import { ProductForm } from "@/components/product-form";
import type { ProductFormData, ProductWithCategory } from "@/types/product";
import type { Category } from "@prisma/client";
import { redirect } from "next/navigation";

interface EditProductFormProps {
  categories: Category[];
  product: ProductWithCategory;
}

export default function EditProductForm({
  categories,
  product,
}: EditProductFormProps) {
  async function onSubmit(data: ProductFormData) {
    await updateProduct(product.id, data);
    redirect("/admin");
  }

  return (
    <ProductForm
      product={product}
      categories={categories}
      onSubmit={onSubmit}
    />
  );
}

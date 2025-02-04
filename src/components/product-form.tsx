"use client";

import { newProductSchema } from "@/lib/schemas/product";
import type { ProductFormData, ProductWithCategory } from "@/types/product";
import { zodResolver } from "@hookform/resolvers/zod";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import type { Category } from "@prisma/client";
import { Controller, useForm } from "react-hook-form";
import { ImageUpload } from "./image-upload";
import { useState } from "react";

interface ProductFormProps {
  categories: Category[];
  product?: ProductWithCategory;
  onSubmit: (data: ProductFormData, files: File[]) => Promise<void>;
  onExistingImageDelete?: (index: number) => void;
}

export function ProductForm({
  categories,
  product,
  onSubmit,
  onExistingImageDelete,
}: ProductFormProps) {
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(newProductSchema),
    defaultValues: product
      ? {
          ...product,
          price: Number(product.price),
          stock: Number(product.stock),
        }
      : {
          name: "",
          description: "",
          price: 0,
          stock: 0,
          categoryId: "",
          images: [],
        },
  });

  const handleImageUpload = (fileList: FileList) => {
    setNewFiles((prev) => [...prev, ...Array.from(fileList)]);
  };

  const handleImageDelete = (index: number) => {
    if (product?.images && index < product.images.length) {
      onExistingImageDelete?.(index);
    } else {
      const newFileIndex = index - (product?.images?.length || 0);
      setNewFiles((prev) => prev.filter((_, i) => i !== newFileIndex));
    }
  };

  const allImages = [
    ...(product?.images || []),
    ...newFiles.map((file) => URL.createObjectURL(file)),
  ];

  return (
    <Box
      component="form"
      onSubmit={handleSubmit((data) => onSubmit(data, newFiles))}
      noValidate
      sx={{ mt: 1 }}
    >
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <Controller
            name="name"
            control={control}
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Name"
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Controller
            name="description"
            control={control}
            rules={{ required: "Description is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                multiline
                rows={4}
                label="Description"
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="price"
            control={control}
            rules={{ required: "Price is required", min: 0 }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type="number"
                label="Price"
                slotProps={{
                  htmlInput: {
                    step: "0.01",
                  },
                }}
                error={!!errors.price}
                helperText={errors.price?.message}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="stock"
            control={control}
            rules={{ required: "Stock is required", min: 0 }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type="number"
                label="Stock"
                error={!!errors.stock}
                helperText={errors.stock?.message}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Controller
            name="categoryId"
            control={control}
            rules={{ required: "Category is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                select
                fullWidth
                label="Category"
                error={!!errors.categoryId}
                helperText={errors.categoryId?.message}
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <ImageUpload
            images={allImages}
            onImageUpload={handleImageUpload}
            onImageDelete={handleImageDelete}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isSubmitting}
          >
            {product ? "Update Product" : "Create Product"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

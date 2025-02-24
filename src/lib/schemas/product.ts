import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  price: z.coerce.number().min(0, "Price must be greater than 0").step(0.01),
  stock: z.coerce.number().min(0, "Stock must be greater than 0").step(1),
  description: z.string(),
  categoryId: z.string().nonempty("Category is required"),
  images: z.array(z.string()),
});

export type ProductSchema = z.infer<typeof productSchema>;

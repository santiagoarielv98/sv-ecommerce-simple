import { z } from "zod";

export const newProductSchema = z.object({
  name: z.string().min(3),
  price: z.number().min(0),
  stock: z.number().min(0),
  description: z.string(),
  category: z.string(),
  images: z.array(z.string()),
});

export type NewProductSchema = z.infer<typeof newProductSchema>;

import { z } from "zod";

export const newProductSchema = z.object({
  name: z.string().min(3),
  price: z.coerce.number().min(0).step(0.01),
  stock: z.coerce.number().min(0).step(1),
  description: z.string(),
  categoryId: z.string().nonempty(),
});

export type NewProductSchema = z.infer<typeof newProductSchema>;

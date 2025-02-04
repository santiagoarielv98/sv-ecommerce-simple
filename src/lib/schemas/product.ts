import { z } from "zod";

export const newProductSchema = z.object({
  name: z.string().min(3),
  price: z.coerce.number().min(0),
  stock: z.coerce.number().min(0),
  description: z.string(),
  categoryId: z.string().nonempty(),
  images: z.array(z.string()),
});

export type NewProductSchema = z.infer<typeof newProductSchema>;

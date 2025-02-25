import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
});

export type CategorySchema = z.infer<typeof categorySchema>;

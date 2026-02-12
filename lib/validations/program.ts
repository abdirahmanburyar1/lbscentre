import { z } from "zod";

export const programSchema = z.object({
  title: z.string().min(2, "Title is required").max(200),
  slug: z.string().min(2).max(200).optional(),
  description: z.string().min(10, "Description is required"),
  image: z.string().url().optional().or(z.literal("")),
  order: z.coerce.number().int().min(0).optional(),
});

export type ProgramInput = z.infer<typeof programSchema>;

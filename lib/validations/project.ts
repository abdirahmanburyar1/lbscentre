import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(2, "Title is required").max(200),
  slug: z.string().min(2).max(200).optional(),
  description: z.string().min(10, "Description is required"),
  location: z.string().max(200).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  coverImage: z.string().url().optional().or(z.literal("")),
  outcomes: z.string().optional(),
  programId: z.string().uuid().optional().nullable(),
  gallery: z.array(z.string().url()).optional(),
});

export type ProjectInput = z.infer<typeof projectSchema>;

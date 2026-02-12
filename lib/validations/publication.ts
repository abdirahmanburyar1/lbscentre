import { z } from "zod";

export const publicationSchema = z.object({
  title: z.string().min(2, "Title is required").max(200),
  description: z.string().min(10, "Description is required"),
  fileUrl: z.string().url("Valid PDF URL is required"),
  publishedAt: z.string().min(1, "Publish date is required"),
  category: z.string().max(100).optional(),
  coverImage: z.string().url().optional().or(z.literal("")),
});

export type PublicationInput = z.infer<typeof publicationSchema>;

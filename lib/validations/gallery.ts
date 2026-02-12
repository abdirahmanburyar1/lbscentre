import { z } from "zod";

export const galleryImageSchema = z.object({
  imageUrl: z.string().url("Valid image URL is required"),
  caption: z.string().max(500).optional(),
  projectId: z.string().uuid().optional().nullable(),
});

export type GalleryImageInput = z.infer<typeof galleryImageSchema>;

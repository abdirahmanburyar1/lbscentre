import { z } from "zod";

export const trainingSchema = z.object({
  title: z.string().min(2, "Title is required").max(200),
  description: z.string().min(10, "Description is required"),
  location: z.string().max(200).optional(),
  date: z.string().min(1, "Date is required"),
  category: z.string().max(100).optional(),
  image: z.string().url().optional().or(z.literal("")),
});

export type TrainingInput = z.infer<typeof trainingSchema>;

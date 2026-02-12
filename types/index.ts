import type { Project, Program, Training, Publication, GalleryImage, ContactMessage } from "@prisma/client";

export type { Project, Program, Training, Publication, GalleryImage, ContactMessage };

export type ProjectWithProgram = Project & { program: Program | null };
export type GalleryImageWithProject = GalleryImage & { project: Project | null };

export type Paginated<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
};

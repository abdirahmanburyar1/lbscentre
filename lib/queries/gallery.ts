import { prisma } from "@/lib/db";
import { PAGINATION } from "@/lib/utils";
import type { Paginated } from "@/types";

export async function getGalleryPaginated(page: number): Promise<
  Paginated<Awaited<ReturnType<typeof getGalleryItems>>[0]>
> {
  const skip = (page - 1) * PAGINATION.gallery;
  const where = { deletedAt: null };
  const [items, total] = await Promise.all([
    prisma.galleryImage.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: PAGINATION.gallery,
      include: { project: true },
    }),
    prisma.galleryImage.count({ where }),
  ]);
  const totalPages = Math.ceil(total / PAGINATION.gallery) || 1;
  return {
    items,
    total,
    page,
    pageSize: PAGINATION.gallery,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
}

export async function getGalleryItems(page: number) {
  const skip = (page - 1) * PAGINATION.gallery;
  return prisma.galleryImage.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: "desc" },
    skip,
    take: PAGINATION.gallery,
    include: { project: true },
  });
}

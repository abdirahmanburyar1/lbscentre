import { prisma } from "@/lib/db";
import { PAGINATION } from "@/lib/utils";

export async function getGalleryEventsPaginated(page: number) {
  const skip = (page - 1) * PAGINATION.gallery;
  
  const [items, total] = await Promise.all([
    prisma.galleryEvent.findMany({
      where: { deletedAt: null },
      orderBy: { date: "desc" },
      skip,
      take: PAGINATION.gallery,
      include: {
        images: {
           where: { deletedAt: null },
           take: 1, // Only need one to check/show if cover is missing, though we use coverImage field
        }
      }
    }),
    prisma.galleryEvent.count({ where: { deletedAt: null } }),
  ]);

  return {
    items,
    total,
    page,
    totalPages: Math.ceil(total / PAGINATION.gallery) || 1,
  };
}

export async function getGalleryEventBySlug(id: string) {
    // Note: using ID not slug for now as per schema
    return prisma.galleryEvent.findUnique({
        where: { id },
        include: {
            images: {
                where: { deletedAt: null },
                orderBy: { createdAt: "asc" }
            }
        }
    });
}

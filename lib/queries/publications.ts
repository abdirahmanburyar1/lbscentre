import { prisma } from "@/lib/db";
import { PAGINATION } from "@/lib/utils";
import type { Paginated } from "@/types";

export async function getPublicationsPaginated(page: number): Promise<
  Paginated<Awaited<ReturnType<typeof getPublicationItems>>[0]>
> {
  const skip = (page - 1) * PAGINATION.publications;
  const where = { deletedAt: null };
  const [items, total] = await Promise.all([
    prisma.publication.findMany({
      where,
      orderBy: { publishedAt: "desc" },
      skip,
      take: PAGINATION.publications,
    }),
    prisma.publication.count({ where }),
  ]);
  const totalPages = Math.ceil(total / PAGINATION.publications) || 1;
  return {
    items,
    total,
    page,
    pageSize: PAGINATION.publications,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
}

export async function getPublicationItems(page: number) {
  const skip = (page - 1) * PAGINATION.publications;
  return prisma.publication.findMany({
    where: { deletedAt: null },
    orderBy: { publishedAt: "desc" },
    skip,
    take: PAGINATION.publications,
  });
}

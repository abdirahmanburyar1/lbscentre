import { prisma } from "@/lib/db";
import { PAGINATION } from "@/lib/utils";
import type { Paginated } from "@/types";

export async function getTrainingsPaginated(page: number): Promise<
  Paginated<Awaited<ReturnType<typeof getTrainingItems>>[0]>
> {
  const skip = (page - 1) * PAGINATION.trainings;
  const where = { deletedAt: null };
  const [items, total] = await Promise.all([
    prisma.training.findMany({
      where,
      orderBy: { date: "desc" },
      skip,
      take: PAGINATION.trainings,
    }),
    prisma.training.count({ where }),
  ]);
  const totalPages = Math.ceil(total / PAGINATION.trainings) || 1;
  return {
    items,
    total,
    page,
    pageSize: PAGINATION.trainings,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
}

export async function getTrainingItems(page: number) {
  const skip = (page - 1) * PAGINATION.trainings;
  return prisma.training.findMany({
    where: { deletedAt: null },
    orderBy: { date: "desc" },
    skip,
    take: PAGINATION.trainings,
  });
}

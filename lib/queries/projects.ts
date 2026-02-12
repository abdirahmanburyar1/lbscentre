import { prisma } from "@/lib/db";
import { PAGINATION } from "@/lib/utils";
import type { Paginated } from "@/types";

export async function getFeaturedProjects(limit = 3) {
  return prisma.project.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: "desc" },
    take: limit,
    include: { program: true },
  });
}

export async function getProjectsPaginated(
  page: number,
  search?: string
): Promise<Paginated<Awaited<ReturnType<typeof getProjectsPageItems>>[0]>> {
  const skip = (page - 1) * PAGINATION.projects;
  const where = {
    deletedAt: null,
    ...(search
      ? {
          OR: [
            { title: { contains: search, mode: "insensitive" as const } },
            { description: { contains: search, mode: "insensitive" as const } },
            { location: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };
  const [items, total] = await Promise.all([
    prisma.project.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: PAGINATION.projects,
      include: { program: true },
    }),
    prisma.project.count({ where }),
  ]);
  const totalPages = Math.ceil(total / PAGINATION.projects) || 1;
  return {
    items,
    total,
    page,
    pageSize: PAGINATION.projects,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
}

export async function getProjectsPageItems(page: number, search?: string) {
  const skip = (page - 1) * PAGINATION.projects;
  const where = {
    deletedAt: null,
    ...(search
      ? {
          OR: [
            { title: { contains: search, mode: "insensitive" as const } },
            { description: { contains: search, mode: "insensitive" as const } },
            { location: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };
  return prisma.project.findMany({
    where,
    orderBy: { createdAt: "desc" },
    skip,
    take: PAGINATION.projects,
    include: { program: true },
  });
}

export async function getProjectBySlug(slug: string) {
  return prisma.project.findFirst({
    where: { slug, deletedAt: null },
    include: { program: true },
  });
}

export async function getProjectCount() {
  return prisma.project.count({ where: { deletedAt: null } });
}

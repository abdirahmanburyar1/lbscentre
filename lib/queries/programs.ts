import { prisma } from "@/lib/db";

export async function getAllPrograms() {
  return prisma.program.findMany({
    where: { deletedAt: null },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
}

export async function getProgramBySlug(slug: string) {
  return prisma.program.findFirst({
    where: { slug, deletedAt: null },
    include: {
      projects: { where: { deletedAt: null }, orderBy: { createdAt: "desc" } },
    },
  });
}

import { prisma } from "@/lib/db";

export async function getPartners() {
  return prisma.partner.findMany({
    where: { deletedAt: null },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
}

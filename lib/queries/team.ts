import { prisma } from "@/lib/db";

export async function getTeamMembers() {
  return prisma.teamMember.findMany({
    where: { deletedAt: null },
    orderBy: [{ order: "asc" }, { name: "asc" }],
  });
}

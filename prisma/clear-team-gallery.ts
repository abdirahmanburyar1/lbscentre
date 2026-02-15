/**
 * Clears all Our Team and Gallery data from the database.
 * Run with: npx tsx prisma/clear-team-gallery.ts
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Gallery: delete images linked to events first, then events
  const deletedImages = await prisma.galleryImage.deleteMany({
    where: { eventId: { not: null } },
  });
  const deletedEvents = await prisma.galleryEvent.deleteMany({});
  const deletedTeam = await prisma.teamMember.deleteMany({});

  console.log("Cleared:");
  console.log("  Gallery images (from events):", deletedImages.count);
  console.log("  Gallery events:", deletedEvents.count);
  console.log("  Team members:", deletedTeam.count);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

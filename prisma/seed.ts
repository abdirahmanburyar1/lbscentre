import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL ?? "admin@lbscentre.org";
  const password = process.env.ADMIN_PASSWORD ?? "admin123change";
  const hashed = await bcrypt.hash(password, 12);
  await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      password: hashed,
      name: "Admin",
      role: "admin",
    },
  });
  console.log("Admin credentials:");
  console.log("  Email:", email);
  console.log("  Password:", process.env.ADMIN_PASSWORD ? "[from ADMIN_PASSWORD]" : "admin123change (change this!)");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

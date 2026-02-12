/**
 * Build script: loads .env so local build uses your real DATABASE_URL.
 * If DATABASE_URL is still missing (e.g. Vercel without Build env), uses a placeholder
 * so prisma generate succeeds; data-dependent pages use dynamic rendering so they don't run at build.
 */
const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const envPath = path.join(process.cwd(), ".env");
if (fs.existsSync(envPath)) {
  require("dotenv").config({ path: envPath });
}

if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = "postgresql://build:build@localhost:5432/build?schema=public";
  console.warn("[build] DATABASE_URL not set; using placeholder. Set it in .env (local) or Vercel Build env.");
}

execSync("npx prisma generate", { stdio: "inherit", env: process.env });
execSync("npx next build", { stdio: "inherit", env: process.env });

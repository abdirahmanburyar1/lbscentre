# Vercel environment variables

For the app to work on Vercel, these variables must be set and available at **runtime** (when users visit the site), not only at build time.

## Required for Production and Preview

In **Vercel** → your project → **Settings** → **Environment Variables**, add:

| Variable | Where to use it | Notes |
|----------|-----------------|--------|
| `DATABASE_URL` | **Production**, **Preview** (and **Build** if you want build to use DB) | Your Neon PostgreSQL URL. Without this, every page that uses the DB will throw "Environment variable not found: DATABASE_URL". |
| `JWT_SECRET` | Production, Preview | Same value as in your local `.env`. |
| `IMAGEKIT_PRIVATE_KEY` | Production, Preview | For ImageKit upload auth. |
| `NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY` | Production, Preview | For ImageKit on the client. |
| `NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT` | Production, Preview | e.g. `https://ik.imagekit.io/yourid`. |

**Important:** For each variable, under **Environment**, check at least **Production** and **Preview**. If you only checked "Build" or "Development", the serverless functions that run when someone visits the site will not see `DATABASE_URL`.

After saving, **redeploy** (Deployments → … → Redeploy) so the new env is applied.

---

## Verify tables in the database

Your schema expects these tables (PostgreSQL, schema `public`):

- `User`
- `ContactMessage`
- `Program`
- `Project`
- `Training`
- `Publication`
- `TeamMember`
- `GalleryImage`

**To check or create them locally** (with `DATABASE_URL` in `.env`):

```bash
npx prisma db push
```

If the DB is in sync, you’ll see: “The database is already in sync with the Prisma schema.”  
If tables were missing, they are created.

**To browse data:**

```bash
npx prisma studio
```

Opens a UI at http://localhost:5555 to view and edit tables.  
Once `DATABASE_URL` is set on Vercel for Production/Preview and you redeploy, the live site will use the same database and tables.

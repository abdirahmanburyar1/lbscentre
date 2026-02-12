import { prisma } from "@/lib/db";
import { PAGINATION } from "@/lib/utils";
import { AdminPagination } from "@/components/admin/AdminPagination";

type Props = { searchParams: Promise<{ page?: string }> };

export default async function AdminGalleryPage({ searchParams }: Props) {
  const { page = "1" } = await searchParams;
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const skip = (pageNum - 1) * PAGINATION.admin;
  const [items, total] = await Promise.all([
    prisma.galleryImage.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
      skip,
      take: PAGINATION.admin,
      include: { project: true },
    }),
    prisma.galleryImage.count({ where: { deletedAt: null } }),
  ]);
  const totalPages = Math.ceil(total / PAGINATION.admin) || 1;
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-slate-900">Gallery</h1>
      <p className="mt-2 text-slate-600">CRUD for Gallery images (same pattern as Projects).</p>
      <div className="mt-6 overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-900">Caption</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-900">Project</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {items.map((img) => (
              <tr key={img.id}>
                <td className="px-4 py-3 text-slate-700">{img.caption ?? "—"}</td>
                <td className="px-4 py-3 text-slate-600">{img.project?.title ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AdminPagination basePath="/admin/gallery" page={pageNum} totalPages={totalPages} />
    </div>
  );
}

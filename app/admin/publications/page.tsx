import { prisma } from "@/lib/db";
import { PAGINATION } from "@/lib/utils";
import { AdminPagination } from "@/components/admin/AdminPagination";
import { formatDate } from "@/lib/utils";

type Props = { searchParams: Promise<{ page?: string }> };

export default async function AdminPublicationsPage({ searchParams }: Props) {
  const { page = "1" } = await searchParams;
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const skip = (pageNum - 1) * PAGINATION.admin;
  const [publications, total] = await Promise.all([
    prisma.publication.findMany({
      where: { deletedAt: null },
      orderBy: { publishedAt: "desc" },
      skip,
      take: PAGINATION.admin,
    }),
    prisma.publication.count({ where: { deletedAt: null } }),
  ]);
  const totalPages = Math.ceil(total / PAGINATION.admin) || 1;
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-slate-900">Publications</h1>
      <p className="mt-2 text-slate-600">CRUD for Publications (same pattern as Projects).</p>
      <div className="mt-6 overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-900">Title</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-900">Published</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {publications.map((p) => (
              <tr key={p.id}>
                <td className="px-4 py-3 text-slate-700">{p.title}</td>
                <td className="px-4 py-3 text-slate-600">{formatDate(p.publishedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AdminPagination basePath="/admin/publications" page={pageNum} totalPages={totalPages} />
    </div>
  );
}

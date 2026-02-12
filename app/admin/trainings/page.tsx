import { prisma } from "@/lib/db";
import { PAGINATION } from "@/lib/utils";
import { AdminPagination } from "@/components/admin/AdminPagination";
import { formatDate } from "@/lib/utils";

type Props = { searchParams: Promise<{ page?: string }> };

export default async function AdminTrainingsPage({ searchParams }: Props) {
  const { page = "1" } = await searchParams;
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const skip = (pageNum - 1) * PAGINATION.admin;
  const [trainings, total] = await Promise.all([
    prisma.training.findMany({
      where: { deletedAt: null },
      orderBy: { date: "desc" },
      skip,
      take: PAGINATION.admin,
    }),
    prisma.training.count({ where: { deletedAt: null } }),
  ]);
  const totalPages = Math.ceil(total / PAGINATION.admin) || 1;
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-slate-900">Trainings</h1>
      <p className="mt-2 text-slate-600">CRUD for Trainings (same pattern as Projects).</p>
      <div className="mt-6 overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-900">Title</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-900">Date</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-900">Location</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {trainings.map((t) => (
              <tr key={t.id}>
                <td className="px-4 py-3 text-slate-700">{t.title}</td>
                <td className="px-4 py-3 text-slate-600">{formatDate(t.date)}</td>
                <td className="px-4 py-3 text-slate-600">{t.location ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AdminPagination basePath="/admin/trainings" page={pageNum} totalPages={totalPages} />
    </div>
  );
}

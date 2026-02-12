import { prisma } from "@/lib/db";
import { PAGINATION } from "@/lib/utils";
import { AdminPagination } from "@/components/admin/AdminPagination";
import { formatDate } from "@/lib/utils";

type Props = { searchParams: Promise<{ page?: string }> };

export default async function AdminMessagesPage({ searchParams }: Props) {
  const { page = "1" } = await searchParams;
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const skip = (pageNum - 1) * PAGINATION.admin;
  const [messages, total] = await Promise.all([
    prisma.contactMessage.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
      skip,
      take: PAGINATION.admin,
    }),
    prisma.contactMessage.count({ where: { deletedAt: null } }),
  ]);
  const totalPages = Math.ceil(total / PAGINATION.admin) || 1;
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-slate-900">Contact Messages</h1>
      <p className="mt-2 text-slate-600">Read and delete contact form submissions.</p>
      <div className="mt-6 overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-900">From</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-900">Subject</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-900">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {messages.map((m) => (
              <tr key={m.id}>
                <td className="px-4 py-3 text-slate-700">
                  {m.name} &lt;{m.email}&gt;
                </td>
                <td className="px-4 py-3 text-slate-600">{m.subject}</td>
                <td className="px-4 py-3 text-slate-600">{formatDate(m.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AdminPagination basePath="/admin/messages" page={pageNum} totalPages={totalPages} />
    </div>
  );
}

import Link from "next/link";
import { prisma } from "@/lib/db";
import { PAGINATION } from "@/lib/utils";
import { AdminPagination } from "@/components/admin/AdminPagination";
import { deleteProject } from "./actions";

type Props = { searchParams: Promise<{ page?: string; search?: string }> };

export default async function AdminProjectsPage({ searchParams }: Props) {
  const { page = "1", search } = await searchParams;
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const skip = (pageNum - 1) * PAGINATION.admin;
  const where = {
    deletedAt: null,
    ...(search
      ? {
          OR: [
            { title: { contains: search, mode: "insensitive" as const } },
            { location: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };
  const [projects, total] = await Promise.all([
    prisma.project.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: PAGINATION.admin,
      include: { program: true },
    }),
    prisma.project.count({ where }),
  ]);
  const totalPages = Math.ceil(total / PAGINATION.admin) || 1;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-slate-900">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="rounded-lg bg-[var(--logo-green)] hover:bg-[var(--logo-green-dark)] px-4 py-2 font-medium text-white"
        >
          Add Project
        </Link>
      </div>
      <form method="get" className="mt-4 flex gap-2">
        <input
          type="search"
          name="search"
          defaultValue={search}
          placeholder="Search projects..."
          className="rounded-lg border border-slate-300 px-3 py-2"
        />
        <button type="submit" className="rounded-lg border border-slate-300 px-4 py-2">
          Search
        </button>
      </form>
      <div className="mt-6 overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-900">Title</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-900">Location</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-900">Program</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-slate-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {projects.map((p) => (
              <tr key={p.id}>
                <td className="px-4 py-3 text-slate-700">{p.title}</td>
                <td className="px-4 py-3 text-slate-600">{p.location ?? "—"}</td>
                <td className="px-4 py-3 text-slate-600">{p.program?.title ?? "—"}</td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/projects/${p.id}/edit`}
                    className="text-[var(--logo-green-dark)] hover:underline mr-4"
                  >
                    Edit
                  </Link>
                  <form action={deleteProject} className="inline">
                    <input type="hidden" name="id" value={p.id} />
                    <button type="submit" className="text-red-600 hover:underline">
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AdminPagination
        basePath="/admin/projects"
        page={pageNum}
        totalPages={totalPages}
        searchParams={search ? { search } : undefined}
      />
    </div>
  );
}

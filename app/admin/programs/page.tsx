import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function AdminProgramsPage() {
  const programs = await prisma.program.findMany({
    where: { deletedAt: null },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-slate-900">Programs</h1>
      <p className="mt-2 text-slate-600">CRUD for Programs can be added here (same pattern as Projects).</p>
      <div className="mt-6 overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-900">Title</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-900">Slug</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {programs.map((p) => (
              <tr key={p.id}>
                <td className="px-4 py-3 text-slate-700">{p.title}</td>
                <td className="px-4 py-3 text-slate-600">{p.slug}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {programs.length === 0 && (
        <p className="mt-4 text-slate-500">No programs yet.</p>
      )}
    </div>
  );
}

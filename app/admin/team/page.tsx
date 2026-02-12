import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/db";
import { PAGINATION } from "@/lib/utils";
import { AdminPagination } from "@/components/admin/AdminPagination";
import { ImageKitUploadField } from "@/components/admin/ImageKitUploadField";
import { createTeamMember } from "./actions";

type Props = { searchParams: Promise<{ page?: string }> };

export default async function AdminTeamPage({ searchParams }: Props) {
  const { page = "1" } = await searchParams;
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const skip = (pageNum - 1) * PAGINATION.team;
  const [members, total] = await Promise.all([
    prisma.teamMember.findMany({
      where: { deletedAt: null },
      orderBy: [{ order: "asc" }, { name: "asc" }],
      skip,
      take: PAGINATION.team,
    }),
    prisma.teamMember.count({ where: { deletedAt: null } }),
  ]);
  const totalPages = Math.ceil(total / PAGINATION.team) || 1;

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-slate-900">Our Team</h1>
      <p className="mt-2 text-slate-600">
        Manage team members shown on the public Our Team page.
      </p>

      {/* Add form */}
      <form
        action={createTeamMember}
        className="mt-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
      >
        <h2 className="font-display text-lg font-semibold text-slate-900">Add team member</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-[var(--logo-green)] focus:outline-none focus:ring-1 focus:ring-[var(--logo-green)]"
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-slate-700">Role</label>
            <input
              id="role"
              name="role"
              type="text"
              required
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-[var(--logo-green)] focus:outline-none focus:ring-1 focus:ring-[var(--logo-green)]"
            />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="bio" className="block text-sm font-medium text-slate-700">Bio (optional)</label>
          <textarea
            id="bio"
            name="bio"
            rows={3}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-[var(--logo-green)] focus:outline-none focus:ring-1 focus:ring-[var(--logo-green)]"
          />
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <ImageKitUploadField
              inputId="image"
              inputName="image"
              label="Image (optional) – paste URL or upload"
            />
          </div>
          <div>
            <label htmlFor="order" className="block text-sm font-medium text-slate-700">Order</label>
            <input
              id="order"
              name="order"
              type="number"
              defaultValue={0}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-[var(--logo-green)] focus:outline-none focus:ring-1 focus:ring-[var(--logo-green)]"
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 rounded-md bg-[var(--logo-green)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--logo-green-dark)]"
        >
          Add team member
        </button>
      </form>

      <div className="mt-8 overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-900">Photo</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-900">Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-900">Role</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-900">Order</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-slate-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {members.map((m) => (
              <tr key={m.id}>
                <td className="px-4 py-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full bg-slate-100">
                    {m.image ? (
                      <Image src={m.image} alt={m.name} fill className="object-cover" />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center text-lg font-semibold text-slate-400">
                        {m.name.charAt(0)}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 font-medium text-slate-900">{m.name}</td>
                <td className="px-4 py-3 text-slate-600">{m.role}</td>
                <td className="px-4 py-3 text-slate-600">{m.order}</td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/team/${m.id}/edit`}
                    className="text-sm text-[var(--logo-green)] hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AdminPagination basePath="/admin/team" page={pageNum} totalPages={totalPages} />
    </div>
  );
}

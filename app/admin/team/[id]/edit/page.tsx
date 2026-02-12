import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { ImageKitUploadField } from "@/components/admin/ImageKitUploadField";
import { updateTeamMember, deleteTeamMember } from "../../actions";

type Props = { params: Promise<{ id: string }> };

export default async function EditTeamMemberPage({ params }: Props) {
  const { id } = await params;
  const member = await prisma.teamMember.findUnique({ where: { id } });
  if (!member || member.deletedAt) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-slate-900">Edit team member</h1>
      <p className="mt-2 text-slate-600">
        <Link href="/admin/team" className="text-[var(--logo-green)] hover:underline">← Back to Our Team</Link>
      </p>

      <form
        action={async (fd: FormData) => {
          await updateTeamMember(id, undefined, fd);
        }}
        className="mt-6 max-w-xl rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              defaultValue={member.name}
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
              defaultValue={member.role}
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
            defaultValue={member.bio ?? ""}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-[var(--logo-green)] focus:outline-none focus:ring-1 focus:ring-[var(--logo-green)]"
          />
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <ImageKitUploadField
              inputId="image"
              inputName="image"
              label="Image (optional) – paste URL or upload"
              defaultValue={member.image ?? ""}
            />
          </div>
          <div>
            <label htmlFor="order" className="block text-sm font-medium text-slate-700">Order</label>
            <input
              id="order"
              name="order"
              type="number"
              defaultValue={member.order}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-[var(--logo-green)] focus:outline-none focus:ring-1 focus:ring-[var(--logo-green)]"
            />
          </div>
        </div>
        <div className="mt-6 flex gap-3">
          <button
            type="submit"
            className="rounded-md bg-[var(--logo-green)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--logo-green-dark)]"
          >
            Save changes
          </button>
          <form action={deleteTeamMember} className="inline">
            <input type="hidden" name="id" value={id} />
            <button
              type="submit"
              className="rounded-md border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
              onClick={(e) => !confirm("Delete this team member?") && e.preventDefault()}
            >
              Delete
            </button>
          </form>
        </div>
      </form>
    </div>
  );
}

import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Plus, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { revalidatePath } from "next/cache";
import { deletePartner } from "./actions";

export default async function PartnersPage() {
  await requireAdmin();

  const partners = await prisma.partner.findMany({
    where: { deletedAt: null },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });

  async function handleDelete(id: string) {
    "use server";
    await deletePartner(id);
    revalidatePath("/admin/partners");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Partners</h1>
        <Link 
          href="/admin/partners/new"
          className="inline-flex items-center justify-center rounded-md bg-[var(--logo-green)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--logo-green-dark)]"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Partner
        </Link>
      </div>

      <div className="rounded-md border">
        <div className="grid grid-cols-12 gap-4 border-b bg-muted/50 p-4 text-sm font-medium">
          <div className="col-span-2">Order</div>
          <div className="col-span-3">Name</div>
          <div className="col-span-3">Logo</div>
          <div className="col-span-3">Website</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>
        {partners.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            No partners found. Add your first partner.
          </div>
        ) : (
          partners.map((partner) => (
            <div
              key={partner.id}
              className="grid grid-cols-12 gap-4 items-center border-b p-4 text-sm last:border-0 hover:bg-muted/50"
            >
              <div className="col-span-2 font-mono">{partner.order}</div>
              <div className="col-span-3 font-medium">{partner.name}</div>
              <div className="col-span-3 relative h-10 w-24">
                {partner.logo && (
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain object-left"
                  />
                )}
              </div>
              <div className="col-span-3 truncate text-muted-foreground">
                {partner.website || "-"}
              </div>
              <div className="col-span-1 flex justify-end gap-2">
                <Link
                   href={`/admin/partners/${partner.id}/edit`}
                   className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-slate-100"
                >
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                </Link>
                <form action={handleDelete.bind(null, partner.id)}>
                   <button 
                     type="submit"
                     className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-slate-100 text-red-500 hover:text-red-600"
                   >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </button>
                </form>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

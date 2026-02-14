import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { PAGINATION } from "@/lib/utils"; // removed formatDate
import { AdminPagination } from "@/components/admin/AdminPagination";
import { Plus, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { revalidatePath } from "next/cache";
import { deleteGalleryEvent } from "./actions";

function formatDate(date: Date | string): string {
    return new Date(date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

export default async function AdminGalleryPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  await requireAdmin();

  const { page = "1" } = await searchParams;
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const skip = (pageNum - 1) * PAGINATION.gallery;
  const [events, total] = await Promise.all([
    prisma.galleryEvent.findMany({
      where: { deletedAt: null },
      orderBy: { date: "desc" },
      skip,
      take: PAGINATION.gallery,
      include: {
        _count: {
          select: { images: { where: { deletedAt: null } } }
        }
      }
    }),
    prisma.galleryEvent.count({ where: { deletedAt: null } }),
  ]);
  const totalPages = Math.ceil(total / PAGINATION.gallery) || 1;

  async function handleDelete(id: string) {
    "use server";
    await deleteGalleryEvent(id);
    revalidatePath("/admin/gallery");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-display text-slate-900">Gallery Events</h1>
        <Link 
          href="/admin/gallery/new"
          className="inline-flex items-center justify-center rounded-md bg-[var(--logo-green)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--logo-green-dark)]"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Gallery Event
        </Link>
      </div>

      <div className="rounded-md border bg-white">
        <div className="grid grid-cols-12 gap-4 border-b bg-muted/50 p-4 text-sm font-medium text-slate-900">
          <div className="col-span-2">Date</div>
          <div className="col-span-4">Title</div>
          <div className="col-span-2">Cover</div>
          <div className="col-span-2">Images</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>
        {events.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            No gallery events found. Add your first event.
          </div>
        ) : (
          events.map((event) => (
            <div
              key={event.id}
              className="grid grid-cols-12 gap-4 items-center border-b p-4 text-sm last:border-0 hover:bg-slate-50"
            >
              <div className="col-span-2 font-mono text-slate-600">{formatDate(event.date)}</div>
              <div className="col-span-4 font-medium text-slate-900 line-clamp-2">{event.title}</div>
              <div className="col-span-2 relative h-12 w-20 bg-slate-100 rounded overflow-hidden">
                {event.coverImage ? (
                  <Image
                    src={event.coverImage}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-xs text-slate-400">No Img</div>
                )}
              </div>
              <div className="col-span-2 text-slate-600">
                {event._count.images} images
              </div>
              <div className="col-span-2 flex justify-end gap-2">
                <Link
                   href={`/admin/gallery/${event.id}/edit`}
                   className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-slate-100 text-slate-600 hover:text-[var(--logo-green)]"
                >
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                </Link>
                <form action={handleDelete.bind(null, event.id)}>
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
      <AdminPagination basePath="/admin/gallery" page={pageNum} totalPages={totalPages} />
    </div>
  );
}

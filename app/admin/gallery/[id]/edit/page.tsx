import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { GalleryEventForm } from "../../GalleryEventForm";
import { updateGalleryEvent } from "../../actions";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditGalleryEventPage({ params }: Props) {
  await requireAdmin();
  const { id } = await params;

  const event = await prisma.galleryEvent.findUnique({
    where: { id },
    include: {
      images: {
        where: { deletedAt: null },
        orderBy: { createdAt: "asc" }
      }
    }
  });

  if (!event) {
    notFound();
  }

  return (
    <div className="max-w-4xl">
      <h1 className="mb-6 text-3xl font-bold font-display text-slate-900">Edit Gallery Event</h1>
       <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <GalleryEventForm 
          action={updateGalleryEvent as unknown as (formData: FormData) => Promise<void>}
          initialData={event}
          hiddenFields={{ id }}
        />
      </div>
    </div>
  );
}

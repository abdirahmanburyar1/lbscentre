import { requireAdmin } from "@/lib/auth";
import { GalleryEventForm } from "../GalleryEventForm";
import { createGalleryEvent } from "../actions";

export default async function NewGalleryEventPage() {
  await requireAdmin();

  return (
    <div className="max-w-4xl">
      <h1 className="mb-6 text-3xl font-bold font-display text-slate-900">Add New Gallery Event</h1>
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <GalleryEventForm action={createGalleryEvent as unknown as (formData: FormData) => Promise<void>} />
      </div>
    </div>
  );
}

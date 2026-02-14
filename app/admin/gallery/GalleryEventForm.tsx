"use client";

import Link from "next/link";
import { useFormStatus } from "react-dom";
import { GalleryUpload } from "@/components/admin/GalleryUpload";
import { useState } from "react";

type GalleryEventFormProps = {
  action: (formData: FormData) => Promise<void>;
  initialData?: {
    id: string;
    title: string;
    description: string | null;
    date: Date;
    images: { id: string; imageUrl: string }[];
  };
  hiddenFields?: Record<string, string>;
};

function SubmitButton({ isEditing }: { isEditing: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-md bg-[var(--logo-green)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--logo-green-dark)] disabled:opacity-50"
    >
      {pending ? "Saving..." : isEditing ? "Update Gallery Event" : "Create Gallery Event"}
    </button>
  );
}

export function GalleryEventForm({ action, initialData, hiddenFields }: GalleryEventFormProps) {
  const [newImages, setNewImages] = useState<string[]>([]);
  const [removedImageIds, setRemovedImageIds] = useState<string[]>([]);

  return (
    <form action={action} className="space-y-6">
      {hiddenFields &&
        Object.entries(hiddenFields).map(([key, value]) => (
          <input key={key} type="hidden" name={key} value={value} />
        ))}
      
      {/* Hidden inputs to pass image state to server action via FormData */}
      <input type="hidden" name="newImages" value={JSON.stringify(newImages)} />
      <input type="hidden" name="removedImageIds" value={JSON.stringify(removedImageIds)} />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium text-slate-700">
            Event Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            defaultValue={initialData?.title}
            className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:border-[var(--logo-green)] focus:outline-none focus:ring-1 focus:ring-[var(--logo-green)] disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="date" className="text-sm font-medium text-slate-700">
            Date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            defaultValue={initialData?.date ? new Date(initialData.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
            className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:border-[var(--logo-green)] focus:outline-none focus:ring-1 focus:ring-[var(--logo-green)] disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium text-slate-700">
          Description (Optional)
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          defaultValue={initialData?.description || ""}
          className="flex min-h-[80px] w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:border-[var(--logo-green)] focus:outline-none focus:ring-1 focus:ring-[var(--logo-green)] disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      <div className="space-y-2">
        <GalleryUpload 
           currentImages={initialData?.images}
           onImagesChange={(added, removed) => {
               setNewImages(added);
               setRemovedImageIds(removed);
           }}
        />
      </div>

      <div className="flex justify-end gap-4">
        <Link
          href="/admin/gallery"
          className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </Link>
        <SubmitButton isEditing={!!initialData} />
      </div>
    </form>
  );
}

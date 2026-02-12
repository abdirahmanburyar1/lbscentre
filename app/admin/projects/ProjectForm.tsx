"use client";

import { useActionState } from "react";
import type { Program } from "@prisma/client";

type ProjectFormProps = {
  action: (prevState: unknown, formData: FormData) => Promise<unknown>;
  programs: Program[];
  hiddenFields?: Record<string, string>;
  initial?: {
    title: string;
    slug: string;
    description: string;
    location: string;
    startDate: string;
    endDate: string;
    coverImage: string;
    outcomes: string;
    programId: string;
    gallery: string;
  };
};

export function ProjectForm({ action, programs, hiddenFields, initial }: ProjectFormProps) {
  const [state, formAction] = useActionState(action, undefined);
  const errors =
    state && typeof state === "object" && "error" in state
      ? (state as { error: Record<string, string[] | undefined> }).error
      : undefined;

  return (
    <form action={formAction} className="mt-6 max-w-2xl space-y-4">
      {hiddenFields &&
        Object.entries(hiddenFields).map(([name, value]) => (
          <input key={name} type="hidden" name={name} value={value} />
        ))}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-slate-700">Title *</label>
        <input
          id="title"
          name="title"
          required
          defaultValue={initial?.title}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
        />
        {errors?.title && <p className="mt-1 text-sm text-red-600">{errors.title[0]}</p>}
      </div>
      <div>
        <label htmlFor="slug" className="block text-sm font-medium text-slate-700">Slug (optional, auto-generated from title)</label>
        <input
          id="slug"
          name="slug"
          defaultValue={initial?.slug}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-slate-700">Description *</label>
        <textarea
          id="description"
          name="description"
          required
          rows={5}
          defaultValue={initial?.description}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
        />
        {errors?.description && <p className="mt-1 text-sm text-red-600">{errors.description[0]}</p>}
      </div>
      <div>
        <label htmlFor="location" className="block text-sm font-medium text-slate-700">Location</label>
        <input
          id="location"
          name="location"
          defaultValue={initial?.location}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-slate-700">Start date</label>
          <input
            id="startDate"
            name="startDate"
            type="date"
            defaultValue={initial?.startDate}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-slate-700">End date</label>
          <input
            id="endDate"
            name="endDate"
            type="date"
            defaultValue={initial?.endDate}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </div>
      </div>
      <div>
        <label htmlFor="coverImage" className="block text-sm font-medium text-slate-700">Cover image URL</label>
        <input
          id="coverImage"
          name="coverImage"
          type="url"
          defaultValue={initial?.coverImage}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
        />
      </div>
      <div>
        <label htmlFor="outcomes" className="block text-sm font-medium text-slate-700">Outcomes</label>
        <textarea
          id="outcomes"
          name="outcomes"
          rows={3}
          defaultValue={initial?.outcomes}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
        />
      </div>
      <div>
        <label htmlFor="programId" className="block text-sm font-medium text-slate-700">Program</label>
        <select
          id="programId"
          name="programId"
          defaultValue={initial?.programId}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
        >
          <option value="">— None —</option>
          {programs.map((p) => (
            <option key={p.id} value={p.id}>{p.title}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="gallery" className="block text-sm font-medium text-slate-700">Gallery image URLs (one per line)</label>
        <textarea
          id="gallery"
          name="gallery"
          rows={4}
          defaultValue={initial?.gallery}
          placeholder="https://..."
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
        />
      </div>
      <div className="flex gap-4">
        <button
          type="submit"
          className="rounded-lg bg-[var(--logo-green)] hover:bg-[var(--logo-green-dark)] px-4 py-2 font-medium text-white"
        >
          {initial ? "Update" : "Create"} Project
        </button>
        <a
          href="/admin/projects"
          className="rounded-lg border border-slate-300 px-4 py-2 font-medium text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </a>
      </div>
    </form>
  );
}

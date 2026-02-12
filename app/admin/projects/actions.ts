"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { slugify } from "@/lib/utils";
import { projectSchema } from "@/lib/validations/project";

export async function createProject(prevState: unknown, formData: FormData) {
  await requireAdmin();
  const raw = {
    title: formData.get("title"),
    slug: formData.get("slug") || undefined,
    description: formData.get("description"),
    location: formData.get("location") || undefined,
    startDate: formData.get("startDate") || undefined,
    endDate: formData.get("endDate") || undefined,
    coverImage: formData.get("coverImage") || undefined,
    outcomes: formData.get("outcomes") || undefined,
    programId: formData.get("programId") || undefined,
  };
  const parsed = projectSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }
  const data = parsed.data;
  const slug = data.slug?.trim() || slugify(data.title);
  const existing = await prisma.project.findUnique({ where: { slug } });
  let finalSlug = slug;
  if (existing) {
    let i = 1;
    while (await prisma.project.findUnique({ where: { slug: `${slug}-${i}` } })) i++;
    finalSlug = `${slug}-${i}`;
  }
  const galleryRaw = formData.get("gallery");
  const gallery = Array.isArray(galleryRaw)
    ? galleryRaw.filter((u): u is string => typeof u === "string" && u.startsWith("http"))
    : typeof galleryRaw === "string" && galleryRaw
    ? galleryRaw.split("\n").map((s) => s.trim()).filter((s) => s.startsWith("http"))
    : [];
  await prisma.project.create({
    data: {
      title: data.title,
      slug: finalSlug,
      description: data.description,
      location: data.location || null,
      startDate: data.startDate ? new Date(data.startDate) : null,
      endDate: data.endDate ? new Date(data.endDate) : null,
      coverImage: data.coverImage || null,
      outcomes: data.outcomes || "",
      programId: data.programId || null,
      gallery,
    },
  });
  revalidatePath("/projects");
  revalidatePath("/");
  redirect("/admin/projects");
}

export async function updateProject(id: string, prevState: unknown, formData: FormData) {
  await requireAdmin();
  const raw = {
    title: formData.get("title"),
    slug: formData.get("slug") || undefined,
    description: formData.get("description"),
    location: formData.get("location") || undefined,
    startDate: formData.get("startDate") || undefined,
    endDate: formData.get("endDate") || undefined,
    coverImage: formData.get("coverImage") || undefined,
    outcomes: formData.get("outcomes") || undefined,
    programId: formData.get("programId") || undefined,
  };
  const parsed = projectSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }
  const data = parsed.data;
  const slugBase = (data.slug?.trim() || slugify(data.title)).toLowerCase();
  const galleryRaw = formData.get("gallery");
  const gallery = Array.isArray(galleryRaw)
    ? galleryRaw.filter((u): u is string => typeof u === "string" && u.startsWith("http"))
    : typeof galleryRaw === "string" && galleryRaw
    ? galleryRaw.split("\n").map((s) => s.trim()).filter((s) => s.startsWith("http"))
    : [];
  let finalSlug = slugBase;
  const existingBySlug = await prisma.project.findFirst({ where: { slug: slugBase } });
  if (existingBySlug && existingBySlug.id !== id) {
    let i = 1;
    finalSlug = `${slugBase}-${i}`;
    while (await prisma.project.findFirst({ where: { slug: finalSlug } })) {
      i++;
      finalSlug = `${slugBase}-${i}`;
    }
  }
  await prisma.project.update({
    where: { id },
    data: {
      title: data.title,
      slug: finalSlug,
      description: data.description,
      location: data.location || null,
      startDate: data.startDate ? new Date(data.startDate) : null,
      endDate: data.endDate ? new Date(data.endDate) : null,
      coverImage: data.coverImage || null,
      outcomes: data.outcomes || "",
      programId: data.programId || null,
      gallery,
    },
  });
  revalidatePath("/projects");
  revalidatePath(`/projects/${finalSlug}`);
  revalidatePath("/");
  redirect("/admin/projects");
}

export async function deleteProject(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;
  if (!id) redirect("/admin/projects");
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) redirect("/admin/projects");
  await prisma.project.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
  revalidatePath("/projects");
  revalidatePath("/");
  redirect("/admin/projects");
}

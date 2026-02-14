"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function createTeamMember(prevState: unknown, formData?: FormData) {
  const fd = (typeof formData?.get === "function" ? formData : prevState) as FormData;
  if (!fd?.get) {
    return { error: { _form: ["Invalid form data."] } };
  }
  await requireAdmin();
  const name = (fd.get("name") as string)?.trim();
  const role = (fd.get("role") as string)?.trim();
  const bio = (fd.get("bio") as string)?.trim() || null;
  const image = (fd.get("image") as string)?.trim() || null;
  const orderRaw = fd.get("order");
  const order = orderRaw != null ? parseInt(String(orderRaw), 10) : 0;
  const linkedinUrl = (fd.get("linkedinUrl") as string)?.trim() || null;
  const twitterUrl = (fd.get("twitterUrl") as string)?.trim() || null;
  const websiteUrl = (fd.get("websiteUrl") as string)?.trim() || null;

  if (!name || !role) {
    return { error: { _form: ["Name and role are required."] } };
  }

  await prisma.teamMember.create({
    data: { name, role, bio, image, order: Number.isNaN(order) ? 0 : order, linkedinUrl, twitterUrl, websiteUrl },
  });
  revalidatePath("/our-team");
  revalidatePath("/admin/team");
  redirect("/admin/team");
}

export async function updateTeamMember(
  id: string,
  prevState: unknown,
  formData: FormData
) {
  await requireAdmin();
  const name = (formData.get("name") as string)?.trim();
  const role = (formData.get("role") as string)?.trim();
  const bio = (formData.get("bio") as string)?.trim() || null;
  const image = (formData.get("image") as string)?.trim() || null;
  const orderRaw = formData.get("order");
  const order = orderRaw != null ? parseInt(String(orderRaw), 10) : 0;
  const linkedinUrl = (formData.get("linkedinUrl") as string)?.trim() || null;
  const twitterUrl = (formData.get("twitterUrl") as string)?.trim() || null;
  const websiteUrl = (formData.get("websiteUrl") as string)?.trim() || null;

  if (!name || !role) {
    return { error: { _form: ["Name and role are required."] } };
  }

  await prisma.teamMember.update({
    where: { id },
    data: { name, role, bio, image, order: Number.isNaN(order) ? 0 : order, linkedinUrl, twitterUrl, websiteUrl },
  });
  revalidatePath("/our-team");
  revalidatePath("/admin/team");
  redirect("/admin/team");
}

/** Form action for edit form: reads id from formData so it can be passed as a server action reference. */
export async function updateTeamMemberForm(formData: FormData) {
  const id = formData.get("id") as string;
  if (!id) return { error: { _form: ["Missing id."] } };
  return updateTeamMember(id, undefined, formData);
}

export async function deleteTeamMember(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;
  if (!id) return;
  await prisma.teamMember.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
  revalidatePath("/our-team");
  revalidatePath("/admin/team");
  redirect("/admin/team");
}

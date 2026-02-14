"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";

export async function createPartner(prevState: unknown, formData: FormData) {
  await requireAdmin();

  // If used directly in form action without useActionState, formData is the first arg
  const fd = (typeof formData?.get === "function" ? formData : prevState) as FormData;

  const name = (fd.get("name") as string)?.trim();
  const logo = (fd.get("logo") as string)?.trim() || null;
  const website = (fd.get("website") as string)?.trim() || null;
  const order = parseInt((fd.get("order") as string) || "0");

  if (!name) {
    return { error: { name: ["Name is required"] } };
  }

  if (!logo) {
    return { error: { logo: ["Logo image is required"] } };
  }

  await prisma.partner.create({
    data: {
      name,
      logo,
      website,
      order,
    },
  });

  revalidatePath("/admin/partners");
  revalidatePath("/"); // Update home page
  redirect("/admin/partners");
}

export async function updatePartner(id: string, prevState: unknown, formData: FormData) {
  await requireAdmin();
  
  const fd = (typeof formData?.get === "function" ? formData : prevState) as FormData;

  const name = (fd.get("name") as string)?.trim();
  const logo = (fd.get("logo") as string)?.trim() || null;
  const website = (fd.get("website") as string)?.trim() || null;
  const order = parseInt((fd.get("order") as string) || "0");

  if (!name) {
    return { error: { name: ["Name is required"] } };
  }

  await prisma.partner.update({
    where: { id },
    data: {
      name,
      logo: logo || undefined, // Only update if provided
      website,
      order,
    },
  });

  revalidatePath("/admin/partners");
  revalidatePath("/");
  redirect("/admin/partners");
}

export async function updatePartnerForm(formData: FormData) {
  const id = formData.get("id") as string;
  if (!id) throw new Error("Partner ID is required");
  return updatePartner(id, null, formData) as unknown as Promise<void>;
}

export async function deletePartner(id: string) {
  await requireAdmin();

  await prisma.partner.update({
    where: { id },
    data: { deletedAt: new Date() },
  });

  revalidatePath("/admin/partners");
  revalidatePath("/");
}

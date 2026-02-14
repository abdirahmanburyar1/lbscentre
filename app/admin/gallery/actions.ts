"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";

export async function createGalleryEvent(prevState: unknown, formData: FormData) {
  await requireAdmin();

  // If used directly in form action without useActionState, formData is the first arg
  const fd = (typeof formData?.get === "function" ? formData : prevState) as FormData;

  const title = (fd.get("title") as string)?.trim();
  const description = (fd.get("description") as string)?.trim() || null;
  const dateStr = (fd.get("date") as string)?.trim();
  
  // Parse newly added images (array of URLs stringified)
  const newImagesJson = (fd.get("newImages") as string)?.trim();
  let newImageUrls: string[] = [];
  if (newImagesJson) {
      try {
          const parsed = JSON.parse(newImagesJson);
          if (Array.isArray(parsed)) newImageUrls = parsed;
      } catch (e) {
          console.error("Failed to parse newImages JSON", e);
      }
  }

  if (!title) {
    return { error: { title: ["Title is required"] } };
  }

  const date = dateStr ? new Date(dateStr) : new Date();

  // Determine initial cover image (first image uploaded)
  const coverImage = newImageUrls.length > 0 ? newImageUrls[0] : null;

  // Create event and associated images in one transaction (implicitly via Prisma nested write)
  await prisma.galleryEvent.create({
    data: {
      title,
      description,
      date,
      coverImage,
      images: {
        create: newImageUrls.map((url) => ({
          imageUrl: url,
        })),
      },
    },
  });

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  redirect("/admin/gallery");
}

export async function updateGalleryEvent(prevState: unknown, formData: FormData) {
  await requireAdmin();
  
  const fd = (typeof formData?.get === "function" ? formData : prevState) as FormData;
  const id = fd.get("id") as string;

  if (!id) {
      // Should not happen if form is correct
      throw new Error("Event ID is missing");
  }

  const title = (fd.get("title") as string)?.trim();
  const description = (fd.get("description") as string)?.trim() || null;
  const dateStr = (fd.get("date") as string)?.trim();

  // Parse new images to add
  const newImagesJson = (fd.get("newImages") as string)?.trim();
  let newImageUrls: string[] = [];
  if (newImagesJson) {
      try {
          const parsed = JSON.parse(newImagesJson);
          if (Array.isArray(parsed)) newImageUrls = parsed;
      } catch (e) { console.error("Failed to parse newImages", e); }
  }
  
  // Parse IDs of images to remove
  const removedImageIdsJson = (fd.get("removedImageIds") as string)?.trim();
  let removedImageIds: string[] = [];
  if (removedImageIdsJson) {
      try {
          const parsed = JSON.parse(removedImageIdsJson);
          if (Array.isArray(parsed)) removedImageIds = parsed;
      } catch (e) { console.error("Failed to parse removedImageIds", e); }
  }


  if (!title) {
    return { error: { title: ["Title is required"] } };
  }

  const date = dateStr ? new Date(dateStr) : undefined;

  // Update event details
  await prisma.galleryEvent.update({
    where: { id },
    data: {
      title,
      description,
      date,
    },
  });

  // Add new images
  if (newImageUrls.length > 0) {
      await prisma.galleryImage.createMany({
          data: newImageUrls.map(url => ({
              imageUrl: url,
              eventId: id,
          }))
      });
  }

  // Delete removed images (hard delete for simplicity here, or soft delete if prefered)
  // Let's hard delete the relation or the record itself if it's just a gallery image
  if (removedImageIds.length > 0) {
      await prisma.galleryImage.deleteMany({
          where: {
              id: { in: removedImageIds },
              eventId: id // Ensure scoped to this event for safety
          }
      });
  }
  
  // Update cover image logic:
  // If the current cover image was deleted, or if there was no cover image, pick a new one from remaining images.
  const event = await prisma.galleryEvent.findUnique({
      where: { id },
      include: { images: true }
  });

  if (event) {
      let currentCover = event.coverImage;
      const remainingImages = event.images;

      // Check if current cover is still valid (exists in remaining images)
      const coverExists = remainingImages.some(img => img.imageUrl === currentCover);

      if (!currentCover || !coverExists) {
          // Set new cover to first available image, or null if no images left
          const newCover = remainingImages.length > 0 ? remainingImages[0].imageUrl : null;
          if (newCover !== currentCover) {
               await prisma.galleryEvent.update({
                  where: { id },
                  data: { coverImage: newCover }
              });
          }
      }
  }


  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  redirect("/admin/gallery");
}

export async function deleteGalleryEvent(id: string) {
  await requireAdmin();

  // Soft delete event
  await prisma.galleryEvent.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
  
  // Soft delete associated images
  // (Assuming we want to hide them too)
  await prisma.galleryImage.updateMany({
      where: { eventId: id },
      data: { deletedAt: new Date() }
  });

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}

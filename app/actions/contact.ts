"use server";

import { prisma } from "@/lib/db";
import { contactFormSchema } from "@/lib/validations/contact";

export type ContactState = {
  success?: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

export async function submitContact(prevState: ContactState, formData: FormData): Promise<ContactState> {
  const parsed = contactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return {
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  try {
    await prisma.contactMessage.create({
      data: parsed.data,
    });
    return { success: true };
  } catch (e) {
    console.error(e);
    return { error: "Failed to send message. Please try again." };
  }
}

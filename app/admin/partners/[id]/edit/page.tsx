import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { PartnerForm } from "../../PartnerForm";
import { updatePartnerForm } from "../../actions";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditPartnerPage({ params }: Props) {
  await requireAdmin();
  const { id } = await params;

  const partner = await prisma.partner.findUnique({
    where: { id },
  });

  if (!partner) {
    notFound();
  }

  return (
    <div className="max-w-2xl">
      <h1 className="mb-6 text-3xl font-bold">Edit Partner</h1>
      <PartnerForm 
        action={updatePartnerForm} 
        initialData={{
          ...partner,
          website: partner.website || null, // Ensure explicit null for serialization if needed, though prisma handles it
        }}
        hiddenFields={{ id }}
      />
    </div>
  );
}

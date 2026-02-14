import { requireAdmin } from "@/lib/auth";
import { PartnerForm } from "../PartnerForm";
import { createPartner } from "../actions";

export default async function NewPartnerPage() {
  await requireAdmin();

  return (
    <div className="max-w-2xl">
      <h1 className="mb-6 text-3xl font-bold">Add New Partner</h1>
      <PartnerForm action={createPartner as unknown as (formData: FormData) => Promise<void>} />
    </div>
  );
}

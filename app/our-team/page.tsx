import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { getTeamMembers } from "@/lib/queries/team";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Team",
  description: "Meet the people behind LBS Centre for Social & Agricultural Development.",
};

export default async function OurTeamPage() {
  const members = await getTeamMembers();

  return (
    <>
      <PageHero
        title="Our Team"
        description="The people driving our mission for social and agricultural development."
      />

      <Section>
        {members.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((member) => (
              <article
                key={member.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
              >
                <div className="relative aspect-[4/3] w-full bg-[var(--logo-brown-bg)]">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-4xl font-bold text-[var(--logo-brown)]/30">
                      {member.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h2 className="font-display text-xl font-semibold text-slate-900">
                    {member.name}
                  </h2>
                  <p className="mt-1 text-sm font-medium text-[var(--logo-green-dark)]">
                    {member.role}
                  </p>
                  {member.bio && (
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      {member.bio}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="py-12 text-center text-slate-500">
            Team members will appear here once added in the admin.
          </p>
        )}
      </Section>
    </>
  );
}

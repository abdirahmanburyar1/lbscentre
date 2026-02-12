import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { getTeamMembers } from "@/lib/queries/team";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

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

      <Section
        className="bg-[var(--logo-brown-bg)]/50"
        containerClassName="max-w-6xl"
      >
        <div className="mb-12 text-center sm:mb-16">
          <p className="mx-auto max-w-2xl text-lg text-stone-600">
            Meet the dedicated individuals who bring expertise, passion, and
            commitment to our work in communities across Somalia.
          </p>
        </div>

        {members.length > 0 ? (
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((member) => (
              <article
                key={member.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--logo-green)]/30 hover:shadow-lg"
              >
                <div className="flex flex-col items-center pt-8 pb-4 sm:pt-10 sm:pb-6">
                  <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-full border-4 border-white shadow-md ring-2 ring-[var(--logo-brown)]/10">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover transition duration-300 group-hover:scale-105"
                        sizes="128px"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[var(--logo-brown-bg)] to-[var(--logo-green)]/20">
                        <span className="font-display text-4xl font-bold text-[var(--logo-brown)]/50">
                          {member.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <h2 className="mt-4 font-display text-xl font-semibold text-stone-900">
                    {member.name}
                  </h2>
                  <span className="mt-1.5 inline-block rounded-full bg-[var(--logo-green)]/10 px-3 py-1 text-sm font-medium text-[var(--logo-green-dark)]">
                    {member.role}
                  </span>
                </div>
                {member.bio && (
                  <div className="flex-1 border-t border-stone-100 px-6 pb-6 pt-4">
                    <p className="text-sm leading-relaxed text-stone-600 line-clamp-4">
                      {member.bio}
                    </p>
                  </div>
                )}
              </article>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-stone-300 bg-white/60 px-6 py-16 text-center sm:py-24">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[var(--logo-brown-bg)]">
              <svg
                className="h-10 w-10 text-[var(--logo-brown)]/40"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                />
              </svg>
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold text-stone-700">
              Team profiles coming soon
            </h3>
            <p className="mt-2 max-w-sm text-sm text-stone-500">
              Team members will appear here once they are added by the
              administrator.
            </p>
          </div>
        )}
      </Section>
    </>
  );
}

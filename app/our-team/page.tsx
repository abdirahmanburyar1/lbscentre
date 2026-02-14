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
        className="bg-stone-50 py-8 sm:py-12 md:py-16 lg:py-20"
        containerClassName="max-w-6xl"
      >
        {members.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {members.map((member) => (
              <article
                key={member.id}
                className="group relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-stone-200 shadow-md transition-all duration-300 hover:shadow-xl"
              >
                {/* Full-card Image */}
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-stone-300 to-stone-400">
                    <span className="font-display text-6xl font-bold text-white/20">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                )}

                {/* Text Overlay at Bottom */}
                <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/50 to-transparent px-5 pb-6 pt-20 transition-all duration-300">
                  <h2 className="font-display text-[9px] font-bold uppercase tracking-wider text-white sm:text-[10px]">
                    {member.name}
                  </h2>
                  <p className="mt-1 font-sans text-[10px] font-medium tracking-wide text-white/90 sm:text-xs">
                    {member.role}
                  </p>
                  
                  {/* Bio - optional slide-up on hover if desired, or kept hidden/minimal per ref image */}
                  {/* To match reference strict style (just name/role/icons), we keep it clean. 
                      If bio is needed, we could reveal it: */}
                  {member.bio && (
                    <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 group-hover:grid-rows-[1fr]">
                      <p className="overflow-hidden text-xs leading-relaxed text-white/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100 mt-3">
                        {member.bio}
                      </p>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-stone-200 bg-white px-8 py-20 text-center">
            <h3 className="font-display text-xl font-semibold text-stone-800">
              Team profiles coming soon
            </h3>
            <p className="mt-2 text-sm text-stone-500">
              Team members will appear here once added.
            </p>
          </div>
        )}
      </Section>
    </>
  );
}

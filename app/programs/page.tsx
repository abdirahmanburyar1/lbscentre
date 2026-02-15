import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { PageHero } from "@/components/ui/PageHero";
import { getAllPrograms } from "@/lib/queries/programs";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Programs",
  description: ""
};

export default async function ProgramsPage() {
  const programs = await getAllPrograms();

  return (
    <>
      <PageHero
        title="Our Programs"
        description="Integrated approaches to food security, agriculture, resilience, and empowerment."
      />

      <Section>
        {programs.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {programs.map((program) => (
              <Card
                key={program.id}
                title={program.title}
                description={program.description}
                href={`/programs/${program.slug}`}
                image={program.image}
                imageAlt={program.title}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-slate-500 py-12">
            Programs will be listed here once added by the admin.
          </p>
        )}
      </Section>
    </>
  );
}

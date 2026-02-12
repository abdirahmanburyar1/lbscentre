import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { getAllPrograms } from "@/lib/queries/programs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Our program areas: Food Security & Nutrition, Sustainable Agriculture, Livestock & Agribusiness, Climate Change Resilience, WASH, Gender & Youth Empowerment.",
};

export default async function ProgramsPage() {
  const programs = await getAllPrograms();

  return (
    <>
      <section className="bg-earth-800 text-white py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold">Our Programs</h1>
          <p className="mt-4 text-earth-200 max-w-2xl">
            Integrated approaches to food security, agriculture, resilience, and empowerment.
          </p>
        </div>
      </section>

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
          <p className="text-center text-earth-600 py-12">
            Programs will be listed here once added by the admin.
          </p>
        )}
      </Section>
    </>
  );
}

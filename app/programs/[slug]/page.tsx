import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProgramBySlug } from "@/lib/queries/programs";
import { Section } from "@/components/ui/Section";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);
  if (!program) return { title: "Program" };
  return {
    title: program.title,
    description: program.description.slice(0, 160),
    openGraph: { title: program.title, description: program.description.slice(0, 160) },
  };
}

export default async function ProgramSlugPage({ params }: Props) {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);
  if (!program) notFound();

  return (
    <>
      <section className="bg-earth-800 text-white py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold">{program.title}</h1>
          <p className="mt-4 text-earth-200 max-w-2xl">
            {program.description.slice(0, 200)}
            {program.description.length > 200 ? "…" : ""}
          </p>
        </div>
      </section>

      {program.image && (
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 -mt-8">
          <div className="relative aspect-[21/9] overflow-hidden rounded-xl">
            <Image
              src={program.image}
              alt={program.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 1152px"
            />
          </div>
        </div>
      )}

      <Section>
        <div className="prose prose-earth max-w-none">
          <p className="text-earth-600 text-lg leading-relaxed whitespace-pre-line">
            {program.description}
          </p>
        </div>

        {program.projects.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-2xl font-semibold text-earth-800 mb-6">
              Related Projects
            </h2>
            <ul className="space-y-3">
              {program.projects.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/projects/${p.slug}`}
                    className="text-accent hover:underline font-medium"
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Section>
    </>
  );
}

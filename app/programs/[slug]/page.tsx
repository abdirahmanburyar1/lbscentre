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
      <section className="bg-[var(--logo-brown)] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {program.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-stone-200">
            {program.description.slice(0, 200)}
            {program.description.length > 200 ? "…" : ""}
          </p>
        </div>
      </section>

      {program.image && (
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 -mt-8">
          <div className="relative aspect-[21/9] overflow-hidden rounded-2xl">
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
        <p className="text-slate-600 text-lg leading-relaxed whitespace-pre-line max-w-3xl">
          {program.description}
        </p>

        {program.projects.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-2xl font-semibold text-slate-900 mb-6">
              Related Projects
            </h2>
            <ul className="space-y-3">
              {program.projects.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/projects/${p.slug}`}
                    className="text-[var(--logo-green-dark)] font-medium hover:text-[var(--logo-green-darker)] hover:underline"
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

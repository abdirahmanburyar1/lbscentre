import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProjectBySlug } from "@/lib/queries/projects";
import { Section } from "@/components/ui/Section";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project" };
  return {
    title: project.title,
    description: project.description.slice(0, 160),
    openGraph: { title: project.title, description: project.description.slice(0, 160) },
  };
}

export default async function ProjectSlugPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const gallery = project.gallery && project.gallery.length > 0 ? project.gallery : [];

  return (
    <>
      <section className="bg-earth-800 text-white py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {project.program && (
            <Link
              href={`/programs/${project.program.slug}`}
              className="text-earth-300 hover:text-white text-sm font-medium"
            >
              {project.program.title}
            </Link>
          )}
          <h1 className="font-display text-4xl font-bold mt-2">{project.title}</h1>
          <div className="mt-4 flex flex-wrap gap-4 text-earth-200 text-sm">
            {project.location && <span>Location: {project.location}</span>}
            {project.startDate && (
              <span>Start: {formatDate(project.startDate)}</span>
            )}
            {project.endDate && (
              <span>End: {formatDate(project.endDate)}</span>
            )}
          </div>
        </div>
      </section>

      {project.coverImage && (
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 -mt-8">
          <div className="relative aspect-[21/9] overflow-hidden rounded-xl">
            <Image
              src={project.coverImage}
              alt={project.title}
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
          <div className="text-earth-600 text-lg leading-relaxed whitespace-pre-line">
            {project.description}
          </div>
        </div>

        {project.outcomes && (
          <div className="mt-12">
            <h2 className="font-display text-2xl font-semibold text-earth-800 mb-4">
              Outcomes
            </h2>
            <p className="text-earth-600 whitespace-pre-line">{project.outcomes}</p>
          </div>
        )}

        {gallery.length > 0 && (
          <div className="mt-12">
            <h2 className="font-display text-2xl font-semibold text-earth-800 mb-6">
              Gallery
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {gallery.map((url, i) => (
                <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  <Image
                    src={url}
                    alt={`${project.title} gallery ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </Section>
    </>
  );
}

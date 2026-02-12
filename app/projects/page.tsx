import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Pagination } from "@/components/ui/Pagination";
import { PageHero } from "@/components/ui/PageHero";
import { getProjectsPaginated } from "@/lib/queries/projects";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ page?: string; search?: string }>;
};

export const metadata: Metadata = {
  title: "Projects",
  description: "Our projects in food security, agriculture, WASH, and community development.",
};

export default async function ProjectsPage({ searchParams }: Props) {
  const { page = "1", search } = await searchParams;
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const data = await getProjectsPaginated(pageNum, search ?? undefined);

  return (
    <>
      <PageHero
        title="Our Projects"
        description="Explore our work on the ground."
      />

      <Section>
        {data.items.length > 0 ? (
          <>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {data.items.map((project) => (
                <Card
                  key={project.id}
                  title={project.title}
                  description={project.description.slice(0, 160) + (project.description.length > 160 ? "…" : "")}
                  href={`/projects/${project.slug}`}
                  image={project.coverImage}
                  imageAlt={project.title}
                />
              ))}
            </div>
            <Pagination
              basePath="/projects"
              page={data.page}
              totalPages={data.totalPages}
              searchParams={search ? { search } : undefined}
            />
          </>
        ) : (
          <p className="text-center text-slate-500 py-12">No projects found.</p>
        )}
      </Section>
    </>
  );
}

import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Pagination } from "@/components/ui/Pagination";
import { PageHero } from "@/components/ui/PageHero";
import { getPublicationsPaginated } from "@/lib/queries/publications";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

type Props = { searchParams: Promise<{ page?: string }> };

export const metadata: Metadata = {
  title: "Publications & Research",
  description: "Reports, research, and publications from LBS Centre.",
};

export default async function PublicationsPage({ searchParams }: Props) {
  const { page = "1" } = await searchParams;
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const data = await getPublicationsPaginated(pageNum);

  return (
    <>
      <PageHero
        title="Publications & Research"
        description="Reports, studies, and research from our work."
      />

      <Section>
        {data.items.length > 0 ? (
          <>
            <div className="grid gap-8 md:grid-cols-2">
              {data.items.map((pub) => (
                <article
                  key={pub.id}
                  className="flex overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
                >
                  {pub.coverImage && (
                    <div className="relative h-48 w-40 shrink-0 bg-slate-100">
                      <Image
                        src={pub.coverImage}
                        alt={pub.title}
                        fill
                        className="object-cover"
                        sizes="160px"
                      />
                    </div>
                  )}
                  <div className="p-6 flex-1">
                    <p className="text-sm text-slate-500">{formatDate(pub.publishedAt)}</p>
                    <h2 className="font-display text-xl font-semibold text-slate-900 mt-1">
                      {pub.title}
                    </h2>
                    <p className="mt-2 text-slate-600 line-clamp-3">{pub.description}</p>
                    <a
                      href={pub.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block text-[var(--logo-green-dark)] font-medium hover:text-[var(--logo-green-darker)] hover:underline"
                    >
                      Download PDF →
                    </a>
                  </div>
                </article>
              ))}
            </div>
            <Pagination basePath="/publications" page={data.page} totalPages={data.totalPages} />
          </>
        ) : (
          <p className="text-center text-slate-500 py-12">No publications yet.</p>
        )}
      </Section>
    </>
  );
}

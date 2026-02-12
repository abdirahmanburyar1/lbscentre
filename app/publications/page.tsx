import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Pagination } from "@/components/ui/Pagination";
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
      <section className="bg-earth-800 text-white py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold">Publications & Research</h1>
          <p className="mt-4 text-earth-200 max-w-2xl">
            Reports, studies, and research from our work.
          </p>
        </div>
      </section>

      <Section>
        {data.items.length > 0 ? (
          <>
            <div className="grid gap-8 md:grid-cols-2">
              {data.items.map((pub) => (
                <article
                  key={pub.id}
                  className="flex overflow-hidden rounded-xl border border-earth-200 bg-white shadow-sm"
                >
                  {pub.coverImage && (
                    <div className="relative h-48 w-40 shrink-0 bg-earth-100">
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
                    <p className="text-sm text-earth-500">{formatDate(pub.publishedAt)}</p>
                    <h2 className="font-display text-xl font-semibold text-earth-800 mt-1">
                      {pub.title}
                    </h2>
                    <p className="mt-2 text-earth-600 line-clamp-3">{pub.description}</p>
                    <a
                      href={pub.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block text-accent font-medium hover:underline"
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
          <p className="text-center text-earth-600 py-12">No publications yet.</p>
        )}
      </Section>
    </>
  );
}

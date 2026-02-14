import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Pagination } from "@/components/ui/Pagination";
import { PageHero } from "@/components/ui/PageHero";
import { getGalleryEventsPaginated } from "@/lib/queries/gallery";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ page?: string }> };

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos from our projects and field work.",
};

export default async function GalleryPage({ searchParams }: Props) {
  const { page = "1" } = await searchParams;
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const data = await getGalleryEventsPaginated(pageNum);

  return (
    <>
      <PageHero
        title="Gallery"
        description="Glimpses from our projects and communities."
      />

      <Section>
        {data.items.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.items.map((event) => (
                <Link key={event.id} href={`/gallery/${event.id}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100 mb-4">
                    {event.coverImage ? (
                       <Image
                        src={event.coverImage}
                        alt={event.title}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-slate-200 text-slate-400">
                            No Image
                        </div>
                    )}
                     <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-[var(--logo-green)] transition-colors">
                    {event.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                      {new Date(event.date).toLocaleDateString("en-GB", { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </Link>
              ))}
            </div>
            <Pagination basePath="/gallery" page={data.page} totalPages={data.totalPages} />
          </>
        ) : (
          <p className="text-center text-slate-500 py-12">No gallery events yet.</p>
        )}
      </Section>
    </>
  );
}

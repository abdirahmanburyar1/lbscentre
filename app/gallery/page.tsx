import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Pagination } from "@/components/ui/Pagination";
import { PageHero } from "@/components/ui/PageHero";
import { getGalleryPaginated } from "@/lib/queries/gallery";
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
  const data = await getGalleryPaginated(pageNum);

  return (
    <>
      <PageHero
        title="Gallery"
        description="Glimpses from our projects and communities."
      />

      <Section>
        {data.items.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {data.items.map((img) => (
                <figure key={img.id} className="group">
                  <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-100">
                    <Image
                      src={img.imageUrl}
                      alt={img.caption ?? "Gallery image"}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      loading="lazy"
                    />
                  </div>
                  {(img.caption || img.project) && (
                    <figcaption className="mt-2 text-sm text-slate-600">
                      {img.caption}
                      {img.project && (
                        <span className="block text-slate-500">
                          Project: {img.project.title}
                        </span>
                      )}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
            <Pagination basePath="/gallery" page={data.page} totalPages={data.totalPages} />
          </>
        ) : (
          <p className="text-center text-slate-500 py-12">No images in the gallery yet.</p>
        )}
      </Section>
    </>
  );
}

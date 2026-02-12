import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Pagination } from "@/components/ui/Pagination";
import { getGalleryPaginated } from "@/lib/queries/gallery";
import type { Metadata } from "next";

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
      <section className="bg-earth-800 text-white py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold">Gallery</h1>
          <p className="mt-4 text-earth-200 max-w-2xl">
            Glimpses from our projects and communities.
          </p>
        </div>
      </section>

      <Section>
        {data.items.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {data.items.map((img) => (
                <figure key={img.id} className="group">
                  <div className="relative aspect-square overflow-hidden rounded-lg bg-earth-100">
                    <Image
                      src={img.imageUrl}
                      alt={img.caption ?? "Gallery image"}
                      fill
                      className="object-cover transition group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      loading="lazy"
                    />
                  </div>
                  {(img.caption || img.project) && (
                    <figcaption className="mt-2 text-sm text-earth-600">
                      {img.caption}
                      {img.project && (
                        <span className="block text-earth-500">
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
          <p className="text-center text-earth-600 py-12">No images in the gallery yet.</p>
        )}
      </Section>
    </>
  );
}

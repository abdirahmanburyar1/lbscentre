import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { getGalleryEventBySlug } from "@/lib/queries/gallery";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { 
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

type Props = {
  params: Promise<{ id: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const event = await getGalleryEventBySlug(id);

  if (!event) {
    return {
      title: "Gallery Event Not Found",
    };
  }

  return {
    title: `${event.title} - Gallery`,
    description: event.description || `Photos from ${event.title}`,
  };
}

export default async function GalleryEventPage({ params }: Props) {
  const { id } = await params;
  const event = await getGalleryEventBySlug(id);

  if (!event) {
    notFound();
  }

  return (
    <>
      <PageHero
        title={event.title}
        description={event.description || "Event Gallery"}
        parentLink={{ href: "/gallery", label: "Back to Gallery" }}
      />

      <Section>
        <div className="mb-8">
            <Link 
              href="/gallery"
              className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-[var(--logo-green)] transition-colors"
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to All Albums
            </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {event.images.map((image) => (
             <Dialog key={image.id}>
                <DialogTrigger asChild>
                    <div className="group relative aspect-square overflow-hidden rounded-xl bg-slate-100 cursor-zoom-in">
                      <Image
                        src={image.imageUrl}
                        alt={image.caption || `Image from ${event.title}`}
                        fill
                        className="object-cover transition duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                </DialogTrigger>
                <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 border-none bg-transparent shadow-none overflow-hidden flex items-center justify-center">
                    <DialogTitle asChild>
                        <VisuallyHidden>{image.caption || `Image from ${event.title}`}</VisuallyHidden>
                    </DialogTitle>
                    <div className="relative w-full h-full min-h-[50vh] min-w-[50vw]">
                         <Image
                            src={image.imageUrl}
                            alt={image.caption || `Image from ${event.title}`}
                            fill
                            className="object-contain"
                            priority
                          />
                    </div>
                </DialogContent>
             </Dialog>
          ))}
        </div>
        
        {event.images.length === 0 && (
            <p className="text-center text-slate-500 py-12">No images in this album yet.</p>
        )}
      </Section>
    </>
  );
}

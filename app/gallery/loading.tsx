import { Skeleton } from "@/components/ui/Skeleton";

export default function GalleryLoading() {
  return (
    <>
      <section className="border-b border-slate-200 bg-slate-50/50 px-4 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl text-center">
          <Skeleton className="mx-auto h-9 w-32 sm:h-10 md:h-11" />
          <Skeleton className="mx-auto mt-3 h-5 max-w-sm" />
        </div>
      </section>
      <section className="py-12 sm:py-16 md:py-24 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square w-full rounded-2xl" />
            ))}
          </div>
        </div>
      </section>
      <div className="flex justify-center gap-2 px-4 pb-12 sm:pb-16 md:pb-24 lg:pb-28">
        <Skeleton className="h-10 w-10 rounded-lg" />
        <Skeleton className="h-10 w-16 rounded-lg" />
        <Skeleton className="h-10 w-10 rounded-lg" />
      </div>
    </>
  );
}

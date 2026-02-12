import { Skeleton } from "@/components/ui/Skeleton";

export default function ContactLoading() {
  return (
    <>
      <section className="bg-slate-400 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <Skeleton className="h-10 w-48 bg-white/30 sm:h-12" />
          <Skeleton className="mt-4 h-5 max-w-2xl bg-white/30 sm:mt-5" />
        </div>
      </section>
      <section className="py-12 sm:py-16 md:py-24 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-4">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-10 w-full rounded-lg" />
              <Skeleton className="h-10 w-full rounded-lg" />
              <Skeleton className="h-32 w-full rounded-lg" />
              <Skeleton className="h-12 w-28 rounded-xl" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

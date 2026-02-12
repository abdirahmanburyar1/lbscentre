import { Skeleton, SkeletonSection } from "@/components/ui/Skeleton";

export default function ProjectsLoading() {
  return (
    <>
      {/* Page hero skeleton */}
      <section className="border-b border-slate-200 bg-slate-50/50 px-4 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl text-center">
          <Skeleton className="mx-auto h-9 w-56 sm:h-10 md:h-11" />
          <Skeleton className="mx-auto mt-3 h-5 max-w-md" />
        </div>
      </section>

      {/* Projects grid skeleton */}
      <SkeletonSection
        content="cards"
        cardCount={6}
        title={false}
        subtitle={false}
      />

      {/* Pagination skeleton */}
      <div className="flex justify-center gap-2 px-4 pb-12 sm:pb-16 md:pb-24 lg:pb-28">
        <Skeleton className="h-10 w-10 rounded-lg" />
        <Skeleton className="h-10 w-16 rounded-lg" />
        <Skeleton className="h-10 w-10 rounded-lg" />
      </div>
    </>
  );
}

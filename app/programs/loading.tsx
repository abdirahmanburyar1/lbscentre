import { Skeleton, SkeletonSection } from "@/components/ui/Skeleton";

export default function ProgramsLoading() {
  return (
    <>
      <section className="border-b border-slate-200 bg-slate-50/50 px-4 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl text-center">
          <Skeleton className="mx-auto h-9 w-48 sm:h-10 md:h-11" />
          <Skeleton className="mx-auto mt-3 h-5 max-w-lg" />
        </div>
      </section>
      <SkeletonSection
        content="cards"
        cardCount={6}
        title={false}
        subtitle={false}
      />
    </>
  );
}

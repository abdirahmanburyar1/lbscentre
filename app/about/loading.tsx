import { Skeleton, SkeletonSection } from "@/components/ui/Skeleton";

export default function AboutLoading() {
  return (
    <>
      <section className="border-b border-slate-200 bg-slate-50/50 px-4 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl text-center">
          <Skeleton className="mx-auto h-9 w-56 sm:h-10 md:h-11" />
          <Skeleton className="mx-auto mt-3 h-5 max-w-md" />
        </div>
      </section>
      {[1, 2, 3, 4].map((i) => (
        <SkeletonSection
          key={i}
          title
          subtitle={false}
          content="text"
          className={i % 2 === 0 ? "bg-white" : ""}
        />
      ))}
    </>
  );
}

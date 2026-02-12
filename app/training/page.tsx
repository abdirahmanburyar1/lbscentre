import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Pagination } from "@/components/ui/Pagination";
import { getTrainingsPaginated } from "@/lib/queries/training";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

type Props = { searchParams: Promise<{ page?: string }> };

export const metadata: Metadata = {
  title: "Training",
  description: "Capacity building and training programs by LBS Centre.",
};

export default async function TrainingPage({ searchParams }: Props) {
  const { page = "1" } = await searchParams;
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const data = await getTrainingsPaginated(pageNum);

  return (
    <>
      <section className="bg-earth-800 text-white py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold">Training</h1>
          <p className="mt-4 text-earth-200 max-w-2xl">
            Capacity building and skill development for communities and partners.
          </p>
        </div>
      </section>

      <Section>
        {data.items.length > 0 ? (
          <>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {data.items.map((training) => (
                <Card
                  key={training.id}
                  title={training.title}
                  description={training.description.slice(0, 160) + (training.description.length > 160 ? "…" : "")}
                  image={training.image}
                  imageAlt={training.title}
                >
                  <div className="mt-3 text-sm text-earth-500">
                    {formatDate(training.date)}
                    {training.location && ` · ${training.location}`}
                    {training.category && ` · ${training.category}`}
                  </div>
                </Card>
              ))}
            </div>
            <Pagination basePath="/training" page={data.page} totalPages={data.totalPages} />
          </>
        ) : (
          <p className="text-center text-earth-600 py-12">No training events yet.</p>
        )}
      </Section>
    </>
  );
}

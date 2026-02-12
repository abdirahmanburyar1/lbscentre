import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { ProjectForm } from "../../ProjectForm";
import { updateProject } from "../../actions";
import { getAllPrograms } from "@/lib/queries/programs";

type Props = { params: Promise<{ id: string }> };

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params;
  const [project, programs] = await Promise.all([
    prisma.project.findUnique({ where: { id } }),
    getAllPrograms(),
  ]);
  if (!project || project.deletedAt) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-slate-900">Edit Project</h1>
      <ProjectForm
        action={(s, fd) => updateProject(id, s, fd)}
        programs={programs}
        initial={{
          title: project.title,
          slug: project.slug,
          description: project.description,
          location: project.location ?? "",
          startDate: project.startDate ? project.startDate.toISOString().slice(0, 10) : "",
          endDate: project.endDate ? project.endDate.toISOString().slice(0, 10) : "",
          coverImage: project.coverImage ?? "",
          outcomes: project.outcomes ?? "",
          programId: project.programId ?? "",
          gallery: project.gallery?.join("\n") ?? "",
        }}
      />
    </div>
  );
}

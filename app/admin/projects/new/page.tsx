import { ProjectForm } from "../ProjectForm";
import { createProject } from "../actions";
import { getAllPrograms } from "@/lib/queries/programs";

export default async function NewProjectPage() {
  const programs = await getAllPrograms();
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-slate-900">Add Project</h1>
      <ProjectForm action={createProject} programs={programs} />
    </div>
  );
}

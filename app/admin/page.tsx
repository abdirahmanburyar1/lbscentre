import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function AdminDashboardPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const [projectsCount, programsCount, messagesCount, trainingsCount, publicationsCount] =
    await Promise.all([
      prisma.project.count({ where: { deletedAt: null } }),
      prisma.program.count({ where: { deletedAt: null } }),
      prisma.contactMessage.count({ where: { deletedAt: null } }),
      prisma.training.count({ where: { deletedAt: null } }),
      prisma.publication.count({ where: { deletedAt: null } }),
    ]);

  const cards = [
    { title: "Projects", count: projectsCount, href: "/admin/projects" },
    { title: "Programs", count: programsCount, href: "/admin/programs" },
    { title: "Trainings", count: trainingsCount, href: "/admin/trainings" },
    { title: "Publications", count: publicationsCount, href: "/admin/publications" },
    { title: "Gallery", count: await prisma.galleryImage.count({ where: { deletedAt: null } }), href: "/admin/gallery" },
    { title: "Messages", count: messagesCount, href: "/admin/messages" },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-slate-900">Dashboard</h1>
      <p className="mt-1 text-slate-600">Welcome, {session.email}</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md"
          >
            <h2 className="font-display text-lg font-semibold text-slate-900">{card.title}</h2>
            <p className="mt-2 text-3xl font-bold text-[var(--logo-green-dark)]">{card.count}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

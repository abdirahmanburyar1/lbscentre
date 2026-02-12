import Link from "next/link";
import Image from "next/image";
import { getSession } from "@/lib/auth";
import { logout } from "@/app/actions/auth";

export default async function AdminLayout({
  children,
}: { children: React.ReactNode }) {
  const session = await getSession();

  if (!session && !children) return null;

  return (
    <div className="min-h-screen bg-slate-50">
      {session ? (
        <>
          <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
              <Link href="/admin" className="flex items-center gap-2">
                <Image
                  src="/lbscentre.png"
                  alt="LBS Centre"
                  width={36}
                  height={36}
                  className="h-9 w-9 object-contain"
                />
                <span className="font-display text-lg font-bold text-slate-900">
                  LBS Admin
                </span>
              </Link>
              <nav className="flex items-center gap-1">
                <Link href="/admin" className="rounded-md px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-900">Dashboard</Link>
                <Link href="/admin/projects" className="rounded-md px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-900">Projects</Link>
                <Link href="/admin/programs" className="rounded-md px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-900">Programs</Link>
                <Link href="/admin/trainings" className="rounded-md px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-900">Training</Link>
                <Link href="/admin/publications" className="rounded-md px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-900">Publications</Link>
                <Link href="/admin/gallery" className="rounded-md px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-900">Gallery</Link>
                <Link href="/admin/messages" className="rounded-md px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-900">Messages</Link>
                <form action={logout} className="inline">
                  <button type="submit" className="rounded-md px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-900">
                    Logout
                  </button>
                </form>
              </nav>
            </div>
          </header>
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">{children}</div>
        </>
      ) : (
        <>{children}</>
      )}
    </div>
  );
}

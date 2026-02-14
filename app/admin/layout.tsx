import { getSession } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: { children: React.ReactNode }) {
  const session = await getSession();

  if (!session && !children) return null;

  return (
    <div className="flex min-h-screen bg-slate-50">
      {session ? (
        <>
          <AdminSidebar />
          <main className="flex-1 overflow-y-auto w-full">
             <div className="p-4 md:p-8 max-w-7xl mx-auto mt-16 md:mt-0">
               {children}
             </div>
          </main>
        </>
      ) : (
        <div className="flex-1">{children}</div>
      )}
    </div>
  );
}

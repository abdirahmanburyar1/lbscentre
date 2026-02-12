import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { LoginForm } from "./LoginForm";

export default async function AdminLoginPage() {
  const session = await getSession();
  if (session) redirect("/admin");

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="font-display text-2xl font-bold text-slate-900">Admin Login</h1>
        <p className="mt-2 text-slate-600">LBS Centre CMS</p>
        <LoginForm />
      </div>
    </div>
  );
}

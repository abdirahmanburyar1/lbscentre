import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-4">
      <h1 className="font-display text-4xl font-bold text-slate-900">404</h1>
      <p className="mt-2 text-slate-600">This page could not be found.</p>
      <Link
        href="/"
        className="mt-6 rounded-xl bg-[var(--logo-green)] px-5 py-2.5 font-semibold text-white hover:bg-[var(--logo-green-dark)]"
      >
        Go home
      </Link>
    </div>
  );
}

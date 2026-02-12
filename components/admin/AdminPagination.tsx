"use client";

import Link from "next/link";

type AdminPaginationProps = {
  basePath: string;
  page: number;
  totalPages: number;
  searchParams?: Record<string, string>;
};

export function AdminPagination({
  basePath,
  page,
  totalPages,
  searchParams = {},
}: AdminPaginationProps) {
  if (totalPages <= 1) return null;
  const params = new URLSearchParams(searchParams);
  const href = (p: number) => {
    const q = new URLSearchParams(params);
    q.set("page", String(p));
    const qs = q.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  return (
    <nav className="mt-4 flex items-center gap-2">
      {page > 1 ? (
        <Link
          href={href(page - 1)}
          className="rounded border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50"
        >
          Previous
        </Link>
      ) : null}
      <span className="px-3 text-sm text-slate-600">
        Page {page} of {totalPages}
      </span>
      {page < totalPages ? (
        <Link
          href={href(page + 1)}
          className="rounded border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50"
        >
          Next
        </Link>
      ) : null}
    </nav>
  );
}

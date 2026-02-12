"use client";

import Link from "next/link";

type PaginationProps = {
  basePath: string;
  page: number;
  totalPages: number;
  searchParams?: Record<string, string>;
};

export function Pagination({ basePath, page, totalPages, searchParams = {} }: PaginationProps) {
  if (totalPages <= 1) return null;

  const params = new URLSearchParams(searchParams);
  const prevPage = page > 1 ? page - 1 : null;
  const nextPage = page < totalPages ? page + 1 : null;

  const href = (p: number) => {
    const q = new URLSearchParams(params);
    q.set("page", String(p));
    const qs = q.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  const linkClass =
    "rounded-xl border-2 border-[var(--logo-green-dark)]/40 bg-white px-4 py-2.5 text-sm font-medium text-[var(--logo-green-dark)] shadow-sm transition hover:bg-[var(--logo-brown-bg)] hover:border-[var(--logo-green)]";
  const disabledClass =
    "cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-400";

  return (
    <nav
      className="flex items-center justify-center gap-3 py-10"
      aria-label="Pagination"
    >
      {prevPage ? (
        <Link href={href(prevPage)} className={linkClass}>
          Previous
        </Link>
      ) : (
        <span className={disabledClass}>Previous</span>
      )}
      <span className="px-4 py-2 text-sm text-slate-600">
        Page {page} of {totalPages}
      </span>
      {nextPage ? (
        <Link href={href(nextPage)} className={linkClass}>
          Next
        </Link>
      ) : (
        <span className={disabledClass}>Next</span>
      )}
    </nav>
  );
}

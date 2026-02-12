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

  return (
    <nav
      className="flex items-center justify-center gap-2 py-8"
      aria-label="Pagination"
    >
      {prevPage ? (
        <Link
          href={href(prevPage)}
          className="rounded-lg border border-earth-300 bg-white px-4 py-2 text-earth-700 hover:bg-earth-50"
        >
          Previous
        </Link>
      ) : (
        <span className="cursor-not-allowed rounded-lg border border-earth-200 bg-earth-50 px-4 py-2 text-earth-400">
          Previous
        </span>
      )}

      <span className="px-4 py-2 text-earth-600">
        Page {page} of {totalPages}
      </span>

      {nextPage ? (
        <Link
          href={href(nextPage)}
          className="rounded-lg border border-earth-300 bg-white px-4 py-2 text-earth-700 hover:bg-earth-50"
        >
          Next
        </Link>
      ) : (
        <span className="cursor-not-allowed rounded-lg border border-earth-200 bg-earth-50 px-4 py-2 text-earth-400">
          Next
        </span>
      )}
    </nav>
  );
}

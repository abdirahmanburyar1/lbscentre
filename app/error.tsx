"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center px-4">
      <h2 className="font-display text-xl font-semibold text-slate-900">Something went wrong</h2>
      <p className="mt-2 text-slate-600 text-center max-w-md">
        We encountered an error. Please try again.
      </p>
      <button
        onClick={reset}
        className="mt-6 rounded-xl bg-[var(--logo-green)] px-5 py-2.5 font-semibold text-white hover:bg-[var(--logo-green-dark)]"
      >
        Try again
      </button>
    </div>
  );
}

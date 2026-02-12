"use client";

import { useActionState } from "react";
import { login } from "@/app/actions/auth";

export function LoginForm() {
  const [state, formAction] = useActionState(login, undefined);

  return (
    <form action={formAction} className="mt-6 space-y-4">
      {state?.error && "_form" in state.error && (
        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {state.error._form[0]}
        </p>
      )}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900"
        />
        {state?.error && "email" in state.error && state.error.email?.[0] && (
          <p className="mt-1 text-sm text-red-600">{state.error.email[0]}</p>
        )}
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-slate-700">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900"
        />
        {state?.error && "password" in state.error && state.error.password?.[0] && (
          <p className="mt-1 text-sm text-red-600">{state.error.password[0]}</p>
        )}
      </div>
      <button
        type="submit"
        className="w-full rounded-lg bg-[var(--logo-green)] hover:bg-[var(--logo-green-dark)] py-3 font-medium text-white"
      >
        Sign in
      </button>
    </form>
  );
}

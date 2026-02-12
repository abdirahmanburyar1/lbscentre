"use client";

import { useActionState } from "react";
import { submitContact } from "@/app/actions/contact";

export function ContactForm() {
  const [state, formAction] = useActionState(submitContact, {});

  if (state?.success) {
    return (
      <div className="rounded-xl bg-[var(--logo-brown-bg)] p-4 text-[var(--logo-green-dark)] border border-[var(--logo-green)]/30">
        Thank you. Your message has been sent. We will get back to you soon.
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      {state?.error && (
        <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700 border border-red-100">
          {state.error}
        </p>
      )}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700">
          Name *
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="mt-1.5 block w-full min-h-[44px] rounded-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-[var(--logo-green)] focus:ring-2 focus:ring-[var(--logo-green)]/20 sm:py-2.5"
        />
        {state?.fieldErrors?.name && (
          <p className="mt-1 text-sm text-red-600">{state.fieldErrors.name[0]}</p>
        )}
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700">
          Email *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1.5 block w-full min-h-[44px] rounded-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-[var(--logo-green)] focus:ring-2 focus:ring-[var(--logo-green)]/20 sm:py-2.5"
        />
        {state?.fieldErrors?.email && (
          <p className="mt-1 text-sm text-red-600">{state.fieldErrors.email[0]}</p>
        )}
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-slate-700">
          Subject *
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          className="mt-1.5 block w-full min-h-[44px] rounded-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-[var(--logo-green)] focus:ring-2 focus:ring-[var(--logo-green)]/20 sm:py-2.5"
        />
        {state?.fieldErrors?.subject && (
          <p className="mt-1 text-sm text-red-600">{state.fieldErrors.subject[0]}</p>
        )}
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-700">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="mt-1.5 block w-full min-h-[44px] rounded-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-[var(--logo-green)] focus:ring-2 focus:ring-[var(--logo-green)]/20 sm:py-2.5"
        />
        {state?.fieldErrors?.message && (
          <p className="mt-1 text-sm text-red-600">{state.fieldErrors.message[0]}</p>
        )}
      </div>
      <button
        type="submit"
        className="w-full min-h-[48px] rounded-xl bg-[var(--logo-green)] px-4 py-3.5 font-semibold text-white shadow-sm transition hover:bg-[var(--logo-green-dark)] focus:ring-2 focus:ring-[var(--logo-green)] focus:ring-offset-2 active:bg-[var(--logo-green-darker)]"
      >
        Send Message
      </button>
    </form>
  );
}

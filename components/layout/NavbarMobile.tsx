"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/projects", label: "Projects" },
  { href: "/training", label: "Training & Research" },
  { href: "/our-team", label: "Our Team" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

type NavbarMobileProps = { useLightIcon?: boolean };

export function NavbarMobile({ useLightIcon = false }: NavbarMobileProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`inline-flex h-10 w-10 items-center justify-center rounded-lg md:hidden ${
          useLightIcon ? "text-white hover:bg-white/10 hover:text-stone-100" : "text-[var(--logo-brown)] hover:bg-[var(--logo-green)]/15 hover:text-[var(--logo-green-dark)]"
        }`}
        aria-expanded={open}
        aria-label="Toggle menu"
      >
        {open ? (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>
      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm md:hidden"
            aria-hidden
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-[calc(100vh-5rem)] overflow-y-auto border-b border-[var(--logo-green-dark)]/20 bg-white shadow-lg md:hidden">
            <ul className="flex flex-col py-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block px-4 py-3 text-base font-medium text-[var(--logo-brown)] hover:bg-[var(--logo-brown-bg)] hover:text-[var(--logo-green-dark)] active:bg-[var(--logo-green)]/10"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
}

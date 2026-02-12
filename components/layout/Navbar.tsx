"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { NavbarMobile } from "./NavbarMobile";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/projects", label: "Projects" },
  { href: "/training", label: "Training" },
  { href: "/publications", label: "Publications" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

const SCROLL_THRESHOLD = 24;

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/";
  const useLightText = isHome && !scrolled;

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 ${
        scrolled
          ? "border-b border-[var(--logo-green-dark)]/20 bg-[var(--logo-brown-bg)]/95 shadow-md backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="relative mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        <Link
          href="/"
          className="flex min-w-0 shrink-0 items-center gap-2 transition opacity-90 hover:opacity-100 sm:gap-3"
          aria-label="LBS Centre for Social & Agricultural Development - Home"
        >
          <span className={`flex shrink-0 items-center justify-center rounded-xl p-1.5 shadow-md ${useLightText ? "bg-white" : "bg-transparent"}`}>
            <Image
              src="/lbscentre.png"
              alt="LBS Centre for Social & Agricultural Development"
              width={56}
              height={56}
              className="h-12 w-12 object-contain sm:h-14 sm:w-14"
              priority
            />
          </span>
          <div className="min-w-0 flex flex-col leading-tight">
            <span className={`truncate font-display text-base font-semibold tracking-tight sm:text-lg ${useLightText ? "text-white" : "text-[var(--logo-brown)]"}`}>
              LBS Centre
            </span>
            <span className={`hidden truncate sm:block sm:text-sm ${useLightText ? "text-stone-200" : "text-[var(--logo-green-dark)]"}`}>
              Social & Agricultural Development
            </span>
          </div>
        </Link>
        {/* Desktop nav - fitted to the right */}
        <ul className="ml-auto hidden min-w-0 flex-1 flex-wrap items-center justify-end gap-1 md:flex md:gap-2">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`rounded-md px-3 py-2.5 text-sm font-medium transition min-[800px]:py-2 ${
                  useLightText
                    ? "text-white hover:bg-white/10 hover:text-stone-100"
                    : "text-[var(--logo-brown)] hover:bg-[var(--logo-green)]/10 hover:text-[var(--logo-green-dark)]"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        {/* Mobile menu button - right side */}
        <div className="ml-auto flex items-center md:hidden">
          <NavbarMobile useLightIcon={useLightText} />
        </div>
      </nav>
    </header>
  );
}

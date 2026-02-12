import Link from "next/link";
import Image from "next/image";

const FOOTER_LINKS = [
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/projects", label: "Projects" },
  { href: "/training", label: "Training & Research" },
  { href: "/our-team", label: "Our Team" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--logo-green-dark)]/30 bg-[var(--logo-brown)] text-stone-200">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white shadow-md ring-2 ring-white/20">
                <Image
                  src="/lbscentre.png"
                  alt="LBS Centre for Social & Agricultural Development"
                  width={48}
                  height={48}
                  className="h-12 w-12 object-contain"
                />
              </span>
              <span className="font-display text-base font-semibold text-white">
                LBS Centre
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-stone-400">
              For Social & Agricultural Development
            </p>
            <p className="mt-1 text-xs text-stone-500">LNGO – Somalia</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-[var(--logo-yellow)]">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-1.5">
              {FOOTER_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="block text-sm transition hover:text-[var(--logo-yellow)] focus:text-[var(--logo-yellow)] focus:outline-none"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-[var(--logo-yellow)]">
              Get in Touch
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-stone-400">
              Partner with us, support our programs, or learn more about our work.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-block rounded-lg border border-[var(--logo-yellow)]/60 px-4 py-2.5 text-sm font-medium text-[var(--logo-yellow)] transition hover:bg-[var(--logo-yellow)]/10 hover:border-[var(--logo-yellow)]"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-[var(--logo-brown-light)]/50 pt-6 text-center text-xs text-stone-500 sm:mt-12 sm:pt-8 sm:text-sm">
          © {year} LBS Centre for Social & Agricultural Development. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

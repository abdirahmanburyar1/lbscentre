import Link from "next/link";
import Image from "next/image";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--logo-green-dark)]/30 bg-[var(--logo-brown)] text-stone-200">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4">
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
              For Social & Agricultural Development · LNGO – Somalia
            </p>
          </div>
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-[var(--logo-yellow)]">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-1 sm:space-y-2.5">
              {["About", "Programs", "Projects", "Contact"].map((label) => (
                <li key={label}>
                  <Link
                    href={label === "About" ? "/about" : label === "Programs" ? "/programs" : label === "Projects" ? "/projects" : "/contact"}
                    className="block py-2.5 text-sm transition hover:text-[var(--logo-yellow)] active:text-[var(--logo-yellow)] sm:py-0"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-[var(--logo-yellow)]">
              Contact
            </h3>
            <p className="mt-4 text-sm leading-relaxed">
              Use our{" "}
              <Link href="/contact" className="underline decoration-stone-500 underline-offset-2 hover:text-[var(--logo-yellow)] hover:decoration-[var(--logo-yellow)]">
                contact form
              </Link>{" "}
              to get in touch.
            </p>
          </div>
        </div>
        <div className="mt-10 border-t border-[var(--logo-brown-light)]/50 pt-6 text-center text-xs text-stone-500 sm:mt-12 sm:pt-8 sm:text-sm">
          © {year} LBS Centre for Social & Agricultural Development. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

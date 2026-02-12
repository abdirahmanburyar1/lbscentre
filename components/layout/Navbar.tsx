import Link from "next/link";

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

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-earth-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-display text-xl font-bold text-earth-800">
          LBS Centre
        </Link>
        <ul className="flex flex-wrap items-center gap-4 md:gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-earth-700 hover:text-earth-900 font-medium transition"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/admin"
              className="text-earth-600 hover:text-earth-800 text-sm"
            >
              Admin
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

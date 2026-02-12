import Link from "next/link";
import Image from "next/image";
import { type ReactNode } from "react";

type CardProps = {
  title: string;
  description?: string;
  href?: string;
  image?: string | null;
  imageAlt?: string;
  children?: ReactNode;
  className?: string;
};

export function Card({
  title,
  description,
  href,
  image,
  imageAlt,
  children,
  className = "",
}: CardProps) {
  const content = (
    <>
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--logo-brown-bg)]">
        {image ? (
          <Image
            src={image}
            alt={imageAlt ?? title}
            fill
            className="object-cover transition duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[var(--logo-brown-bg)] to-[var(--logo-green)]/10">
            <Image
              src="/lbscentre.png"
              alt=""
              width={80}
              height={80}
              className="object-contain opacity-40"
              aria-hidden
            />
          </div>
        )}
      </div>
      <div className="p-4 sm:p-6 md:p-7">
        <h3 className="font-display text-lg font-semibold text-slate-900 sm:text-xl">
          {title}
        </h3>
        {description && (
          <p className="mt-2 text-slate-600 line-clamp-3 leading-relaxed">
            {description}
          </p>
        )}
        {children}
      </div>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={`group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:border-[var(--logo-green-dark)]/40 hover:shadow-lg hover:-translate-y-0.5 ${className}`}
      >
        {content}
      </Link>
    );
  }

  return (
    <div
      className={`overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm ${className}`}
    >
      {content}
    </div>
  );
}

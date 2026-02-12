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
      {image && (
        <div className="relative aspect-video w-full overflow-hidden rounded-t-xl bg-earth-100">
          <Image
            src={image}
            alt={imageAlt ?? title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="font-display text-xl font-semibold text-earth-800">{title}</h3>
        {description && <p className="mt-2 text-earth-600 line-clamp-3">{description}</p>}
        {children}
      </div>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={`block overflow-hidden rounded-xl border border-earth-200 bg-white shadow-sm transition hover:shadow-md hover:border-earth-300 ${className}`}
      >
        {content}
      </Link>
    );
  }

  return (
    <div
      className={`overflow-hidden rounded-xl border border-earth-200 bg-white shadow-sm ${className}`}
    >
      {content}
    </div>
  );
}

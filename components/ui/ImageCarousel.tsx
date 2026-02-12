"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const CAROUSEL_IMAGES = ["/images/1.jpg", "/images/2.jpg", "/images/3.jpg"];
const ROTATE_MS = 4500;

type ImageCarouselProps = {
  className?: string;
};

export function ImageCarousel({ className = "" }: ImageCarouselProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % CAROUSEL_IMAGES.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={`relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-lg ${className}`.trim()}>
      {CAROUSEL_IMAGES.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: i === index ? 1 : 0 }}
          aria-hidden
        >
          <Image
            src={src}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      ))}
    </div>
  );
}

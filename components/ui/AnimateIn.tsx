"use client";

import { useEffect, useRef, type ReactNode } from "react";

type AnimateInProps = {
  children: ReactNode;
  className?: string;
  animation?: "fade-in" | "fade-in-up" | "scale-in";
  delay?: 0 | 100 | 200 | 300 | 400;
};

export function AnimateIn({
  children,
  className = "",
  animation = "fade-in-up",
  delay = 0,
}: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in-visible");
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const delayClass =
    delay === 100
      ? "animation-delay-100"
      : delay === 200
      ? "animation-delay-200"
      : delay === 300
      ? "animation-delay-300"
      : delay === 400
      ? "animation-delay-400"
      : "";

  const animationClass =
    animation === "fade-in"
      ? "animate-fade-in"
      : animation === "scale-in"
      ? "animate-scale-in"
      : "animate-fade-in-up";

  return (
    <div
      ref={ref}
      className={`animate-in-root ${animationClass} ${delayClass} ${className}`}
    >
      {children}
    </div>
  );
}

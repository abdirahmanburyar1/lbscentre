"use client";

export function HeroBackground() {
  return (
    <div className="absolute inset-0">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="h-full w-full object-cover"
        poster="/images/1.jpg" // Fallback image while loading
      >
        <source src="https://ik.imagekit.io/l3fsh0tdro/wallpaper%20(1).mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

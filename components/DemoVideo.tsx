"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A real recording of Scribe in a window frame. With motion allowed it plays
 * on its own, muted and looping, from its first frame as the poster; under
 * reduced motion it stays on the poster with controls, so nothing moves until
 * the visitor presses play. It only loads its file once it is near the screen.
 */
export function DemoVideo({
  src,
  poster,
  label,
  autoPlay = true,
  className = "",
}: {
  src: string;
  poster: string;
  label: string;
  autoPlay?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [still, setStill] = useState(true);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setStill(reduce || !autoPlay);
    if (reduce || !autoPlay) return;
    // Plays while on screen, pauses off it (no work for a video nobody sees).
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => setStill(true));
        else video.pause();
      },
      { threshold: 0.25 }
    );
    io.observe(video);
    return () => io.disconnect();
  }, [autoPlay]);

  return (
    <figure className={`overflow-hidden rounded-2xl border border-edge bg-card shadow-2xl shadow-black/40 ${className}`}>
      <div aria-hidden="true" className="flex items-center gap-1.5 border-b border-edge bg-bg-2/80 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
      </div>
      <video
        ref={ref}
        className="aspect-video w-full bg-bg-2"
        poster={poster}
        muted
        loop={!still}
        playsInline
        controls={still}
        preload="none"
        aria-label={label}
      >
        <source src={src} type="video/mp4" />
      </video>
      <figcaption className="sr-only">{label}</figcaption>
    </figure>
  );
}

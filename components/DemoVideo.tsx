"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A recording of Scribe in a window frame. It stays hidden behind a quiet
 * placeholder until it is actually playing, then fades in, so the browser's
 * own loading frame never shows. With motion allowed it plays muted and
 * looping while on screen; under reduced motion (or if autoplay is blocked)
 * it shows its poster with controls, so nothing moves until the visitor
 * presses play.
 */
export function DemoVideo({
  src,
  poster,
  label,
  zoom,
  className = "",
}: {
  src: string;
  poster: string;
  label: string;
  /** Crops in on the middle of the recording (scale, and the point it scales from). */
  zoom?: { scale: number; origin: string };
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  // "loading" until it plays (or falls back to the poster); "still" shows controls.
  const [state, setState] = useState<"loading" | "playing" | "still">("loading");

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setState("still");
      return;
    }
    const onPlaying = () => setState((s) => (s === "loading" ? "playing" : s));
    video.addEventListener("playing", onPlaying);
    // Plays while on screen, pauses off it (no work for a video nobody sees).
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return video.pause();
        video.play().catch(() => setState("still"));
      },
      { threshold: 0.25 }
    );
    io.observe(video);
    return () => {
      io.disconnect();
      video.removeEventListener("playing", onPlaying);
    };
  }, []);

  const still = state === "still";
  return (
    <figure className={`overflow-hidden rounded-2xl border border-edge bg-card shadow-2xl shadow-black/40 ${className}`}>
      <div aria-hidden="true" className="flex items-center gap-1.5 border-b border-edge bg-bg-2/80 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
      </div>
      <div className="relative aspect-video overflow-hidden bg-bg-2">
        {/* Placeholder while it loads: the window's own dark, with a soft sweep */}
        <div
          aria-hidden="true"
          className={`absolute inset-0 bg-[linear-gradient(110deg,transparent_30%,rgba(34,211,238,0.06)_50%,transparent_70%)] bg-[length:200%_100%] transition-opacity duration-700 [animation:sweep_1.8s_linear_infinite] ${state === "loading" ? "opacity-100" : "opacity-0"}`}
        />
        <video
          ref={ref}
          className={`h-full w-full transition-opacity duration-700 ${state === "loading" ? "opacity-0" : "opacity-100"}`}
          style={zoom && !still ? { transform: `scale(${zoom.scale})`, transformOrigin: zoom.origin } : undefined}
          poster={still ? poster : undefined}
          muted
          loop={!still}
          playsInline
          controls={still}
          preload="auto"
          aria-label={label}
        >
          <source src={src} type="video/mp4" />
        </video>
        <noscript>
          <style>{`video { opacity: 1 !important; }`}</style>
        </noscript>
      </div>
      <figcaption className="sr-only">{label}</figcaption>
    </figure>
  );
}

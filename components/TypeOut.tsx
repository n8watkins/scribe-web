"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Types its text out once it scrolls into view, after `delay` ms. The full
 * text is laid out (invisibly) underneath from the first paint, so the box
 * never changes size while it types. Under reduced motion it shows at once.
 */
export function TypeOut({ text, delay = 0, speed = 28, className = "" }: { text: string; delay?: number; speed?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: number | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        setShown(0);
        const start = performance.now() + delay;
        const tick = () => {
          const n = Math.max(0, Math.floor((performance.now() - start) / speed));
          setShown(Math.min(n, text.length));
          if (n < text.length) timer = window.setTimeout(tick, speed);
        };
        timer = window.setTimeout(tick, delay);
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
  }, [text, delay, speed]);

  const typing = shown !== null && shown < text.length;
  return (
    <span ref={ref} className={`relative block ${className}`}>
      <span aria-hidden={shown !== null} className={shown === null ? "" : "invisible"}>
        {text}
      </span>
      {shown !== null && (
        <span aria-hidden="true" className="absolute inset-0">
          {text.slice(0, shown)}
          {typing && <span className="ml-px inline-block h-[1.1em] w-px translate-y-[0.2em] animate-pulse bg-cyan" />}
        </span>
      )}
    </span>
  );
}

"use client";

import { useEffect } from "react";

/**
 * Marks every [data-reveal] element as shown once it nears the viewport, so
 * globals.css can fade it in. One observer for the whole page; elements stay
 * visible without JavaScript or under reduced motion (the CSS only hides them
 * when both scripting and motion are on).
 */
export function Reveal() {
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.shown = "";
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}

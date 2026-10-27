"use client";

import { useId, useState } from "react";
import type { FaqItem } from "@/lib/site";

/**
 * The FAQ as an accordion: each question is a button (aria-expanded,
 * aria-controls, Enter and Space from the keyboard), and its answer opens
 * smoothly by animating the grid row from 0fr to 1fr. Under reduced motion it
 * opens at once (globals.css cuts transitions).
 */
export function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const base = useId();
  return (
    <div className="mt-10 space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        const id = `${base}-${i}`;
        return (
          <div
            key={item.question}
            className={`rounded-2xl border transition-colors duration-300 ${isOpen ? "border-cyan/40 bg-card-2" : "border-edge bg-card"}`}
          >
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${id}-a`}
                id={`${id}-q`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 rounded-2xl px-6 py-5 text-left font-semibold text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
              >
                {item.question}
                <span
                  aria-hidden="true"
                  className={`shrink-0 text-xl font-normal text-cyan transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={`${id}-a`}
              role="region"
              aria-labelledby={`${id}-q`}
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="overflow-hidden" inert={!isOpen}>
                <p className="px-6 pb-6 pr-14 leading-relaxed text-mute">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/Icons";
import type { IconName } from "@/lib/site";

/**
 * One local-AI example that plays like a looping GIF while it's on screen:
 * what you say types out, the AI thinks for a moment, what you get types in,
 * it holds, then clears and plays again. `startDelay` staggers two examples so
 * they never play in step. Every line is laid out (invisibly) from the first
 * paint, so nothing moves while it plays. Under reduced motion it shows
 * finished and stays still.
 */
type Phase = "idle" | "say" | "think" | "get" | "done";

const SAY_MS = 38;
const GET_MS = 14;
const THINK_MS = 1100;
/** How long the finished example stays up before it plays again. */
const HOLD_MS = 4200;

function Typed({ text, count, caret }: { text: string; count: number | null; caret: boolean }) {
  if (count === null) return <>{text}</>;
  return (
    <span className="relative block">
      <span className="invisible">{text}</span>
      <span aria-hidden="true" className="absolute inset-0">
        {text.slice(0, count)}
        {caret && <span className="ml-px inline-block h-[1.1em] w-px translate-y-[0.2em] animate-pulse bg-cyan" />}
      </span>
    </span>
  );
}

function Box({ label, icon, tone, children }: { label: string; icon: IconName; tone: "context" | "say" | "get"; children: React.ReactNode }) {
  const box = {
    context: "border-dashed border-edge bg-transparent",
    say: "border-edge-strong bg-card-2",
    get: "border-cyan/40 bg-cyan/[0.06]",
  }[tone];
  return (
    <div className={`rounded-xl border p-4 ${box}`}>
      <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-faint">
        <Icon name={icon} className="h-3.5 w-3.5" />
        {label}
      </p>
      <div className="mt-2 text-[0.95rem] leading-relaxed text-ink">{children}</div>
    </div>
  );
}

export function AIExample({
  title,
  how,
  context,
  sayLabel,
  say,
  get,
  bullets = [],
  startDelay = 0,
}: {
  /** Optional heading inside the card (the page sections carry their own). */
  title?: string;
  how?: React.ReactNode;
  context?: string;
  sayLabel: string;
  say: string;
  get: string;
  bullets?: string[];
  startDelay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [n, setN] = useState(0);
  const [visible, setVisible] = useState(false);
  const started = useRef(false);
  const getLines = [get, ...bullets];
  const getTotal = getLines.reduce((sum, line) => sum + line.length, 0);

  // Plays only while mostly in view (it pauses where it is when scrolled
  // away); finished and still under reduced motion.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setPhase("done");
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.55 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // The first time it's seen, start after its stagger. It only counts as
  // started once it really starts, so scrolling past it doesn't strand it.
  useEffect(() => {
    if (!visible || started.current) return;
    const t = window.setTimeout(() => {
      started.current = true;
      setPhase("say");
    }, startDelay);
    return () => window.clearTimeout(t);
  }, [visible, startDelay]);

  // Step through the phases: type, think, type, hold, and round again.
  useEffect(() => {
    if (!visible) return;
    if (phase === "done" && started.current) {
      const t = window.setTimeout(() => {
        setN(0);
        setPhase("say");
      }, HOLD_MS);
      return () => window.clearTimeout(t);
    }
    if (phase === "say" || phase === "get") {
      const total = phase === "say" ? say.length : getTotal;
      if (n >= total) {
        const t = window.setTimeout(() => {
          setN(0);
          setPhase(phase === "say" ? "think" : "done");
        }, 250);
        return () => window.clearTimeout(t);
      }
      const t = window.setTimeout(() => setN((x) => x + 1), phase === "say" ? SAY_MS : GET_MS);
      return () => window.clearTimeout(t);
    }
    if (phase === "think") {
      const t = window.setTimeout(() => setPhase("get"), THINK_MS);
      return () => window.clearTimeout(t);
    }
  }, [phase, n, say.length, getTotal, visible]);

  const sayCount = phase === "idle" ? 0 : phase === "say" ? n : null;
  // Characters shown for each get line, filling them in order.
  const lineCount = (i: number): number | null => {
    if (phase === "done") return null;
    if (phase !== "get") return 0;
    const before = getLines.slice(0, i).reduce((sum, line) => sum + line.length, 0);
    return Math.max(0, Math.min(getLines[i].length, n - before));
  };
  const typingLine = phase === "get" ? getLines.findIndex((_, i) => (lineCount(i) ?? 0) < getLines[i].length) : -1;
  const waiting = phase === "idle" || phase === "say";

  return (
    <div ref={ref} className="rounded-2xl border border-edge bg-card/60 p-5 sm:p-6">
      {title && <p className="font-semibold text-ink">{title}</p>}
      {how && <p className="mt-1 text-sm text-mute">{how}</p>}
      <div className={`space-y-3 ${title || how ? "mt-5" : ""}`}>
        {context && (
          <Box label="Selected" icon="file" tone="context">
            <span className="text-mute">{context}</span>
          </Box>
        )}
        <Box label={sayLabel} icon="mic" tone="say">
          <Typed text={say} count={sayCount} caret={phase === "say"} />
        </Box>
        <div className={`transition-opacity duration-500 ${waiting ? "opacity-40" : "opacity-100"}`}>
          <Box label="You get" icon="spark" tone="get">
            <div className="relative">
              <div className={phase === "think" ? "invisible" : ""}>
                <Typed text={get} count={lineCount(0)} caret={typingLine === 0} />
                {bullets.length > 0 && (
                  <ul className="mt-2 list-disc space-y-0.5 pl-5 text-[0.9rem]">
                    {bullets.map((b, i) => (
                      <li key={b} className={lineCount(i + 1) === 0 ? "marker:text-transparent" : ""}>
                        <Typed text={b} count={lineCount(i + 1)} caret={typingLine === i + 1} />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {phase === "think" && (
                <span aria-label="Thinking" className="absolute top-1 left-0 flex items-center gap-1.5 text-sm text-mute">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan" style={{ animationDelay: `${i * 140}ms` }} />
                  ))}
                  <span className="ml-1">Thinking on your PC</span>
                </span>
              )}
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
}

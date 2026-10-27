"use client";

import { useEffect, useRef, useState } from "react";

/**
 * How Scribe works, acted out: the hotkey goes down, the pill fills in phrase
 * by phrase while you talk, the key comes up, and the words are typed into an
 * ordinary text field. Beside it, the four steps, with a rail that fills
 * smoothly as the loop moves through them.
 *
 * One clock drives everything (requestAnimationFrame over a 9-second loop), so
 * the typing eases in character by character and the rail and highlight stay
 * in step with it. It pauses off screen; under reduced motion it shows the
 * finished state with every step lit.
 */

const PHRASES = ["Send Maria the draft", "by Friday,", "and copy me on it."];
const SENTENCE = PHRASES.join(" ");

// The loop, in ms.
const PRESS = 800; // keys go down
const TALK = 1500; // talking starts; phrases arrive every PHRASE_GAP
const PHRASE_GAP = 950;
const RELEASE = 4600; // keys come up
const TYPE = 5100; // typing starts
const TYPE_FOR = 1500;
const LOOP = 9000;

// Where each step starts on the clock (the rail fills between them).
const STEP_AT = [PRESS, TALK, RELEASE, TYPE, TYPE + TYPE_FOR];

const STEPS = [
  { title: "Hold Ctrl + Win", body: "Scribe starts recording to a temporary file on your PC." },
  { title: "Talk", body: "whisper.cpp turns each phrase into text while you're still talking." },
  { title: "Let go", body: "The last phrase finishes, so there's nothing to wait for." },
  { title: "It types", body: "The words go wherever your cursor is. The recording stays on your PC." },
];

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const easeOut = (v: number) => 1 - Math.pow(1 - v, 3);

export function DictationDemo() {
  const root = useRef<HTMLDivElement>(null);
  // null: not animating (reduced motion, or before it starts): show it finished.
  const [t, setT] = useState<number | null>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let start = 0;
    let pausedAt = 0;
    const tick = (now: number) => {
      if (!start) start = now - pausedAt;
      setT((now - start) % LOOP);
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          raf = requestAnimationFrame(tick);
        } else {
          cancelAnimationFrame(raf);
          pausedAt = start ? (performance.now() - start) % LOOP : 0;
          start = 0;
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  const done = t === null;
  const now = t ?? LOOP - 1;
  const keysDown = !done && now >= PRESS && now < RELEASE;
  const heard = done ? 0 : now < TALK ? 0 : Math.min(PHRASES.length, 1 + Math.floor((now - TALK) / PHRASE_GAP));
  const pillShown = !done && now >= PRESS && now < TYPE;
  const typed = done ? SENTENCE.length : Math.round(easeOut(clamp((now - TYPE) / TYPE_FOR)) * SENTENCE.length);
  // The rail: 0 to 4 across the steps, continuous.
  const fill = done
    ? STEPS.length
    : STEPS.reduce((acc, _, i) => acc + clamp((now - STEP_AT[i]) / (STEP_AT[i + 1] - STEP_AT[i])), 0);
  const current = done ? -1 : Math.min(STEPS.length - 1, Math.floor(fill));

  return (
    <div ref={root} className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-12">
      {/* The desktop: a text field with a cursor, the pill, the keys */}
      <div aria-hidden="true" className="rounded-2xl border border-edge bg-bg-2 p-5 sm:p-7">
        <div className="rounded-xl border border-edge bg-card">
          <div className="flex items-center gap-2 border-b border-edge px-4 py-2.5 text-xs text-faint">
            <span className="h-2 w-2 rounded-full bg-faint/50" />
            <span className="h-2 w-2 rounded-full bg-faint/50" />
            <span className="h-2 w-2 rounded-full bg-faint/50" />
            <span className="ml-2">New message</span>
          </div>
          <div className="space-y-1.5 px-4 py-3 text-sm text-faint">
            <p>To: team@company.com</p>
            <p>Subject: Q4 plan</p>
          </div>
          <div className="min-h-[5.5rem] border-t border-edge px-4 py-4 text-base text-ink sm:text-lg">
            {SENTENCE.slice(0, typed)}
            <span className="ml-px inline-block h-[1.15em] w-[2px] translate-y-[3px] animate-pulse bg-cyan" />
          </div>
        </div>

        <div className="mt-5 flex min-h-[3rem] items-center justify-center">
          <div
            className={`flex max-w-full items-center gap-3 rounded-full border border-cyan/40 bg-bg/90 px-4 py-2 shadow-lg shadow-cyan/10 transition-[opacity,transform] duration-300 ${
              pillShown ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
            }`}
          >
            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-cyan shadow-[0_0_10px_var(--color-cyan)]" />
            <span className="flex h-5 items-center gap-[3px]">
              {Array.from({ length: 10 }).map((_, i) => (
                <span
                  key={i}
                  className="w-[3px] rounded-full"
                  style={{
                    height: "100%",
                    background: "linear-gradient(180deg, var(--color-cyan), var(--color-purple))",
                    animation: keysDown ? `wave 900ms ease-in-out ${i * 80}ms infinite` : "none",
                    transform: keysDown ? undefined : "scaleY(0.35)",
                  }}
                />
              ))}
            </span>
            <span className="truncate text-sm text-mute">
              {keysDown ? "Listening" : "Done"}
              {heard > 0 && <span className="text-ink">: {PHRASES.slice(0, heard).join(" ")}</span>}
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2 font-mono text-sm">
          {["Ctrl", "Win"].map((k, i) => (
            <span key={k} className="flex items-center gap-2">
              {i > 0 && <span className="text-faint">+</span>}
              <span
                className={`rounded-lg border px-3 py-1.5 transition-all duration-150 ${
                  keysDown
                    ? "translate-y-0.5 border-b border-cyan/60 bg-cyan/15 text-cyan"
                    : "border-b-4 border-edge-strong bg-card text-ink"
                }`}
              >
                {k}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* The steps, on a rail that fills as the loop goes */}
      <ol className="relative">
        <span aria-hidden="true" className="absolute top-7 bottom-7 left-[15px] w-[2px] rounded-full bg-edge" />
        <span
          aria-hidden="true"
          className="absolute top-7 left-[15px] w-[2px] rounded-full bg-gradient-to-b from-cyan to-purple"
          style={{ height: `calc((100% - 3.5rem) * ${fill / STEPS.length})` }}
        />
        {STEPS.map((s, i) => {
          const lit = done || i === current;
          const reached = done || fill > i;
          return (
            <li key={s.title} className="relative flex gap-4 py-3.5">
              <span
                className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border font-mono text-xs font-semibold transition-colors duration-500 ${
                  reached ? "border-cyan/60 bg-bg-2 text-cyan" : "border-edge bg-bg text-faint"
                }`}
              >
                {i + 1}
              </span>
              <div className={`transition-opacity duration-500 ${lit ? "opacity-100" : "opacity-55"}`}>
                <h3 className="font-semibold text-ink">{s.title}</h3>
                <p className="mt-0.5 text-sm leading-relaxed text-mute">{s.body}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

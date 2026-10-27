"use client";

import { useEffect, useRef, useState } from "react";

/**
 * How Scribe works, acted out: the hotkey goes down, the pill listens and
 * fills in phrase by phrase while you talk, the key comes up, and the words
 * land at the cursor in an ordinary text field. Beside it, what the PC is doing
 * at each moment, step by step, lit in time with the demo.
 *
 * One timer drives it (no animation library), it pauses while off screen, and
 * under reduced motion it shows the finished state with every step listed.
 */

const PHRASES = ["Send Maria the draft", "by Friday,", "and copy me on it."];
const SENTENCE = PHRASES.join(" ");

type Phase = "idle" | "press" | "listen" | "release" | "typed";

// What happens on the machine, in order. `at` is the phase that lights it.
const STEPS: { at: Phase; title: string; body: string }[] = [
  {
    at: "press",
    title: "Ctrl + Win goes down",
    body: "Scribe opens your microphone and starts a 16 kHz recording in a temporary folder on your PC.",
  },
  {
    at: "listen",
    title: "You talk",
    body: "Each phrase goes to whisper.cpp, already loaded in memory on 127.0.0.1, so it transcribes while you are still speaking.",
  },
  {
    at: "release",
    title: "You let go",
    body: "The last phrase finishes. The text is ready the moment the key comes up, with nothing left to wait for.",
  },
  {
    at: "typed",
    title: "It types",
    body: "Scribe types the words where your cursor is, in any app, then deletes the temporary recording.",
  },
];

const ORDER: Phase[] = ["idle", "press", "listen", "release", "typed"];
const HOLD: Record<Phase, number> = { idle: 900, press: 700, listen: 900, release: 700, typed: 2600 };
const PHRASE_EVERY = 850; // ms between phrases while listening

export function DictationDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("typed");
  const [heard, setHeard] = useState(PHRASES.length);
  const [typed, setTyped] = useState(SENTENCE.length);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setAnimated(true);
    let timer = 0;
    let visible = false;
    let i = 0;
    let p = 0;
    let t = 0;

    const run = () => {
      if (!visible) return;
      const current = ORDER[i];
      setPhase(current);
      if (current === "idle") {
        setHeard(0);
        setTyped(0);
      }
      if (current === "listen" && p < PHRASES.length) {
        p += 1;
        setHeard(p);
        timer = window.setTimeout(run, PHRASE_EVERY);
        return;
      }
      if (current === "typed" && t < SENTENCE.length) {
        // Typed out fast, as an input simulation does.
        t = Math.min(SENTENCE.length, t + 3);
        setTyped(t);
        timer = window.setTimeout(run, 16);
        return;
      }
      timer = window.setTimeout(() => {
        i = (i + 1) % ORDER.length;
        if (ORDER[i] === "idle") {
          p = 0;
          t = 0;
        }
        run();
      }, HOLD[current]);
    };

    const io = new IntersectionObserver(([entry]) => {
      const was = visible;
      visible = entry.isIntersecting;
      if (visible && !was) run();
      if (!visible) window.clearTimeout(timer);
    }, { threshold: 0.3 });
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  const keysDown = phase === "press" || phase === "listen";
  const pill =
    phase === "idle" || phase === "typed"
      ? null
      : phase === "release"
        ? "Finishing"
        : "Listening";
  const stepIndex = STEPS.findIndex((s) => s.at === phase);

  return (
    <div ref={root} className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-10">
      {/* The desktop: a text field with a cursor, the pill, the keys */}
      <div aria-hidden="true" className="relative flex flex-col justify-center overflow-hidden rounded-2xl border border-edge bg-bg-2 p-5 sm:p-7">
        <div className="rounded-xl border border-edge bg-card">
          <div className="flex items-center gap-2 border-b border-edge px-4 py-2.5 text-xs text-faint">
            <span className="h-2 w-2 rounded-full bg-faint/60" />
            <span className="h-2 w-2 rounded-full bg-faint/60" />
            <span className="h-2 w-2 rounded-full bg-faint/60" />
            <span className="ml-2">New message</span>
          </div>
          <div className="space-y-2 px-4 py-3 text-sm">
            <p className="text-faint">To: team@company.com</p>
            <p className="text-faint">Subject: Q4 plan</p>
          </div>
          <div className="min-h-[5.5rem] border-t border-edge px-4 py-4 text-base text-ink sm:text-lg">
            {SENTENCE.slice(0, typed)}
            <span className={`ml-px inline-block h-[1.15em] w-[2px] translate-y-[3px] bg-cyan ${animated ? "animate-pulse" : ""}`} />
          </div>
        </div>

        {/* Scribe's pill, floating over whatever app you are in */}
        <div className="mt-5 flex min-h-[3.25rem] items-center justify-center">
          <div
            className={`flex max-w-full items-center gap-3 rounded-full border border-cyan/40 bg-bg/90 px-4 py-2 shadow-lg shadow-cyan/10 transition-opacity duration-300 ${pill ? "opacity-100" : "opacity-0"}`}
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
                    animation: phase === "listen" ? `wave 900ms ease-in-out ${i * 80}ms infinite` : "none",
                    transform: phase === "listen" ? undefined : "scaleY(0.35)",
                  }}
                />
              ))}
            </span>
            <span className="truncate text-sm text-mute">
              {pill}
              {heard > 0 && pill && <span className="text-ink">: {PHRASES.slice(0, heard).join(" ")}</span>}
            </span>
          </div>
        </div>

        {/* The hotkey */}
        <div className="mt-4 flex items-center justify-center gap-2 font-mono text-sm">
          {["Ctrl", "Win"].map((k, i) => (
            <span key={k} className="flex items-center gap-2">
              {i > 0 && <span className="text-faint">+</span>}
              <span
                className={`rounded-lg border px-3 py-1.5 transition-all duration-150 ${
                  keysDown
                    ? "translate-y-0.5 border-cyan/60 border-b bg-cyan/15 text-cyan"
                    : "border-edge-strong border-b-4 bg-card text-ink"
                }`}
              >
                {k}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* What the PC is doing */}
      <ol className="flex flex-col gap-3">
        {STEPS.map((s, i) => {
          const lit = !animated || i === stepIndex;
          const done = animated && stepIndex > i;
          return (
            <li
              key={s.title}
              className={`relative rounded-2xl border p-5 transition-colors duration-300 ${
                lit ? "border-cyan/45 bg-card-2" : "border-edge bg-card"
              }`}
            >
              <div className="flex items-baseline gap-3">
                <span
                  className={`font-mono text-xs font-semibold tabular-nums ${lit || done ? "text-cyan" : "text-faint"}`}
                >
                  0{i + 1}
                </span>
                <div>
                  <h3 className={`font-semibold ${lit ? "text-ink" : "text-mute"}`}>{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-mute">{s.body}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { Bold, Check, Heading1, Italic, List, ListChecks, Replace, Underline } from "lucide-react";

/**
 * The showpiece: a document editor where Scribe types as you talk, looping
 * while it's on screen. What it shows is what the app does: the floating
 * pill shows the words as it hears them (raw), finished phrases land at the
 * cursor while you're still talking (live transcription, with Whisper's
 * punctuation), and a replacement turns "my email" into the address. Letting
 * go of the keys ends the dictation; a second one forms the next paragraph.
 * Everything is driven by one clock; reduced motion shows the finished page.
 */

type Chunk = { at: number; text: string; replaced?: string };
type Take = { keysOn: number; keysOff: number; heard: { at: number; word: string }[]; chunks: Chunk[] };

// Words appear in the pill as they're "heard"; phrases land in the document a beat later.
function heard(words: string, from: number, every: number) {
  return words.split(" ").map((word, i) => ({ at: from + i * every, word }));
}

const TAKES: Take[] = [
  {
    keysOn: 700,
    keysOff: 4600,
    heard: heard("the screenshots are done and the copy is ready for one last review", 900, 260),
    chunks: [
      { at: 2000, text: "The screenshots are done" },
      { at: 3300, text: " and the copy is ready" },
      { at: 4500, text: " for one last review." },
    ],
  },
  {
    keysOn: 5900,
    keysOff: 9200,
    heard: heard("send the build notes to my email before friday", 6100, 280),
    chunks: [
      { at: 7300, text: "Send the build notes to " },
      { at: 8600, text: "n8@example.com", replaced: "my email" },
      { at: 8600, text: " before Friday." },
    ],
  },
];

const LOOP = 15500;
const FADE_OUT = 14600;
const ENTER_AT = 5300; // the cursor moves to a new paragraph

function useClock(ref: React.RefObject<HTMLElement | null>) {
  const [t, setT] = useState<number | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setT(-1);
    let visible = false;
    let raf = 0;
    let last = 0;
    let elapsed = 0;
    const tick = (now: number) => {
      if (!visible) return;
      if (last) elapsed = (elapsed + Math.min(now - last, 100)) % LOOP;
      last = now;
      setT(elapsed);
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        cancelAnimationFrame(raf);
        last = 0;
        if (visible) raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [ref]);
  return t;
}

export function EditorDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const clock = useClock(ref);
  // -1: reduced motion, the finished page; null: before it's seen, the empty page.
  const t = clock === -1 ? FADE_OUT - 1 : (clock ?? 0);
  const still = clock === -1;

  const take = TAKES.find((k) => t >= k.keysOn - 200 && t < k.keysOff + 900);
  const keysHeld = !!take && t >= take.keysOn && t < take.keysOff;
  const pillOn = !still && !!take && t >= take.keysOn;
  const done = !!take && t >= take.keysOff;
  const pillWords = take ? take.heard.filter((h) => h.at <= t).map((h) => h.word) : [];
  const fading = t >= FADE_OUT;

  const paragraph = (k: Take) =>
    // Only what has been said is on the page, so the cursor sits right after it.
    k.chunks.map((c, i) => {
      if (t < c.at) return null;
      const fresh = t - c.at < 1600 && !still;
      return (
        <span key={i} className="animate-[land_300ms_ease-out]">
          {c.replaced ? (
            <span className={`relative rounded px-0.5 transition-colors duration-700 ${fresh ? "bg-cyan/25 text-ink" : "bg-transparent"}`}>
              {c.text}
              {fresh && (
                <span className="absolute top-full left-0 mt-1.5 inline-flex items-center gap-1 whitespace-nowrap rounded-md border border-cyan/40 bg-bg px-2 py-0.5 text-[0.7rem] font-semibold text-cyan shadow-lg">
                  <Replace className="h-3 w-3" aria-hidden="true" />
                  Replacement: &ldquo;{c.replaced}&rdquo;
                </span>
              )}
            </span>
          ) : (
            c.text
          )}
        </span>
      );
    });

  // Where the cursor sits: at the end of the newest landed text.
  const caretIn = t >= ENTER_AT ? 1 : 0;

  return (
    <div ref={ref} className="relative mx-auto max-w-4xl pt-16" role="img" aria-label="Scribe typing into a document as someone talks: the pill shows the words it hears, the phrases land at the cursor with punctuation, and a replacement turns 'my email' into an address.">
      {/* Keys held, top left */}
      <div
        aria-hidden="true"
        className={`absolute top-3 left-4 hidden items-center gap-1.5 font-mono text-xs transition-opacity duration-300 sm:flex ${keysHeld ? "opacity-100" : "opacity-40"}`}
      >
        {["Ctrl", "Win"].map((k, i) => (
          <span key={k} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-faint">+</span>}
            <kbd
              className={`rounded-md border px-2 py-1 transition-all duration-200 ${
                keysHeld ? "translate-y-px border-cyan/60 bg-cyan/10 text-ink shadow-[0_0_14px_rgba(34,211,238,0.3)]" : "border-edge-strong bg-card text-mute"
              }`}
            >
              {k}
            </kbd>
          </span>
        ))}
      </div>

      {/* Scribe's floating pill, above the window */}
      <div
        aria-hidden="true"
        className={`absolute top-0 left-1/2 z-10 flex max-w-[calc(100%-2rem)] -translate-x-1/2 items-center gap-2.5 rounded-full border bg-[#0a1220]/95 px-3.5 py-2 shadow-xl transition-all duration-300 ${
          pillOn ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
        } ${done ? "border-green/50" : "border-cyan/50 shadow-cyan/20"}`}
      >
        {done ? (
          <Check className="h-4 w-4 shrink-0 text-green" />
        ) : (
          <span className="flex h-4 shrink-0 items-center gap-[3px]">
            {Array.from({ length: 9 }, (_, i) => (
              <span key={i} className="block h-full w-[3px] rounded-full bg-cyan" style={{ animation: `wave 900ms ease-in-out ${i * 90}ms infinite` }} />
            ))}
          </span>
        )}
        {/* The newest words, as the pill shows what it hears */}
        <span className="whitespace-nowrap text-xs text-ink">
          {done ? (
            "Done"
          ) : pillWords.length ? (
            <>
              <span className="sm:hidden">{pillWords.slice(-4).join(" ")}</span>
              <span className="hidden sm:inline">{pillWords.slice(-7).join(" ")}</span>
            </>
          ) : (
            "Listening..."
          )}
        </span>
      </div>

      {/* The editor */}
      <div className={`overflow-hidden rounded-2xl border border-edge bg-[#0b1322] shadow-2xl shadow-black/50 transition-opacity duration-700 ${fading ? "opacity-40" : "opacity-100"}`}>
        <div aria-hidden="true" className="flex items-center gap-3 border-b border-edge bg-bg-2/80 px-4 py-2.5">
          <span className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </span>
          <span className="text-xs text-faint">Launch plan · Notes</span>
        </div>
        <div aria-hidden="true" className="flex items-center gap-1 border-b border-edge/70 px-4 py-1.5 text-faint">
          {[Heading1, Bold, Italic, Underline, List, ListChecks].map((I, i) => (
            <span key={i} className="flex h-7 w-7 items-center justify-center rounded-md">
              <I className="h-4 w-4" />
            </span>
          ))}
        </div>
        <div className="min-h-[19rem] px-6 py-6 sm:px-10 sm:py-8">
          <p className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">Launch plan</p>
          <p className="mt-1 text-xs text-faint">Thursday · team update</p>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-ink sm:text-lg">
            {TAKES.map((k, i) => (
              <p key={i} className="min-h-[1.75em]">
                {paragraph(k)}
                {!still && caretIn === i && !fading && (
                  <span className="ml-px inline-block h-[1.15em] w-[2px] translate-y-[0.2em] animate-pulse bg-cyan" />
                )}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

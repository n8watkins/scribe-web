"use client";

import { useEffect, useRef, useState } from "react";
import { DOWNLOAD_URL, GITHUB_URL } from "@/lib/site";

const PHRASE = "Hold a key, speak, and Scribe types it right where your cursor is.";

function Waveform() {
  return (
    <div className="flex items-center gap-[3px] h-6">
      {Array.from({ length: 16 }).map((_, i) => (
        <span
          key={i}
          className="w-[3px] rounded-full bg-cyan"
          style={{
            height: "100%",
            transformOrigin: "center",
            animation: `wave 900ms ease-in-out ${i * 70}ms infinite`,
            background: "linear-gradient(180deg, var(--color-cyan), var(--color-purple))",
          }}
        />
      ))}
    </div>
  );
}

function TypeOut() {
  const [n, setN] = useState(0);
  const ref = useRef(0);
  useEffect(() => {
    const id = setInterval(() => {
      ref.current = Math.min(PHRASE.length, ref.current + 1);
      setN(ref.current);
      if (ref.current >= PHRASE.length) clearInterval(id);
    }, 38);
    return () => clearInterval(id);
  }, []);
  return (
    <span>
      {PHRASE.slice(0, n)}
      <span className="inline-block w-[2px] h-[1.1em] translate-y-[3px] bg-cyan animate-pulse" />
    </span>
  );
}

export function Hero({ stars }: { stars: number | null }) {
  return (
    <section className="relative mx-auto max-w-5xl px-6 pt-20 pb-16 text-center">
      <div className="flex justify-center mb-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/scribe-icon.png" alt="Scribe" width={88} height={88} className="drop-shadow-[0_8px_40px_rgba(34,211,238,0.35)]" />
      </div>

      <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.02]">
        Talk. <span className="gradient-text">It types.</span>
      </h1>
      <p className="mt-5 text-lg sm:text-xl text-mute max-w-2xl mx-auto">
        Local, free voice dictation for Windows. Hold a key, speak, release — the
        text lands at your cursor. Your voice <span className="text-ink font-semibold">never leaves your PC</span>.
      </p>

      {/* live dictation mock */}
      <div className="mt-10 mx-auto max-w-2xl rounded-2xl border border-edge bg-card/80 backdrop-blur p-5 text-left shadow-2xl">
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-flex items-center gap-3 rounded-full border border-cyan/40 bg-bg-2/80 px-4 py-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan shadow-[0_0_12px_var(--color-cyan)]" />
            <Waveform />
            <span className="text-sm text-mute">Listening · local</span>
          </span>
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-green/40 bg-green/10 px-3 py-1.5 text-xs text-green">
            🔒 offline
          </span>
        </div>
        <div className="font-mono text-base sm:text-lg text-ink min-h-[3.5em]">
          <TypeOut />
        </div>
      </div>

      <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
        <a
          href={GITHUB_URL}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan to-purple px-6 py-3 font-semibold text-bg shadow-lg shadow-cyan/20 transition hover:brightness-110"
        >
          ⭐ Star on GitHub
          {stars != null && (
            <span className="ml-1 rounded-full bg-bg/25 px-2 py-0.5 text-sm tabular-nums">{stars.toLocaleString()}</span>
          )}
        </a>
        <a
          href={DOWNLOAD_URL}
          className="inline-flex items-center gap-2 rounded-full border border-edge-strong bg-card px-6 py-3 font-semibold text-ink transition hover:border-cyan/60"
        >
          ↓ Download for Windows
        </a>
      </div>
      <p className="mt-4 text-sm text-faint">Free &amp; open source · no account · no telemetry</p>
    </section>
  );
}

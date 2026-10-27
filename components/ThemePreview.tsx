"use client";

import { useState } from "react";

// The app's built-in themes (App.css in the app): the colours the preview
// window below is painted with. "Pewter" is the light one (key "daylight").
const THEMES = [
  { name: "Midnight", bg: "#070b14", raised: "#0d1320", card: "rgba(23, 32, 51, 0.82)", border: "rgba(148, 163, 184, 0.18)", accent: "#22d3ee", on: "#06111f", text: "#f8fafc", text2: "#cbd5e1", muted: "#94a3b8" },
  { name: "Ocean", bg: "#04141c", raised: "#0a2230", card: "rgba(15, 48, 66, 0.82)", border: "rgba(125, 211, 252, 0.2)", accent: "#2dd4bf", on: "#042029", text: "#ecfeff", text2: "#bae6fd", muted: "#7dd3fc" },
  { name: "Slate", bg: "#0b0e14", raised: "#151a23", card: "rgba(33, 40, 54, 0.82)", border: "rgba(148, 163, 184, 0.2)", accent: "#818cf8", on: "#0d1020", text: "#f1f5f9", text2: "#cbd5e1", muted: "#94a3b8" },
  { name: "Emerald", bg: "#05140d", raised: "#0a2117", card: "rgba(13, 48, 33, 0.82)", border: "rgba(110, 231, 183, 0.2)", accent: "#10b981", on: "#03130c", text: "#ecfdf5", text2: "#bbf7d0", muted: "#86c5a3" },
  { name: "Violet", bg: "#0c0a1a", raised: "#181233", card: "rgba(40, 30, 74, 0.82)", border: "rgba(196, 181, 253, 0.2)", accent: "#8b5cf6", on: "#100b20", text: "#f5f3ff", text2: "#ddd6fe", muted: "#a99fce" },
  { name: "Pewter", bg: "#d6dadf", raised: "#e8ebef", card: "rgba(255, 255, 255, 0.7)", border: "rgba(31, 41, 55, 0.14)", accent: "#075985", on: "#f8fafc", text: "#1f2937", text2: "#374151", muted: "#4b5563" },
] as const;

// The app's own sidebar and Dashboard labels (App.tsx, layout.tsx); the
// numbers are made up for the picture.
const NAV = ["Dashboard", "Transcribe", "History", "Notes", "Sync", "Stats", "Settings", "Themes"];
const STATS = [
  ["Words today", "1,284"],
  ["Dictations today", "37"],
  ["Average WPM", "142"],
];
const RECENT = [
  ["Thursday works for me. I'll send the invite.", "2 min ago"],
  ["Remember to book the dentist before Friday.", "1 h ago"],
  ["The build passed, so let's ship it this afternoon.", "3 h ago"],
];

export function ThemePreview() {
  const [pick, setPick] = useState(0);
  const t = THEMES[pick];
  const fade = "transition-colors duration-500";

  return (
    <div>
      <div role="radiogroup" aria-label="Preview a theme" className="flex flex-wrap justify-center gap-2">
        {THEMES.map((theme, i) => (
          <button
            key={theme.name}
            type="button"
            role="radio"
            aria-checked={i === pick}
            onClick={() => setPick(i)}
            className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan ${
              i === pick ? "border-cyan/60 bg-card-2 text-ink" : "border-edge bg-card/60 text-mute hover:border-edge-strong hover:text-ink"
            }`}
          >
            <span className="h-3.5 w-3.5 rounded-full ring-1 ring-white/20" style={{ background: `linear-gradient(135deg, ${theme.bg} 50%, ${theme.accent} 50%)` }} />
            {theme.name}
          </button>
        ))}
      </div>

      {/* Scribe's window, painted in the picked theme */}
      <div
        aria-label={`Scribe in the ${t.name} theme`}
        role="img"
        className={`mx-auto mt-6 max-w-4xl overflow-hidden rounded-2xl border shadow-2xl shadow-black/40 ${fade}`}
        style={{ background: t.bg, borderColor: t.border }}
      >
        <div className={`flex items-center gap-2 border-b px-4 py-2.5 text-xs font-semibold ${fade}`} style={{ background: t.raised, borderColor: t.border, color: t.text2 }}>
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: t.accent }} />
          Scribe
        </div>
        <div className="flex">
          <nav className={`hidden w-40 shrink-0 space-y-0.5 border-r p-3 sm:block ${fade}`} style={{ background: t.raised, borderColor: t.border }}>
            {NAV.map((item, i) => (
              <span
                key={item}
                className={`block rounded-lg px-2.5 py-1.5 text-[0.8rem] ${fade}`}
                style={i === 0 ? { background: `${t.accent}26`, color: t.accent, fontWeight: 600 } : { color: t.text2 }}
              >
                {item}
              </span>
            ))}
          </nav>
          <div className="min-w-0 flex-1 p-4 sm:p-5">
            <p className={`text-base font-bold ${fade}`} style={{ color: t.text }}>
              Dashboard
            </p>
            <div className="mt-3 grid grid-cols-3 gap-2.5">
              {STATS.map(([label, value]) => (
                <div key={label} className={`rounded-xl border p-3 ${fade}`} style={{ background: t.card, borderColor: t.border }}>
                  <p className={`text-[0.7rem] ${fade}`} style={{ color: t.muted }}>
                    {label}
                  </p>
                  <p className={`mt-1 text-lg font-bold tabular-nums ${fade}`} style={{ color: t.text }}>
                    {value}
                  </p>
                </div>
              ))}
            </div>
            <div className={`mt-3 rounded-xl border p-3 ${fade}`} style={{ background: t.card, borderColor: t.border }}>
              <p className={`text-[0.7rem] font-semibold uppercase tracking-wider ${fade}`} style={{ color: t.muted }}>
                Recent
              </p>
              <ul className="mt-2 space-y-2">
                {RECENT.map(([text, when]) => (
                  <li key={text} className="flex items-baseline justify-between gap-3 text-[0.8rem]">
                    <span className={`truncate ${fade}`} style={{ color: t.text2 }}>
                      {text}
                    </span>
                    <span className={`shrink-0 text-[0.7rem] ${fade}`} style={{ color: t.muted }}>
                      {when}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-3 flex justify-end">
              <span className={`rounded-full px-3.5 py-1.5 text-[0.75rem] font-semibold ${fade}`} style={{ background: t.accent, color: t.on }}>
                Hold Ctrl + Win to talk
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  ArrowUpRight,
  BarChart3,
  Clipboard,
  ClipboardPaste,
  Cloud,
  Copy,
  Database,
  Eraser,
  Gauge,
  History,
  Info,
  Keyboard,
  Mic,
  Minus,
  NotebookPen,
  Palette,
  Radio,
  Settings,
  ShieldCheck,
  Square,
  X,
  type LucideIcon,
} from "lucide-react";
import s from "@/components/ThemePreview.module.css";

/**
 * Scribe's Dashboard as the app draws it, in each built-in theme. The layout,
 * labels, icons and sizes are the app's own (scribe-app/app/src: App.tsx's
 * shell and sidebar, views/Dashboard.tsx, components/layout.tsx and
 * transcript.tsx, the default hotkeys in settings.rs), and every colour is the
 * theme's --scribe-* token from App.css. The transcript and model in the
 * picture are examples.
 */

type Tokens = {
  bg: string;
  "bg-elevated": string;
  "sidebar-bg": string;
  "card-top": string;
  "card-bottom": string;
  "glow-1": string;
  "glow-2": string;
  border: string;
  "surface-rgb": string;
  "surface-solid": string;
  "surface-kbd": string;
  accent: string;
  "accent-strong": string;
  "accent-bright": string;
  "accent-on": string;
  "accent-soft": string;
  "accent-glow": string;
  "accent-ring": string;
  text: string;
  "text-secondary": string;
  "text-muted": string;
  "text-faint": string;
};

// From App.css, theme by theme. "Pewter" is the light theme (its key is "daylight").
const THEMES: { name: string; t: Tokens }[] = [
  {
    name: "Midnight",
    t: { bg: "#070b14", "bg-elevated": "#0d1320", "sidebar-bg": "rgba(13, 19, 32, 0.86)", "card-top": "rgba(23, 32, 51, 0.82)", "card-bottom": "rgba(13, 19, 32, 0.92)", "glow-1": "rgba(34, 211, 238, 0.11)", "glow-2": "rgba(139, 92, 246, 0.1)", border: "rgba(148, 163, 184, 0.18)", "surface-rgb": "7, 11, 20", "surface-solid": "#111827", "surface-kbd": "#070b14", accent: "#22d3ee", "accent-strong": "#38bdf8", "accent-bright": "#67e8f9", "accent-on": "#06111f", "accent-soft": "rgba(34, 211, 238, 0.24)", "accent-glow": "rgba(34, 211, 238, 0.08)", "accent-ring": "rgba(34, 211, 238, 0.12)", text: "#f8fafc", "text-secondary": "#cbd5e1", "text-muted": "#94a3b8", "text-faint": "#64748b" },
  },
  {
    name: "Ocean",
    t: { bg: "#04141c", "bg-elevated": "#0a2230", "sidebar-bg": "rgba(10, 34, 48, 0.88)", "card-top": "rgba(15, 48, 66, 0.82)", "card-bottom": "rgba(8, 28, 40, 0.92)", "glow-1": "rgba(45, 212, 191, 0.14)", "glow-2": "rgba(56, 189, 248, 0.12)", border: "rgba(125, 211, 252, 0.2)", "surface-rgb": "7, 11, 20", "surface-solid": "#111827", "surface-kbd": "#070b14", accent: "#2dd4bf", "accent-strong": "#38bdf8", "accent-bright": "#5eead4", "accent-on": "#042029", "accent-soft": "rgba(45, 212, 191, 0.26)", "accent-glow": "rgba(45, 212, 191, 0.1)", "accent-ring": "rgba(45, 212, 191, 0.14)", text: "#ecfeff", "text-secondary": "#bae6fd", "text-muted": "#7dd3fc", "text-faint": "#5b8aa3" },
  },
  {
    name: "Slate",
    t: { bg: "#0b0e14", "bg-elevated": "#151a23", "sidebar-bg": "rgba(21, 26, 35, 0.9)", "card-top": "rgba(33, 40, 54, 0.82)", "card-bottom": "rgba(18, 23, 31, 0.92)", "glow-1": "rgba(129, 140, 248, 0.1)", "glow-2": "rgba(148, 163, 184, 0.08)", border: "rgba(148, 163, 184, 0.2)", "surface-rgb": "7, 11, 20", "surface-solid": "#111827", "surface-kbd": "#070b14", accent: "#818cf8", "accent-strong": "#a5b4fc", "accent-bright": "#c7d2fe", "accent-on": "#0d1020", "accent-soft": "rgba(129, 140, 248, 0.26)", "accent-glow": "rgba(129, 140, 248, 0.1)", "accent-ring": "rgba(129, 140, 248, 0.14)", text: "#f1f5f9", "text-secondary": "#cbd5e1", "text-muted": "#94a3b8", "text-faint": "#64748b" },
  },
  {
    name: "Emerald",
    t: { bg: "#05140d", "bg-elevated": "#0a2117", "sidebar-bg": "rgba(8, 32, 22, 0.88)", "card-top": "rgba(13, 48, 33, 0.82)", "card-bottom": "rgba(7, 28, 19, 0.92)", "glow-1": "rgba(52, 211, 153, 0.14)", "glow-2": "rgba(16, 185, 129, 0.1)", border: "rgba(110, 231, 183, 0.2)", "surface-rgb": "7, 11, 20", "surface-solid": "#111827", "surface-kbd": "#070b14", accent: "#10b981", "accent-strong": "#34d399", "accent-bright": "#6ee7b7", "accent-on": "#03130c", "accent-soft": "rgba(16, 185, 129, 0.26)", "accent-glow": "rgba(16, 185, 129, 0.1)", "accent-ring": "rgba(16, 185, 129, 0.14)", text: "#ecfdf5", "text-secondary": "#bbf7d0", "text-muted": "#86c5a3", "text-faint": "#6fa087" },
  },
  {
    name: "Violet",
    t: { bg: "#0c0a1a", "bg-elevated": "#181233", "sidebar-bg": "rgba(24, 18, 51, 0.9)", "card-top": "rgba(40, 30, 74, 0.82)", "card-bottom": "rgba(20, 15, 40, 0.92)", "glow-1": "rgba(167, 139, 250, 0.14)", "glow-2": "rgba(217, 70, 239, 0.1)", border: "rgba(196, 181, 253, 0.2)", "surface-rgb": "7, 11, 20", "surface-solid": "#111827", "surface-kbd": "#070b14", accent: "#8b5cf6", "accent-strong": "#a78bfa", "accent-bright": "#c4b5fd", "accent-on": "#100b20", "accent-soft": "rgba(167, 139, 250, 0.26)", "accent-glow": "rgba(167, 139, 250, 0.1)", "accent-ring": "rgba(167, 139, 250, 0.14)", text: "#f5f3ff", "text-secondary": "#ddd6fe", "text-muted": "#a99fce", "text-faint": "#8b80b4" },
  },
  {
    name: "Pewter",
    t: { bg: "#d6dadf", "bg-elevated": "#e8ebef", "sidebar-bg": "rgba(232, 235, 239, 0.92)", "card-top": "rgba(255, 255, 255, 0.7)", "card-bottom": "rgba(232, 235, 239, 0.9)", "glow-1": "rgba(7, 89, 133, 0.06)", "glow-2": "rgba(71, 85, 105, 0.05)", border: "rgba(31, 41, 55, 0.14)", "surface-rgb": "214, 218, 223", "surface-solid": "#cdd2d8", "surface-kbd": "#e2e6ea", accent: "#075985", "accent-strong": "#0c4a6e", "accent-bright": "#0369a1", "accent-on": "#f8fafc", "accent-soft": "rgba(7, 89, 133, 0.18)", "accent-glow": "rgba(7, 89, 133, 0.08)", "accent-ring": "rgba(7, 89, 133, 0.16)", text: "#1f2937", "text-secondary": "#374151", "text-muted": "#4b5563", "text-faint": "#525c6a" },
  },
];

// App.tsx's sidebar, in order.
const NAV: { label: string; Icon: LucideIcon }[] = [
  { label: "Dashboard", Icon: Gauge },
  { label: "Transcribe", Icon: Mic },
  { label: "History", Icon: History },
  { label: "Notes", Icon: NotebookPen },
  { label: "Sync", Icon: Cloud },
  { label: "Stats", Icon: BarChart3 },
  { label: "Settings", Icon: Settings },
  { label: "Data & Privacy", Icon: ShieldCheck },
  { label: "Hotkeys", Icon: Keyboard },
  { label: "Models", Icon: Database },
  { label: "Audio", Icon: Radio },
  { label: "Themes", Icon: Palette },
  { label: "About", Icon: Info },
];

// The Dashboard's four status cards (views/Dashboard.tsx), with example values.
const STATUS: { label: string; value: string; Icon: LucideIcon; dot?: boolean }[] = [
  { label: "Status", value: "Ready for dictation", Icon: Gauge },
  { label: "Active mic", value: "Microphone (USB Audio)", Icon: Mic, dot: true },
  { label: "Active model", value: "small.en-q5_1", Icon: Database },
  { label: "Auto-insert", value: "On", Icon: Clipboard },
];

// The default hotkeys (settings.rs), as the app's Hotkeys card lists them.
const HOTKEYS: [string, string][] = [
  ["Hold-to-Talk", "Ctrl + Win"],
  ["Toggle Dictation", "~ (tilde)"],
  ["Paste Last", "Ctrl + Alt + V"],
  ["Open Dashboard", "Ctrl + Alt + F"],
  ["Discard / Cancel", "Ctrl + Alt + X"],
  ["Transform Selection", "Ctrl + Alt + R"],
];

const WIDTH = 900;
const HEIGHT = 560;

function vars(t: Tokens): CSSProperties {
  return Object.fromEntries(Object.entries(t).map(([k, v]) => [`--s-${k}`, v])) as CSSProperties;
}

export function ThemePreview() {
  const [pick, setPick] = useState(0);
  const frame = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // Laid out at the app's own width, then scaled to fit the column.
  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    const fit = () => setScale(Math.min(1, el.clientWidth / WIDTH));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const theme = THEMES[pick];
  return (
    <div>
      <div role="radiogroup" aria-label="Preview a theme" className="flex flex-wrap justify-center gap-2">
        {THEMES.map((th, i) => (
          <button
            key={th.name}
            type="button"
            role="radio"
            aria-checked={i === pick}
            onClick={() => setPick(i)}
            className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan ${
              i === pick ? "border-cyan/60 bg-card-2 text-ink" : "border-edge bg-card/60 text-mute hover:border-edge-strong hover:text-ink"
            }`}
          >
            <span
              className="h-3.5 w-3.5 rounded-full ring-1 ring-white/20"
              style={{ background: `linear-gradient(135deg, ${th.t.bg} 50%, ${th.t.accent} 50%)` }}
            />
            {th.name}
          </button>
        ))}
      </div>

      <div ref={frame} className="mx-auto mt-6 max-w-[900px]" style={{ height: HEIGHT * scale }}>
        <div
          role="img"
          aria-label={`Scribe's Dashboard in the ${theme.name} theme`}
          className={`${s.window} origin-top-left shadow-2xl shadow-black/40`}
          style={{ ...vars(theme.t), transform: `scale(${scale})`, width: WIDTH, height: HEIGHT }}
        >
          <div className={s.titlebar}>
            <span className={s.titlebarBrand}>Scribe</span>
            <span className={s.titlebarButtons} aria-hidden="true">
              <span>
                <Minus size={13} />
              </span>
              <span>
                <Square size={11} />
              </span>
              <span>
                <X size={13} />
              </span>
            </span>
          </div>
          <div className={s.body}>
            <div className={s.sidebar}>
              <div className={s.brand}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className={s.brandMark} src="/scribe-icon.png" alt="" />
                <div>
                  <div className={s.brandName}>Scribe</div>
                  <div className={s.brandSubtitle}>Private local dictation</div>
                </div>
              </div>
              <div className={s.nav}>
                {NAV.map(({ label, Icon }, i) => (
                  <span key={label} className={`${s.navItem} ${i === 0 ? s.active : ""}`}>
                    <Icon size={15} />
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <div className={s.main}>
              <div className={s.topbar}>
                <h3>Dashboard</h3>
                <div className={s.actions}>
                  <span className={`${s.button} ${s.secondary}`}>
                    <History size={14} />
                    History
                  </span>
                  <span className={`${s.button} ${s.primary}`}>
                    <Mic size={14} />
                    Start
                  </span>
                </div>
              </div>

              <div className={s.statusGrid}>
                {STATUS.map(({ label, value, Icon, dot }) => (
                  <div key={label} className={`${s.card} ${s.statusCard}`}>
                    <span className={s.statusIcon}>
                      <Icon size={17} />
                    </span>
                    <span className={s.statusMain}>
                      <span className={s.statusLabel}>{label}</span>
                      <strong>{value}</strong>
                    </span>
                    {dot && <span className={s.dot} />}
                    <ArrowUpRight size={15} className={s.statusGo} />
                  </div>
                ))}
              </div>

              <div className={s.mainGrid}>
                <div className={`${s.card} ${s.panel}`}>
                  <div className={s.heading}>
                    <div>
                      <p className={s.eyebrow}>Last Transcript Buffer</p>
                      <h4>Ready to insert later</h4>
                    </div>
                    <span className={s.pill}>Clipboard restored</span>
                  </div>
                  <p className={s.transcript}>Thursday works for me. I&apos;ll send the invite this afternoon.</p>
                  <div className={s.meta}>
                    <span>10 words</span>
                    <span>61 chars</span>
                    <span>3.2 s</span>
                    <span>small.en-q5_1</span>
                  </div>
                  <div className={s.iconRow}>
                    {[ClipboardPaste, Copy, Eraser].map((Icon, i) => (
                      <span key={i} className={s.iconButton}>
                        <Icon size={15} />
                      </span>
                    ))}
                  </div>
                </div>

                <div className={`${s.card} ${s.panel}`}>
                  <div className={s.heading}>
                    <h4>Hotkeys</h4>
                    <span className={`${s.button} ${s.ghost}`}>
                      <Keyboard size={15} />
                      Rebind
                    </span>
                  </div>
                  <div className={s.hotkeys}>
                    {HOTKEYS.map(([label, keys]) => (
                      <div key={label} className={s.hotkeyRow}>
                        <span>{label}</span>
                        <kbd className={s.kbd}>{keys}</kbd>
                      </div>
                    ))}
                  </div>
                </div>

                {/* The Dashboard's third card (views/Dashboard.tsx), running off the window's foot as it does in the app */}
                <div className={`${s.card} ${s.panel}`}>
                  <div className={s.heading}>
                    <h4>Transform selection</h4>
                    <span className={s.muted}>Ctrl + Alt + R</span>
                  </div>
                  <p className={s.muted} style={{ margin: "6px 0 8px" }}>
                    Highlight text in any app, describe the change, and Scribe rewrites it in place with your local LLM.
                  </p>
                  <div className={s.textarea}>e.g. make this concise, translate to Spanish, fix grammar</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import {
  Archive,
  ArrowUpRight,
  BarChart3,
  Check,
  ChevronDown,
  Clipboard,
  ClipboardPaste,
  Cloud,
  Copy,
  Database,
  Download,
  Eraser,
  ExternalLink,
  Gauge,
  HardDrive,
  History,
  Info,
  Keyboard,
  Layers,
  ListChecks,
  Mic,
  Minus,
  NotebookPen,
  Palette,
  Pause,
  Play,
  Radio,
  Search,
  Settings,
  ShieldCheck,
  Square,
  Trash2,
  X,
  type LucideIcon,
} from "lucide-react";
import s from "@/components/ThemePreview.module.css";

/**
 * A short, looping tour of Scribe's window, like a GIF: a cursor moves to the
 * sidebar and the view changes Dashboard, History, Models, Themes (where it
 * switches theme live), then back. The layout, labels, icons and sizes are the
 * app's own (scribe-app/app/src: App.tsx's shell and sidebar, views/Dashboard,
 * History, Models and Themes, components/transcript.tsx, the default hotkeys in
 * settings.rs, the model catalog in models.rs), and every colour is the theme's
 * --scribe-* token from App.css. The transcripts and what is downloaded are
 * examples. It plays only while on screen, pauses on request (and when you pick
 * a theme), and stays still under reduced motion.
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
  const light = t.bg === "#d6dadf";
  const status = light
    ? { success: "#166534", info: "#1e40af", danger: "#991b1b" }
    : { success: "#86efac", info: "#bfdbfe", danger: "#fca5a5" };
  return Object.fromEntries([...Object.entries(t), ...Object.entries(status)].map(([k, v]) => [`--s-${k}`, v])) as CSSProperties;
}

type View = "Dashboard" | "History" | "Models" | "Themes";

// Theme cards as views/Themes.tsx lists them (name, description, swatches).
const THEME_CARDS: { name: string; blurb: string; swatches: string[] }[] = [
  { name: "Midnight", blurb: "The classic deep navy with a cyan accent.", swatches: ["#070b14", "#0d1320", "#22d3ee", "#38bdf8", "#f8fafc"] },
  { name: "Ocean", blurb: "Teal-leaning depths with a bright sky-blue accent.", swatches: ["#04141c", "#0a2230", "#2dd4bf", "#38bdf8", "#ecfeff"] },
  { name: "Slate", blurb: "Neutral graphite with a soft indigo accent.", swatches: ["#0b0e14", "#151a23", "#818cf8", "#a5b4fc", "#f1f5f9"] },
  { name: "Emerald", blurb: "Dark forest ground with a vivid green accent.", swatches: ["#05140d", "#0a2117", "#10b981", "#34d399", "#ecfdf5"] },
  { name: "Violet", blurb: "Deep plum with a luminous purple accent.", swatches: ["#0c0a1a", "#181233", "#a78bfa", "#c084fc", "#f5f3ff"] },
  { name: "Pewter", blurb: "A calm, muted light theme, soft pewter-gray surfaces, easy on the eyes.", swatches: ["#d6dadf", "#e8ebef", "#075985", "#0c4a6e", "#1f2937"] },
];

// History rows (views/History.tsx, components/transcript.tsx); the text is an example.
const HISTORY: { date: string; text: string; meta: string }[] = [
  { date: "Oct 27, 2026, 2:14 PM", text: "Thursday works for me. I'll send the invite this afternoon.", meta: "10 words | small.en-q5_1 | 3.2s audio" },
  { date: "Oct 27, 2026, 11:02 AM", text: "Can you check the launch checklist before standup? The screenshots still need one more pass.", meta: "15 words | small.en-q5_1 | 5.1s audio" },
  { date: "Oct 26, 2026, 4:47 PM", text: "Remind me to renew the domain and send Maya the new timeline.", meta: "12 words | small.en-q5_1 | 4.0s audio" },
];

// A few of the model catalog's rows (views/Models.tsx, models.rs), with the app's own labels.
const MODEL_ROWS: { name: string; size: string; langs: string; file: string; active?: boolean }[] = [
  { name: "Tiny English", size: "75 MiB", langs: "English-only", file: "ggml-tiny.en.bin" },
  { name: "Base English", size: "142 MiB", langs: "English-only", file: "ggml-base.en.bin" },
  { name: "Small English Q5_1", size: "181 MiB", langs: "English-only", file: "ggml-small.en-q5_1.bin", active: true },
  { name: "Small English", size: "466 MiB", langs: "English-only", file: "ggml-small.en.bin" },
  { name: "Large v3 Turbo Q5_0 (Multilingual)", size: "547 MiB", langs: "Multilingual", file: "ggml-large-v3-turbo-q5_0.bin" },
];

function DashboardView() {
  return (
    <>
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
    </>
  );
}

function HistoryView() {
  return (
    <div className={s.stack}>
      <div className={`${s.card} ${s.panel}`}>
        <div className={s.toolbar}>
          <div className={s.search}>
            <Search size={14} />
            <span>Search transcripts</span>
          </div>
          <span className={`${s.button} ${s.secondary} ${s.danger}`}>
            <Trash2 size={14} />
            Clear all
          </span>
          <span className={`${s.button} ${s.outline}`}>
            <Settings size={14} />
            Settings
          </span>
        </div>
        <div className={`${s.toolbar} ${s.filters}`}>
          {[
            ["From", "mm/dd/yyyy"],
            ["To", "mm/dd/yyyy"],
            ["Sort", "Newest"],
          ].map(([label, value]) => (
            <span key={label} className={s.filter}>
              <span className={s.filterLabel}>{label}</span>
              <span className={s.field}>{value}</span>
            </span>
          ))}
          <span className={`${s.button} ${s.secondary} ${s.disabled}`} style={{ marginLeft: "auto" }}>
            <Layers size={14} />
            Combine (0)
          </span>
        </div>
      </div>

      <div className={`${s.card} ${s.panel}`}>
        <div className={s.heading}>
          <span className={s.selectAll}>
            <ListChecks size={14} />
            Select all
          </span>
          <h4 className={s.headingTitle}>
            <Archive size={15} />
            Transcript archive
          </h4>
          <span className={s.muted}>1-3 of 128 local records</span>
        </div>
        <div className={s.rows}>
          {HISTORY.map((r) => (
            <div key={r.date} className={s.row}>
              <span className={s.checkbox} />
              <div className={s.rowBody}>
                <span className={s.rowDate}>{r.date}</span>
                <p className={s.rowText}>{r.text}</p>
                <span className={s.rowMeta}>{r.meta}</span>
              </div>
              <div className={s.rowActions}>
                {[Play, Copy, ExternalLink, ClipboardPaste, Trash2].map((Icon, i) => (
                  <span key={i} className={`${s.iconButton} ${s.small}`}>
                    <Icon size={14} />
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className={s.pagination}>
          <span className={`${s.button} ${s.secondary} ${s.disabled}`}>Previous</span>
          <span className={`${s.button} ${s.secondary}`}>Next</span>
        </div>
      </div>
    </div>
  );
}

function ModelsView() {
  return (
    <div className={s.stack}>
      <div className={`${s.card} ${s.panel}`}>
        <div className={s.summary}>
          <div className={s.summaryItem}>
            <span className={s.summaryLabel}>Active model</span>
            <strong>Small English Q5_1</strong>
            <span className={s.muted}>Ready for dictation</span>
          </div>
          <div className={s.summaryItem}>
            <span className={s.summaryLabel}>Storage used</span>
            <strong>181 MiB</strong>
            <span className={s.muted}>1 model downloaded</span>
          </div>
        </div>
      </div>

      <div className={`${s.card} ${s.panel}`}>
        <div className={s.accordion}>
          <span className={s.accordionLabel}>
            <HardDrive size={14} />
            Browse models
          </span>
          <span className={s.accordionMeta}>
            <span className={s.muted}>1 of 11 downloaded</span>
            <ChevronDown size={15} />
          </span>
        </div>
        <div className={s.modelTable}>
          {MODEL_ROWS.map((m) => (
            <div key={m.name} className={`${s.modelRow} ${m.active ? s.modelActive : ""}`}>
              <span className={`${s.radio} ${m.active ? s.radioOn : ""}`} />
              <div className={s.modelMain}>
                <strong>{m.name}</strong>
                <span className={s.rowMeta}>
                  {m.size} &middot; {m.langs} &middot; {m.file}
                </span>
              </div>
              {m.active ? (
                <span className={s.activePill}>
                  <Check size={11} />
                  Active
                </span>
              ) : (
                <>
                  <span className={s.rowMeta}>Not downloaded</span>
                  <span className={`${s.button} ${s.secondary}`}>
                    <Download size={14} />
                    Download
                  </span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ThemesView({ pick, aim }: { pick: number; aim: string | null }) {
  return (
    <div className={`${s.card} ${s.panel}`}>
      <div className={s.heading}>
        <h4 className={s.headingTitle}>
          <Palette size={15} />
          Color theme
        </h4>
      </div>
      <p className={s.muted} style={{ margin: "6px 0 4px" }}>
        Choose a color theme for the main window. The floating pill keeps its own colors (set those in Audio &rarr; Pill).
      </p>
      <div className={s.themeGrid}>
        {THEME_CARDS.map((c, i) => (
          <div key={c.name} data-theme-card={i} className={`${s.themeCard} ${i === pick ? s.themeActive : ""} ${aim === `theme-${i}` ? s.aimed : ""}`}>
            <div className={s.swatches}>
              {c.swatches.map((color, j) => (
                <span key={j} className={s.chip} style={{ background: color }} />
              ))}
            </div>
            <div className={s.themeBody}>
              <strong>{c.name}</strong>
              <small>{c.blurb}</small>
            </div>
            {i === pick && (
              <span className={s.themeCheck}>
                <Check size={13} />
              </span>
            )}
          </div>
        ))}
        <div className={s.themeCard}>
          <div className={s.swatches}>
            {["#0b1020", "#141b2e", "#22d3ee", "#f8fafc", "#94a3b8"].map((color) => (
              <span key={color} className={s.chip} style={{ background: color }} />
            ))}
          </div>
          <div className={s.themeBody}>
            <strong>Custom</strong>
            <small>Your own palette from five core colors.</small>
          </div>
        </div>
      </div>
    </div>
  );
}

// The tour: each step moves the cursor to something, clicks it, and holds.
type Step = { reset?: boolean; go?: View; theme?: number; hold: number };
const TOUR: Step[] = [
  { reset: true, hold: 2600 },
  { go: "History", hold: 2800 },
  { go: "Models", hold: 2800 },
  { go: "Themes", hold: 1000 },
  { theme: 3, hold: 1500 },
  { theme: 4, hold: 1500 },
  { theme: 5, hold: 1900 },
  { go: "Dashboard", hold: 2800 },
];

/** A point inside the window (its own, unscaled pixels) at a share of an element's box. */
function pointOf(win: HTMLElement, selector: string, fx: number, fy: number) {
  const el = win.querySelector<HTMLElement>(selector);
  if (!el) return null;
  let x = 0;
  let y = 0;
  for (let n: HTMLElement | null = el; n && n !== win; n = n.offsetParent as HTMLElement | null) {
    x += n.offsetLeft;
    y += n.offsetTop;
  }
  return { x: x + el.offsetWidth * fx, y: y + el.offsetHeight * fy };
}

export function ThemePreview() {
  const [pick, setPick] = useState(0);
  const [view, setView] = useState<View>("Dashboard");
  const [paused, setPaused] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);
  const [pressed, setPressed] = useState(false);
  const [aim, setAim] = useState<string | null>(null);
  const frame = useRef<HTMLDivElement>(null);
  const win = useRef<HTMLDivElement>(null);
  const step = useRef(0);
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

  // Reduced motion shows a still; otherwise the tour plays only while on screen.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    const el = frame.current;
    if (!el) return () => mq.removeEventListener("change", sync);
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => {
      mq.removeEventListener("change", sync);
      io.disconnect();
    };
  }, []);

  const playing = onScreen && !paused && !reduced;

  useEffect(() => {
    if (!playing) return;
    let cancelled = false;
    const timers = new Set<number>();
    const sleep = (ms: number) =>
      new Promise<void>((resolve) => {
        const t = window.setTimeout(() => {
          timers.delete(t);
          resolve();
        }, ms);
        timers.add(t);
      });

    (async () => {
      while (!cancelled) {
        const w = win.current;
        if (!w) return;
        const st = TOUR[step.current];
        setAim(null);
        if (st.reset) {
          setPick(0);
          setView("Dashboard");
          setCursor({ x: 540, y: 330 });
        } else {
          const key = st.go ? `nav-${st.go}` : `theme-${st.theme}`;
          const to = st.go ? pointOf(w, `[data-nav="${st.go}"]`, 0.35, 0.5) : pointOf(w, `[data-theme-card="${st.theme}"]`, 0.6, 0.55);
          if (to) setCursor(to);
          await sleep(900);
          if (cancelled) return;
          setAim(key);
          await sleep(220);
          if (cancelled) return;
          setPressed(true);
          await sleep(170);
          if (cancelled) return;
          if (st.go) setView(st.go);
          else if (st.theme !== undefined) setPick(st.theme);
          setPressed(false);
        }
        await sleep(st.hold);
        if (cancelled) return;
        step.current = (step.current + 1) % TOUR.length;
      }
    })();

    return () => {
      cancelled = true;
      timers.forEach((t) => window.clearTimeout(t));
      setPressed(false);
    };
  }, [playing]);

  // Picking a theme yourself stops the tour on it, in the app's Themes view.
  const choose = useCallback((i: number) => {
    setPaused(true);
    setAim(null);
    setPick(i);
    setView("Themes");
  }, []);

  const theme = THEMES[pick];
  return (
    <div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <div role="radiogroup" aria-label="Preview a theme" className="flex flex-wrap justify-center gap-2">
          {THEMES.map((th, i) => (
            <button
              key={th.name}
              type="button"
              role="radio"
              aria-checked={i === pick}
              onClick={() => choose(i)}
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
        {!reduced && (
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? "Play the tour" : "Pause the tour"}
            className="inline-flex h-9 items-center gap-1.5 rounded-full border border-edge bg-card/60 px-3.5 text-sm font-semibold text-mute transition hover:border-edge-strong hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
          >
            {paused ? <Play className="h-3.5 w-3.5" aria-hidden="true" /> : <Pause className="h-3.5 w-3.5" aria-hidden="true" />}
            {paused ? "Play tour" : "Pause"}
          </button>
        )}
      </div>

      <div ref={frame} className="mx-auto mt-6 max-w-[900px]" style={{ height: HEIGHT * scale }}>
        <div
          ref={win}
          role="img"
          aria-label={`Scribe's ${view} view in the ${theme.name} theme. A tour of the app: Dashboard, History, Models, then Themes.`}
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
                {NAV.map(({ label, Icon }) => (
                  <span
                    key={label}
                    data-nav={label}
                    className={`${s.navItem} ${label === view ? s.active : ""} ${aim === `nav-${label}` ? s.aimed : ""}`}
                  >
                    <Icon size={15} />
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <div className={s.main}>
              <div className={s.topbar}>
                <h3>{view}</h3>
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
              <div key={view} className={s.view}>
                {view === "Dashboard" && <DashboardView />}
                {view === "History" && <HistoryView />}
                {view === "Models" && <ModelsView />}
                {view === "Themes" && <ThemesView pick={pick} aim={aim} />}
              </div>
            </div>
          </div>

          {cursor && !reduced && (
            <span aria-hidden="true" className={s.cursor} style={{ transform: `translate(${cursor.x}px, ${cursor.y}px)` }}>
              <span className={`${s.ripple} ${pressed ? s.rippleOn : ""}`} />
              <svg width="20" height="24" viewBox="0 0 20 24" className={`${s.pointer} ${pressed ? s.pointerDown : ""}`}>
                <path d="M2 1.5v17l4.6-4.2 3.1 7 3-1.4-3-6.8H17z" fill="#fff" stroke="#0b1020" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

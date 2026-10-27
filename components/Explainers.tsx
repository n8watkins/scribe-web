import {
  BookA,
  CalendarClock,
  ClipboardPaste,
  Combine,
  FileAudio,
  FileDown,
  FolderGit2,
  Hand,
  Languages,
  NotebookPen,
  Power,
  Scissors,
  Timer,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { GitHubIcon, Icon, OpenAIIcon } from "@/components/Icons";
import { AIExample } from "@/components/AIExample";
import { ThemePreview } from "@/components/ThemePreview";
import { GITHUB_URL, type IconName } from "@/lib/site";

// The page's middle: where your voice goes, the optional local AI, the models,
// the themes, and the rest. Every fact here comes from the app's source
// (models.rs, App.css themes, note_analysis.rs, selection_transform.rs,
// lib/updates.ts); see docs/scribe-review-and-videos.md before changing one.

function Head({ eyebrow, title, line }: { eyebrow: string; title: React.ReactNode; line?: React.ReactNode }) {
  return (
    <div data-reveal className="mx-auto max-w-2xl text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan">{eyebrow}</p>
      <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {line && <p className="mt-4 text-pretty text-mute">{line}</p>}
    </div>
  );
}

/** The arrow between two steps, with a dot running along it in time with the glow. */
function Arrow({ delay }: { delay: string }) {
  return (
    <span aria-hidden="true" className="relative flex items-center justify-center text-faint">
      <span className="absolute inset-x-1/2 top-0 h-full w-0 md:inset-x-0 md:top-1/2 md:h-0 md:w-full">
        <span
          className="flow-dot absolute left-[-3px] h-1.5 w-1.5 rounded-full bg-green shadow-[0_0_10px_var(--color-green)] [animation:flow-dot-y_4.5s_linear_infinite] md:top-[-3px] md:left-auto md:[animation:flow-dot-x_4.5s_linear_infinite]"
          style={{ animationDelay: delay, opacity: 0 }}
        />
      </span>
      <svg viewBox="0 0 24 24" className="h-5 w-5 rotate-90 md:rotate-0" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </span>
  );
}

function Node({ icon, title, sub, delay }: { icon: IconName; title: string; sub: string; delay: string }) {
  return (
    <div
      className="flow-node flex flex-1 items-center gap-3 rounded-xl border border-edge bg-card px-4 py-3.5 md:flex-col md:text-center"
      style={{ animationDelay: delay }}
    >
      <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green/10 text-green">
        {icon === "mic" && <span aria-hidden="true" className="flow-ring absolute inset-0 rounded-xl border border-green/50" />}
        <span className="flow-icon">
          <Icon name={icon} />
        </span>
      </span>
      <span>
        <span className="block font-semibold text-ink">{title}</span>
        <span className="block text-sm text-mute">{sub}</span>
      </span>
    </div>
  );
}

// The only things that go online, each with when it happens.
const ONLINE: { icon: IconName; what: string; when: string }[] = [
  { icon: "refresh", what: "Update checks", when: "At start, when you come back to it, and every 6 hours. Can be turned off." },
  { icon: "cloudDown", what: "Model download", when: "Once, when you pick a model, and checked against its known SHA-256 hash." },
  { icon: "github", what: "GitHub backup", when: "Off until you connect it." },
  { icon: "spark", what: "Online AI", when: "Only if you point the AI tools at one." },
];

export function PrivacyFlow() {
  return (
    <section id="private-by-design" className="sep-band sep-arc-green scroll-mt-20">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <Head eyebrow="Private by design" title={<>Your voice stays <span className="gradient-text">on your PC</span></>} />

        {/* The PC as a box: voice in, text out, history kept, all inside it */}
        <div data-reveal className="relative mt-12 rounded-3xl border-2 border-dashed border-green/40 bg-green/[0.03] px-5 pt-10 pb-6 sm:px-8">
          <p className="absolute -top-3.5 left-6 flex items-center gap-2 rounded-full border border-green/40 bg-bg px-3 py-1 text-sm font-semibold text-green">
            <Icon name="monitor" className="h-4 w-4" />
            Your PC
          </p>
          <div className="flex flex-col gap-3 md:flex-row md:items-stretch">
            <Node icon="mic" title="Your voice" sub="Recorded here" delay="0s" />
            <Arrow delay="1.1s" />
            <Node icon="chip" title="Speech model" sub="Turns it into text, offline" delay="1.5s" />
            <Arrow delay="2.6s" />
            <Node icon="keyboard" title="Your cursor" sub="The words land here" delay="3s" />
          </div>
          <p className="mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-sm text-mute">
            <Icon name="history" className="h-4 w-4 text-green" />
            Your history and recordings are kept here too, for as long as you choose.
          </p>
        </div>

        {/* What goes out, and when */}
        <div data-reveal className="mt-10">
          <p className="text-center text-sm font-semibold text-ink">What goes online, and when</p>
          <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {ONLINE.map((o) => (
              <li key={o.what} className="rounded-xl border border-edge bg-card/70 p-4 transition duration-300 hover:-translate-y-0.5 hover:border-cyan/40 hover:bg-card">
                <p className="flex items-center gap-2 font-semibold text-ink">
                  <Icon name={o.icon} className="h-4 w-4 text-cyan" />
                  {o.what}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-mute">{o.when}</p>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 text-sm text-mute sm:flex-row">
            <span>Never your audio. No account, no tracking.</span>
            <a
              href={GITHUB_URL}
              className="inline-flex items-center gap-2 rounded-full border border-edge-strong bg-card px-3.5 py-1.5 font-semibold text-ink transition hover:border-cyan/60"
            >
              <GitHubIcon className="h-4 w-4" />
              Check the code: n8watkins/scribe
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/** The words beside an example: eyebrow, title, a line, then any extras. */
function SplitCopy({ eyebrow, title, line, children }: { eyebrow: string; title: React.ReactNode; line: React.ReactNode; children?: React.ReactNode }) {
  return (
    <div data-reveal>
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan">{eyebrow}</p>
      <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      <p className="mt-4 text-pretty leading-relaxed text-mute">{line}</p>
      {children}
    </div>
  );
}

// Two sections, one per local-AI tool, each with an example that loops like a
// GIF while it's on screen; the second starts later so the two never play in step.
export function LocalAI() {
  return (
    <>
      <section id="local-ai" className="sep-glow mx-auto grid max-w-6xl scroll-mt-20 items-center gap-10 px-6 py-20 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <SplitCopy
          eyebrow="Optional · local AI"
          title={<>Rewrite anything <span className="gradient-text">you highlight</span></>}
          line={
            <>
              Select text in any app, press <span className="font-mono text-ink">Ctrl + Alt + R</span> and say what to change. Scribe
              swaps in the rewrite and puts your clipboard back.
            </>
          }
        >
          <div className="mt-6 rounded-xl border border-edge bg-card/60 p-4 text-sm leading-relaxed text-mute">
            <p className="flex items-center gap-2 font-semibold text-ink">
              <Icon name="chip" className="h-4 w-4 text-cyan" />
              The AI runs on your PC too
            </p>
            <p className="mt-1.5">
              Scribe hands the text to LM Studio or Ollama, free apps that run AI models on your own computer. Install one and turn
              the AI tools on in Scribe; until then they stay off.
            </p>
          </div>
        </SplitCopy>
        <div data-reveal>
          <AIExample
            context="hey so i think we should push the launch, screenshots arent done and the copy needs another pass"
            sayLabel="You say"
            say="Make this clear and professional."
            get="Let's move the launch date. The screenshots aren't finished, and the copy needs one more review."
          />
        </div>
      </section>

      <section id="note-summaries" className="sep-band sep-arc scroll-mt-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div data-reveal className="md:order-first">
            <AIExample
              sayLabel="Your note"
              say="ok so tomorrow I need to send Maya the new timeline, go over the homepage copy, and um book the dentist before Friday"
              get="Plans for tomorrow."
              bullets={["Send Maya the new timeline", "Review the homepage copy", "Book the dentist before Friday"]}
              startDelay={2400}
            />
          </div>
          <SplitCopy
            eyebrow="Optional · local AI"
            title={<>Turn a ramble into <span className="gradient-text">a to-do list</span></>}
            line="Dictate a quick note, then one click gives you a summary and its action items. You can change what it asks for, and it uses the same AI on your PC."
          />
        </div>
      </section>
    </>
  );
}

// The Whisper models in the app's catalog (models.rs), smallest first.
const MODELS: { name: string; size: string; mb: number; langs: string; isDefault?: boolean }[] = [
  { name: "Tiny", size: "78 MB", mb: 78, langs: "English or multilingual" },
  { name: "Base", size: "148 MB", mb: 148, langs: "English or multilingual" },
  { name: "Small, compressed", size: "190 MB", mb: 190, langs: "English", isDefault: true },
  { name: "Small", size: "488 MB", mb: 488, langs: "English or multilingual" },
  { name: "Large v3 Turbo, compressed", size: "574 MB", mb: 574, langs: "Multilingual" },
  { name: "Medium", size: "1.5 GB", mb: 1534, langs: "English or multilingual" },
  { name: "Large v3 Turbo", size: "1.6 GB", mb: 1625, langs: "Multilingual, most accurate" },
];

export function Models() {
  return (
    <section id="models" className="sep-glow scroll-mt-20">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <Head
          eyebrow="Models"
          title="Pick the model that fits your PC"
          line="Smaller is faster; bigger is more accurate. Each download is hash-checked, and Scribe uses your graphics card when it can."
        />
        {/* Whose models they are, and what runs them */}
        <div data-reveal className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-3 text-sm">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-edge-strong bg-card px-4 py-2 font-semibold text-ink">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white text-black">
              <OpenAIIcon className="h-4 w-4" />
            </span>
            OpenAI Whisper models
          </span>
          <span className="text-faint" aria-hidden="true">
            run on your PC by
          </span>
          <span className="sr-only">, run on your PC by</span>
          <span className="inline-flex items-center gap-2.5 rounded-full border border-edge-strong bg-card px-4 py-2 font-semibold text-ink">
            <Image src="/ggml.png" alt="" width={24} height={24} className="h-6 w-6 rounded-md" />
            whisper.cpp
          </span>
        </div>
        <div data-reveal className="mx-auto mt-8 max-w-3xl rounded-2xl border border-edge bg-card/60 p-5 sm:p-6">
          <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-faint">
            <span>← Faster</span>
            <span>More accurate →</span>
          </div>
          <ul className="mt-4 space-y-3">
            {MODELS.map((m) => (
              <li
                key={m.name}
                className="-mx-2 grid grid-cols-[minmax(0,9.5rem)_minmax(0,1fr)] items-center gap-3 rounded-lg px-2 py-1 transition hover:bg-white/[0.03] sm:grid-cols-[minmax(0,13rem)_minmax(0,1fr)]"
              >
                <span className="text-sm">
                  <span className="block font-semibold text-ink">{m.name}</span>
                  <span className="block text-xs text-faint">{m.langs}</span>
                </span>
                <span className="flex items-center gap-3">
                  <span
                    className={`block h-2.5 rounded-full ${m.isDefault ? "bg-gradient-to-r from-cyan to-purple" : "bg-edge-strong"}`}
                    style={{ width: `${Math.max(4, (m.mb / 1625) * 100) * 0.82}%` }}
                  />
                  <span className="shrink-0 text-xs tabular-nums text-mute">{m.size}</span>
                  {m.isDefault && (
                    <span className="shrink-0 rounded-full bg-cyan/15 px-2 py-0.5 text-[0.7rem] font-semibold text-cyan">Starts here</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-6 text-center text-sm text-mute">
          29 languages, or let it detect yours. Any of them can come out as English text.
        </p>
      </div>
    </section>
  );
}

export function Themes() {
  return (
    <section id="themes" className="sep-band sep-arc scroll-mt-20">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <Head eyebrow="Make it yours" title={<>Your colours, <span className="gradient-text">your Scribe</span></>} line="Six themes built in, including a light one. Try them here." />
        <div data-reveal className="mt-10">
          <ThemePreview />
        </div>
        <p className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center text-sm text-mute">
          <span className="flex -space-x-1" aria-hidden="true">
            {["#f472b6", "#facc15", "#34d399", "#60a5fa", "#f8fafc"].map((c) => (
              <span key={c} className="h-4 w-4 rounded-full ring-2 ring-bg" style={{ background: c }} />
            ))}
          </span>
          Or make your own: pick five colours in Scribe and it builds the rest of the theme.
        </p>
      </div>
    </section>
  );
}

// Three things worth a closer look, each with a small picture of what it does
// (checked against the app: quick notes turn the pill blue and save to Notes;
// replacements apply to every transcript; Stats counts words, WPM and latency).
function NoteVisual() {
  return (
    <div className="space-y-2.5">
      <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/50 bg-[#0a1220] px-3 py-1.5 text-xs text-ink">
        <span className="h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgb(96_165_250)]" />
        Note: call the venue about Saturday
      </span>
      <div className="flex items-center gap-2 rounded-lg border border-edge bg-bg/70 px-3 py-2 text-xs text-mute">
        <NotebookPen className="h-3.5 w-3.5 text-blue-300" aria-hidden="true" />
        Saved to Notes, nothing pasted
      </div>
    </div>
  );
}

function ReplaceVisual() {
  return (
    <div className="space-y-2">
      {[
        ["my email", "n8@example.com"],
        ["my sign-off", "Thanks, Nate"],
      ].map(([say, get]) => (
        <div key={say} className="flex items-center gap-2 text-xs">
          <span className="rounded-md border border-edge-strong bg-card-2 px-2 py-1 text-mute">&ldquo;{say}&rdquo;</span>
          <span className="text-faint" aria-hidden="true">
            &rarr;
          </span>
          <span className="truncate rounded-md border border-cyan/40 bg-cyan/[0.08] px-2 py-1 text-ink">{get}</span>
        </div>
      ))}
    </div>
  );
}

function StatsVisual() {
  return (
    <div className="grid grid-cols-3 gap-2">
      {[
        ["Words today", "1,284"],
        ["Average WPM", "142"],
        ["Latency avg", "0.6 s"],
      ].map(([label, value]) => (
        <div key={label} className="rounded-lg border border-edge bg-bg/70 px-2.5 py-2">
          <p className="text-[0.6rem] font-bold uppercase tracking-wide text-faint">{label}</p>
          <p className="mt-0.5 text-sm font-bold tabular-nums text-ink">{value}</p>
        </div>
      ))}
    </div>
  );
}

const HIGHLIGHTS: { title: string; line: string; visual: React.ReactNode }[] = [
  { title: "Quick notes", line: "Hold the ~ key and tap Q. The pill turns blue and the thought goes to your Notes instead of the page.", visual: <NoteVisual /> },
  { title: "Your words, your way", line: "Say a short phrase and get the long one. Add names and jargon to a word list so they come out right.", visual: <ReplaceVisual /> },
  { title: "History and stats", line: "Search and play back everything you said, and see how much you talk instead of type.", visual: <StatsVisual /> },
];

// The rest, short and in one list: one icon each (lucide, the app's own set).
const ALSO: { Icon: LucideIcon; text: string }[] = [
  { Icon: Hand, text: "Hands-free on the ~ key" },
  { Icon: Timer, text: "Stops after a minute of silence" },
  { Icon: ClipboardPaste, text: "Ctrl + Alt + V pastes the last one" },
  { Icon: Scissors, text: "Leaves out \u201cum\u201d and \u201cuh\u201d if you like" },
  { Icon: Languages, text: "29 languages, or into English" },
  { Icon: FileAudio, text: "Audio and video files into text" },
  { Icon: Combine, text: "Combine entries, open in your editor" },
  { Icon: CalendarClock, text: "Keep history 30 days, forever, or not at all" },
  { Icon: FolderGit2, text: "Backup to a private GitHub repo" },
  { Icon: FileDown, text: "Export Markdown, CSV or JSON" },
  { Icon: Power, text: "Lives in the tray, starts with Windows" },
  { Icon: BookA, text: "A word list for names and jargon" },
];

export function More() {
  return (
    <>
      <section id="features" className="sep-glow scroll-mt-20">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Head eyebrow="And the rest" title={<>More than <span className="gradient-text">dictation</span></>} line="All of it in the free app, all of it on your PC." />
          <div data-reveal className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
            {HIGHLIGHTS.map((h) => (
              <article key={h.title} className="flex flex-col rounded-2xl border border-edge bg-card/60 p-6 transition duration-300 hover:-translate-y-0.5 hover:border-cyan/40">
                <div className="flex min-h-[6.5rem] items-center rounded-xl border border-edge/70 bg-bg-2/60 p-4">{h.visual}</div>
                <h3 className="mt-5 font-semibold text-ink">{h.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-mute">{h.line}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="also-title" className="scroll-mt-20">
        <div className="mx-auto max-w-5xl px-6 pt-4 pb-20">
          <h3 id="also-title" className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-faint">
            Also in the box
          </h3>
          <ul data-reveal className="mt-8 grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {ALSO.map(({ Icon: ItemIcon, text }) => (
              <li key={text} className="flex items-center gap-3 text-sm text-mute">
                <ItemIcon className="h-4 w-4 shrink-0 text-cyan" aria-hidden="true" />
                {text}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

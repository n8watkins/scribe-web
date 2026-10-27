import { Icon } from "@/components/Icons";
import { GITHUB_URL, type IconName } from "@/lib/site";

// The page's middle: where your voice goes, the optional local AI, the models,
// the themes, and the rest. Every fact here comes from the app's source
// (models.rs, App.css themes, note_analysis.rs, selection_transform.rs,
// lib/updates.ts); see docs/scribe-review-and-videos.md before changing one.

function Head({ eyebrow, title, line }: { eyebrow: string; title: React.ReactNode; line?: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan">{eyebrow}</p>
      <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {line && <p className="mt-4 text-pretty text-mute">{line}</p>}
    </div>
  );
}

function Arrow() {
  return (
    <span aria-hidden="true" className="flex items-center justify-center text-faint">
      <svg viewBox="0 0 24 24" className="h-5 w-5 rotate-90 md:rotate-0" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </span>
  );
}

function Node({ icon, title, sub }: { icon: IconName; title: string; sub: string }) {
  return (
    <div className="flex flex-1 items-center gap-3 rounded-xl border border-edge bg-card px-4 py-3.5 md:flex-col md:text-center">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green/10 text-green">
        <Icon name={icon} />
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
  { icon: "cloudDown", what: "Model download", when: "Once, when you pick a model." },
  { icon: "github", what: "GitHub backup", when: "Off until you connect it." },
  { icon: "spark", what: "Online AI", when: "Only if you point the AI tools at one." },
];

export function PrivacyFlow() {
  return (
    <section id="private-by-design" className="scroll-mt-20 border-y border-edge/60 bg-bg-2/40">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <Head eyebrow="Private by design" title={<>Your voice stays <span className="gradient-text">on your PC</span></>} />

        {/* The PC as a box: voice in, text out, history kept, all inside it */}
        <div className="relative mt-12 rounded-3xl border-2 border-dashed border-green/40 bg-green/[0.03] px-5 pt-10 pb-6 sm:px-8">
          <p className="absolute -top-3.5 left-6 flex items-center gap-2 rounded-full border border-green/40 bg-bg px-3 py-1 text-sm font-semibold text-green">
            <Icon name="monitor" className="h-4 w-4" />
            Your PC
          </p>
          <div className="flex flex-col gap-3 md:flex-row md:items-stretch">
            <Node icon="mic" title="Your voice" sub="Recorded here" />
            <Arrow />
            <Node icon="chip" title="Speech model" sub="Turns it into text, offline" />
            <Arrow />
            <Node icon="keyboard" title="Your cursor" sub="The words land here" />
          </div>
          <p className="mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-sm text-mute">
            <Icon name="history" className="h-4 w-4 text-green" />
            Your history and recordings are kept here too, for as long as you choose.
          </p>
        </div>

        {/* What goes out, and when */}
        <div className="mt-10">
          <p className="text-center text-sm font-semibold text-ink">What goes online, and when</p>
          <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {ONLINE.map((o) => (
              <li key={o.what} className="rounded-xl border border-edge bg-card/70 p-4">
                <p className="flex items-center gap-2 font-semibold text-ink">
                  <Icon name={o.icon} className="h-4 w-4 text-cyan" />
                  {o.what}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-mute">{o.when}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-center text-sm text-mute">
            Never your audio. No account, no tracking.{" "}
            <a href={GITHUB_URL} className="font-semibold text-cyan underline decoration-cyan/40 underline-offset-4 transition hover:text-ink">
              Check the code
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

function Bubble({ label, icon, children, tone = "say" }: { label: string; icon: IconName; children: React.ReactNode; tone?: "say" | "get" | "context" }) {
  const box = {
    say: "border-edge-strong bg-card-2",
    get: "border-cyan/40 bg-cyan/[0.06]",
    context: "border-edge border-dashed bg-transparent",
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

export function LocalAI() {
  return (
    <section id="local-ai" className="mx-auto max-w-5xl scroll-mt-20 px-6 py-20">
      <Head
        eyebrow="Optional"
        title={<>Rewrite with an AI <span className="gradient-text">on your PC</span></>}
        line={
          <>
            Scribe can hand text to LM Studio or Ollama, free apps that run AI models on your own computer. Install one, turn
            the AI tools on in Scribe, and these work. Until then they stay off.
          </>
        }
      />

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-edge bg-card/60 p-5">
          <p className="font-semibold text-ink">Rewrite selected text, in any app</p>
          <p className="mt-1 text-sm text-mute">Highlight it, press <span className="font-mono text-ink">Ctrl + Alt + R</span>, say what to change.</p>
          <div className="mt-4 space-y-2.5">
            <Bubble label="Selected" icon="file" tone="context">
              <span className="text-mute">hey so i think we should push the launch, screenshots arent done and the copy needs another pass</span>
            </Bubble>
            <Bubble label="You say" icon="mic">Make this clear and professional.</Bubble>
            <Bubble label="You get" icon="spark" tone="get">
              Let&apos;s move the launch date. The screenshots aren&apos;t finished, and the copy needs one more review.
            </Bubble>
          </div>
        </div>

        <div className="rounded-2xl border border-edge bg-card/60 p-5">
          <p className="font-semibold text-ink">Sum up a note</p>
          <p className="mt-1 text-sm text-mute">One click on any note gives a summary and its to-dos. You can change what it asks for.</p>
          <div className="mt-4 space-y-2.5">
            <Bubble label="Your note" icon="mic">
              ok so tomorrow I need to send Maya the new timeline, go over the homepage copy, and um book the dentist before Friday
            </Bubble>
            <Bubble label="You get" icon="spark" tone="get">
              <p>Plans for tomorrow.</p>
              <ul className="mt-2 list-disc space-y-0.5 pl-5 text-[0.9rem]">
                <li>Send Maya the new timeline</li>
                <li>Review the homepage copy</li>
                <li>Book the dentist before Friday</li>
              </ul>
            </Bubble>
          </div>
        </div>
      </div>

      <p className="mt-6 flex items-center justify-center gap-2 text-center text-sm text-mute">
        <Icon name="lock" className="h-4 w-4 text-green" />
        It all stays on your PC, unless you choose an online AI service instead.
      </p>
    </section>
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
    <section id="models" className="scroll-mt-20 border-y border-edge/60 bg-bg-2/40">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <Head
          eyebrow="Models"
          title="Pick the model that fits your PC"
          line="All of them are OpenAI's Whisper, running on your PC. Smaller is faster; bigger is more accurate. Scribe uses your graphics card when it can."
        />
        <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-edge bg-card/60 p-5 sm:p-6">
          <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-faint">
            <span>← Faster</span>
            <span>More accurate →</span>
          </div>
          <ul className="mt-4 space-y-3">
            {MODELS.map((m) => (
              <li key={m.name} className="grid grid-cols-[minmax(0,9.5rem)_minmax(0,1fr)] items-center gap-3 sm:grid-cols-[minmax(0,13rem)_minmax(0,1fr)]">
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

// The app's themes (App.css): background, raised surface, accent, text.
const THEMES: { name: string; bg: string; panel: string; accent: string; text: string }[] = [
  { name: "Midnight", bg: "#070b14", panel: "#0d1320", accent: "#22d3ee", text: "#f8fafc" },
  { name: "Ocean", bg: "#04141c", panel: "#0a2230", accent: "#2dd4bf", text: "#ecfeff" },
  { name: "Slate", bg: "#0b0e14", panel: "#151a23", accent: "#818cf8", text: "#f1f5f9" },
  { name: "Emerald", bg: "#05140d", panel: "#0a2117", accent: "#10b981", text: "#ecfdf5" },
  { name: "Violet", bg: "#0c0a1a", panel: "#181233", accent: "#8b5cf6", text: "#f5f3ff" },
  { name: "Pewter", bg: "#d6dadf", panel: "#e8ebef", accent: "#075985", text: "#1f2937" },
];

function MiniWindow({ bg, panel, accent, text }: { bg: string; panel: string; accent: string; text: string }) {
  return (
    <div aria-hidden="true" className="flex h-24 overflow-hidden rounded-lg border border-white/10" style={{ background: bg }}>
      <div className="w-1/4 space-y-1.5 p-2" style={{ background: panel }}>
        <span className="block h-1.5 w-3/4 rounded-full" style={{ background: accent }} />
        {[0, 1, 2].map((i) => (
          <span key={i} className="block h-1.5 w-2/3 rounded-full opacity-40" style={{ background: text }} />
        ))}
      </div>
      <div className="flex-1 space-y-2 p-2.5">
        <span className="block h-2 w-1/2 rounded-full opacity-80" style={{ background: text }} />
        <div className="space-y-1.5 rounded-md p-2" style={{ background: panel }}>
          <span className="block h-1.5 w-5/6 rounded-full opacity-40" style={{ background: text }} />
          <span className="block h-1.5 w-2/3 rounded-full opacity-40" style={{ background: text }} />
        </div>
        <span className="block h-3 w-10 rounded-full" style={{ background: accent }} />
      </div>
    </div>
  );
}

export function Themes() {
  return (
    <section id="themes" className="mx-auto max-w-5xl scroll-mt-20 px-6 py-20">
      <Head eyebrow="Make it yours" title="Seven themes, or your own" line="Six built in, including a light one, or build one from three colours you pick." />
      <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
        {THEMES.map((t) => (
          <li key={t.name}>
            <MiniWindow {...t} />
            <p className="mt-2 text-center text-sm text-mute">{t.name}</p>
          </li>
        ))}
        <li>
          <div aria-hidden="true" className="flex h-24 items-center justify-center gap-1.5 rounded-lg border border-dashed border-edge-strong">
            {["#f472b6", "#facc15", "#34d399"].map((c) => (
              <span key={c} className="h-6 w-6 rounded-full ring-2 ring-white/10" style={{ background: c }} />
            ))}
          </div>
          <p className="mt-2 text-center text-sm text-mute">Custom</p>
        </li>
      </ul>
    </section>
  );
}

// Everything else, one line each.
const MORE: { label: string; icon: IconName; line: string }[] = [
  { label: "Quick notes", icon: "file", line: "Hold ~ and tap Q to save a thought to Notes instead of pasting it." },
  { label: "History", icon: "history", line: "Search, play back and combine everything you've said." },
  { label: "Cleaner text", icon: "spark", line: "Your own word list, replacements, and fewer ums." },
  { label: "Files", icon: "cloudDown", line: "Turn audio and video files into text." },
  { label: "Backup", icon: "github", line: "A private GitHub repo, or export to Markdown, CSV or JSON." },
  { label: "Your keys", icon: "keyboard", line: "Change any shortcut. Hands-free on the ~ key." },
];

export function More() {
  return (
    <section id="features" className="scroll-mt-20 border-t border-edge/60">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <Head eyebrow="And the rest" title="The small things" />
        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MORE.map((m) => (
            <li key={m.label} className="rounded-2xl border border-edge bg-card/60 p-5">
              <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-cyan">
                <Icon name={m.icon} className="h-4 w-4" />
                {m.label}
              </p>
              <p className="mt-3 leading-relaxed text-ink">{m.line}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

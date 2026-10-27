import { CheckIcon, GitHubIcon, Icon } from "@/components/Icons";
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
    <section id="private-by-design" className="scroll-mt-20 border-y border-edge/60 bg-bg-2/40">
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

      <div data-reveal className="mx-auto mt-12 max-w-3xl space-y-6">
        <AIExample
          title="Rewrite selected text, in any app"
          how={
            <>
              Highlight it, press <span className="font-mono text-ink">Ctrl + Alt + R</span> and say what to change.
            </>
          }
          context="hey so i think we should push the launch, screenshots arent done and the copy needs another pass"
          sayLabel="You say"
          say="Make this clear and professional."
          get="Let's move the launch date. The screenshots aren't finished, and the copy needs one more review."
        />
        <AIExample
          title="Sum up a note"
          how="One click on any note gives a summary and its to-dos. You can change what it asks for."
          sayLabel="Your note"
          say="ok so tomorrow I need to send Maya the new timeline, go over the homepage copy, and um book the dentist before Friday"
          get="Plans for tomorrow."
          bullets={["Send Maya the new timeline", "Review the homepage copy", "Book the dentist before Friday"]}
        />
      </div>
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
          line="All of them are OpenAI's Whisper, running on your PC. Smaller is faster; bigger is more accurate. Each download is hash-checked, and Scribe uses your graphics card when it can."
        />
        <div data-reveal className="mx-auto mt-12 max-w-3xl rounded-2xl border border-edge bg-card/60 p-5 sm:p-6">
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
    <section id="themes" className="mx-auto max-w-5xl scroll-mt-20 px-6 py-20">
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
    </section>
  );
}

// Everything else the free app does, each checked against its source.
const MORE: { group: string; icon: IconName; items: string[] }[] = [
  {
    group: "Dictation",
    icon: "mic",
    items: [
      "Hands-free mode on the ~ key",
      "Quick notes: hold ~ and tap Q",
      "Stops by itself after a minute of silence",
      "Ctrl + Alt + V pastes your last one again",
      "Ctrl + Alt + X throws a take away",
    ],
  },
  {
    group: "Your words",
    icon: "spark",
    items: [
      "Your own word list for names and jargon",
      "Replacements: say \u201cmy email\u201d, get your address",
      "Leaves out \u201cum\u201d and \u201cuh\u201d if you like",
      "29 languages, or translate any of them to English",
      "Turns audio and video files into text",
    ],
  },
  {
    group: "History and notes",
    icon: "history",
    items: [
      "Search, filter and play back everything you said",
      "Combine entries, or open them in your editor",
      "Stats: words today, speed and latency",
      "Keep it 30 days, forever, or not at all",
    ],
  },
  {
    group: "Your setup",
    icon: "keyboard",
    items: [
      "Change any shortcut",
      "A floating pill you can move and recolour",
      "Back up to a private GitHub repo",
      "Export to Markdown, CSV or JSON",
      "Lives in the tray; starts with Windows if you want",
    ],
  },
];

export function More() {
  return (
    <section id="features" className="scroll-mt-20 border-t border-edge/60">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <Head eyebrow="And the rest" title={<>More than <span className="gradient-text">dictation</span></>} line="All of it in the free app, all of it on your PC." />
        <div data-reveal className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          {MORE.map((g) => (
            <div key={g.group} className="rounded-2xl border border-edge bg-card/60 p-5 transition duration-300 hover:border-cyan/40 hover:bg-card">
              <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-cyan">
                <Icon name={g.icon} className="h-4 w-4" />
                {g.group}
              </p>
              <ul className="mt-4 space-y-2.5">
                {g.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[0.95rem] text-ink">
                    <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-green" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

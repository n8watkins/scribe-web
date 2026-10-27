import Link from "next/link";
import Image from "next/image";
import { FAQS, FEATURES, GITHUB_URL, N8BUILDS_URL, type Release } from "@/lib/site";
import { DownloadIcon, GitHubIcon, Icon } from "@/components/Icons";
import { DemoVideo } from "@/components/DemoVideo";
import { DictationDemo } from "@/components/DictationDemo";
import { Faq } from "@/components/Faq";

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan";

export function Nav({ release }: { release: Release }) {
  return (
    <nav aria-label="Primary" className="sticky top-0 z-50 border-b border-edge/70 bg-bg/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-6 py-3.5">
        <Link href="/#top" className={`flex items-center gap-2.5 rounded-lg ${FOCUS}`}>
          <Image src="/scribe-icon.png" alt="" width={28} height={28} />
          <span className="font-bold tracking-tight">Scribe</span>
        </Link>
        <div className="ml-auto hidden items-center gap-6 text-sm text-mute md:flex">
          <Link href="/#how-it-works" className="transition hover:text-ink">How it works</Link>
          <Link href="/#private-by-design" className="transition hover:text-ink">Private by design</Link>
          <Link href="/#faq" className="transition hover:text-ink">FAQ</Link>
        </div>
        <div className="flex items-center gap-2 md:ml-3">
          <a
            href={GITHUB_URL}
            aria-label="Scribe on GitHub"
            className={`flex h-9 w-9 items-center justify-center rounded-full border border-edge text-ink transition hover:border-cyan/60 ${FOCUS}`}
          >
            <GitHubIcon className="h-4 w-4" />
          </a>
          <a
            href={release.url}
            className={`inline-flex h-9 items-center gap-1.5 rounded-full bg-gradient-to-r from-cyan to-purple px-4 text-sm font-semibold text-bg transition hover:brightness-110 ${FOCUS}`}
          >
            <DownloadIcon className="h-4 w-4" />
            Download
          </a>
        </div>
      </div>
    </nav>
  );
}

function SectionHead({ eyebrow, title, children }: { eyebrow: string; title: React.ReactNode; children?: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan">{eyebrow}</p>
      <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {children && <p className="mt-4 text-pretty text-mute">{children}</p>}
    </div>
  );
}

/** The hotkey, the talking and the typing acted out, with what the PC does at each step. */
export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-16 border-y border-edge/60 bg-bg-2/40">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <SectionHead eyebrow="How it works" title={<>Hold the key. Talk. <span className="gradient-text">Let go.</span></>}>
          No window to switch to and nothing to paste. This is the whole loop, and what your PC does at each step.
        </SectionHead>
        <div className="mt-12">
          <DictationDemo />
        </div>
      </div>
    </section>
  );
}

/** What else it does, in six short cards. */
export function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl scroll-mt-16 px-6 py-20">
      <SectionHead eyebrow="Features" title="Built for dictating all day" />
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <div key={f.title} className="rounded-2xl border border-edge bg-card p-5 transition hover:border-cyan/40 hover:bg-card-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan/25 bg-cyan/10 text-cyan">
              <Icon name={f.icon} />
            </span>
            <h3 className="mt-4 font-semibold text-ink">{f.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-mute">{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// Every connection the app makes, from its source (see the repo's
// src-tauri: update_check.rs, model_manager.rs, github_backup.rs,
// note_analysis.rs, whisper_server.rs, state_server.rs).
const CONNECTIONS: { to: string; when: string; sends: string }[] = [
  {
    to: "github.com/n8watkins/scribe",
    when: "When Scribe starts, to check for an update",
    sends: "A request for the latest version. Updates install only if they carry Scribe's signature.",
  },
  {
    to: "huggingface.co (whisper.cpp models)",
    when: "Only when you download a model",
    sends: "A download request for that model file, at a pinned version.",
  },
  {
    to: "github.com and api.github.com",
    when: "Only if you turn on GitHub backup",
    sends: "Your notes (and transcripts, if you choose) as Markdown, to a private repo you own. Never audio.",
  },
  {
    to: "Your AI server, 127.0.0.1:1234 by default",
    when: "Only when you use the optional AI note tools",
    sends: "The text you ask it to work on. The default is LM Studio on your own PC.",
  },
];

export function PrivateByDesign() {
  return (
    <section id="private-by-design" className="scroll-mt-16 border-y border-edge/60 bg-bg-2/40">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <SectionHead eyebrow="Private by design" title={<>Your voice <span className="gradient-text">never leaves your PC</span></>}>
          Not as a promise, as a design: there is no Scribe server for it to go to.
        </SectionHead>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="rounded-2xl border border-green/30 bg-green/[0.04] p-6">
            <h3 className="flex items-center gap-2.5 font-semibold text-ink">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-green/15 text-green">
                <Icon name="lock" className="h-4 w-4" />
              </span>
              Stays on this PC, always
            </h3>
            <ul className="mt-5 space-y-4 text-sm leading-relaxed text-mute">
              <li>
                <span className="font-semibold text-ink">Your audio.</span> Recorded to a temporary file, transcribed
                here, and deleted as soon as the text is ready. If a transcription fails, the last 20 recordings are
                kept locally so you can retry them.
              </li>
              <li>
                <span className="font-semibold text-ink">The model.</span> whisper.cpp runs as a server bound to
                127.0.0.1, so nothing else on your network can reach it.
              </li>
              <li>
                <span className="font-semibold text-ink">Your history.</span> A SQLite file in your Windows app-data
                folder. Search it, clear it, switch it off, or open the folder from Scribe&apos;s settings.
              </li>
              <li>
                <span className="font-semibold text-ink">How you use it.</span> No account, no analytics, no
                telemetry. The usage stats Scribe shows you are worked out and kept on your PC, never sent.
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-edge bg-card p-6">
            <h3 className="font-semibold text-ink">Every connection it makes</h3>
            <p className="mt-1 text-sm text-mute">The complete list, from the app&apos;s source.</p>
            <dl className="mt-5 divide-y divide-edge">
              {CONNECTIONS.map((c) => (
                <div key={c.to} className="grid grid-cols-1 gap-1 py-4 first:pt-0 last:pb-0 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] sm:gap-4">
                  <dt>
                    <span className="block font-mono text-[0.8rem] text-cyan">{c.to}</span>
                    <span className="mt-1 block text-xs text-faint">{c.when}</span>
                  </dt>
                  <dd className="text-sm leading-relaxed text-mute">{c.sends}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-mute">
          Don&apos;t take this page&apos;s word for it:{" "}
          <a href={GITHUB_URL} className="font-semibold text-cyan underline decoration-cyan/40 underline-offset-4 transition hover:text-ink">
            the source is open
          </a>{" "}
          (MIT), and every network call lives in a handful of files.
        </p>
      </div>
    </section>
  );
}

/** The full tour, and the privacy story, as the app's own recordings (controls, no autoplay). */
export function VideoShowcase() {
  return (
    <section id="see-it">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <SectionHead eyebrow="See it" title={<>The full tour, <span className="gradient-text">in 30 seconds</span></>} />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <DemoVideo
            src="/videos/Scribe-30a.mp4"
            poster="/posters/scribe-30a.webp"
            label="A 30-second tour of Scribe: dictation, the dashboard, models and history"
            autoPlay={false}
          />
          <DemoVideo
            src="/videos/Scribe-15b.mp4"
            poster="/posters/scribe-15b.webp"
            label="Private by design: local Whisper, push-to-talk, no account"
            autoPlay={false}
          />
        </div>
      </div>
    </section>
  );
}

export function FAQ() {
  return (
    <section id="faq" className="mx-auto max-w-3xl scroll-mt-16 px-6 py-20">
      <SectionHead eyebrow="FAQ" title="Straight answers" />
      <Faq items={FAQS} />
    </section>
  );
}

export function CTA({ release }: { release: Release }) {
  return (
    <section className="mx-auto max-w-4xl px-6 pb-24 text-center">
      <div className="rounded-3xl border border-edge bg-gradient-to-br from-cyan/10 via-card to-purple/10 px-6 py-12">
        <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
          Your voice. Your machine. <span className="gradient-text">Your words.</span>
        </h2>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href={release.url} className={`inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-cyan to-purple px-7 py-3.5 font-semibold text-bg transition hover:brightness-110 ${FOCUS}`}>
            <DownloadIcon />
            Download v{release.version}<span className="hidden sm:inline">&nbsp;for Windows</span>
          </a>
          <a href={GITHUB_URL} className={`inline-flex items-center gap-2 rounded-full border border-edge-strong bg-card px-6 py-3.5 font-semibold text-ink transition hover:border-cyan/60 ${FOCUS}`}>
            <GitHubIcon />
            Source on GitHub
          </a>
        </div>
        <p className="mx-auto mt-5 max-w-lg text-sm text-faint">
          {release.sizeMb} MB installer. It isn&apos;t code-signed yet, so Windows SmartScreen may ask you to confirm;{" "}
          <a href={release.checksumsUrl} className="underline decoration-faint/50 underline-offset-2 transition hover:text-ink">
            SHA-256 checksums
          </a>{" "}
          are published with every release.
        </p>
      </div>
    </section>
  );
}

export function Footer({ release }: { release: Release }) {
  const col = "text-sm text-mute transition hover:text-ink";
  const columns: { title: string; links: { label: string; href: string }[] }[] = [
    {
      title: "Scribe",
      links: [
        { label: "How it works", href: "/#how-it-works" },
        { label: "Features", href: "/#features" },
        { label: "Private by design", href: "/#private-by-design" },
        { label: "FAQ", href: "/#faq" },
      ],
    },
    {
      title: "Get it",
      links: [
        { label: `Download v${release.version}`, href: release.url },
        { label: "All releases", href: `${GITHUB_URL}/releases` },
        { label: "Checksums", href: release.checksumsUrl },
        { label: "Source code", href: GITHUB_URL },
      ],
    },
    {
      title: "n8builds.dev",
      links: [
        { label: "The Lab", href: `${N8BUILDS_URL}/#lab` },
        { label: "How Scribe was built", href: `${N8BUILDS_URL}/builds/scribe` },
        { label: "Build log", href: `${N8BUILDS_URL}/builds` },
        { label: "Developer portfolio", href: "https://portfolio.n8builds.dev" },
      ],
    },
  ];
  return (
    <footer className="border-t border-edge/60">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-10 px-6 py-14 md:grid-cols-[minmax(0,1.2fr)_repeat(3,minmax(0,1fr))]">
        <div className="col-span-2 md:col-span-1">
          <Link href="/#top" className={`flex w-fit items-center gap-2.5 rounded-lg ${FOCUS}`}>
            <Image src="/scribe-icon.png" alt="" width={28} height={28} />
            <span className="font-bold tracking-tight text-ink">Scribe</span>
          </Link>
          <p className="mt-3 max-w-xs text-sm text-mute">
            Private local dictation for Windows. One of the tools I build in public on{" "}
            <a href={N8BUILDS_URL} className="text-ink underline decoration-faint/50 underline-offset-2 hover:text-cyan">
              n8builds.dev
            </a>
            .
          </p>
        </div>
        {columns.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink">{c.title}</p>
            <ul className="mt-4 space-y-2.5">
              {c.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className={col}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-edge/60">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-6 text-sm text-faint sm:flex-row">
          <p>© 2026 Nathan Watkins. Scribe is MIT licensed.</p>
          <p className="text-center">
            This site sets no cookies and runs no analytics.{" "}
            <Link href="/privacy" className="text-mute underline decoration-faint/50 underline-offset-2 hover:text-ink">
              Privacy policy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

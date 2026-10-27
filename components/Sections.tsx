import Link from "next/link";
import Image from "next/image";
import {
  FAQS,
  FEATURES,
  GITHUB_PROFILE_URL,
  GITHUB_URL,
  KOFI_URL,
  N8BUILDS_URL,
  type Release,
} from "@/lib/site";
import { DownloadIcon, GitHubIcon, Icon, KofiIcon } from "@/components/Icons";
import { DemoVideo } from "@/components/DemoVideo";
import { DictationDemo } from "@/components/DictationDemo";
import { Faq } from "@/components/Faq";

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan";

/** The n8builds mark: the N8 icon and the name, linking home to n8builds.dev. */
function N8buildsMark({ label = "n8builds", className = "" }: { label?: string; className?: string }) {
  return (
    <a
      href={N8BUILDS_URL}
      className={`group inline-flex items-center gap-2 rounded-lg text-sm text-mute transition hover:text-ink ${FOCUS} ${className}`}
    >
      <Image src="/n8builds-icon.png" alt="" width={24} height={24} className="rounded-md ring-1 ring-white/10 transition group-hover:ring-white/25" />
      <span>{label}</span>
    </a>
  );
}

/** Ko-fi in its own colours: Ko-fi blue with the red cup, as on n8builds.dev. */
function KofiButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={KOFI_URL}
      className={`inline-flex h-9 items-center gap-1.5 rounded-full bg-[#29abe0] px-3.5 text-sm font-semibold text-[#0b1324] transition hover:bg-[#4cc1ef] ${FOCUS} ${className}`}
    >
      <KofiIcon className="h-4 w-4 text-[#ff5e5b]" />
      Ko-fi
    </a>
  );
}

export function Nav({ release }: { release: Release }) {
  return (
    <header className="sticky top-0 z-50 border-b border-edge/70 bg-bg/85 backdrop-blur">
      {/* A thin band: Scribe is one of the things I build on n8builds.dev */}
      <div className="border-b border-edge/50 bg-bg-2/70">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-6 py-1.5 text-xs text-faint">
          <span>
            A free app from{" "}
            <a href={N8BUILDS_URL} className="font-semibold text-mute underline-offset-2 transition hover:text-ink hover:underline">
              n8builds.dev
            </a>
            , where I build in public
          </span>
          <a href={`${N8BUILDS_URL}/#lab`} className="hidden shrink-0 text-mute transition hover:text-ink sm:inline">
            See everything I build ↗
          </a>
        </div>
      </div>
      <nav aria-label="Primary" className="mx-auto flex max-w-6xl items-center gap-3 px-6 py-3">
        <Link href="/#top" className={`flex items-center gap-2.5 rounded-lg ${FOCUS}`}>
          <Image src="/scribe-icon.png" alt="" width={28} height={28} />
          <span className="font-bold tracking-tight">Scribe</span>
        </Link>
        <span aria-hidden="true" className="hidden h-5 w-px bg-edge sm:block" />
        <span className="hidden sm:block">
          <N8buildsMark />
        </span>
        <div className="ml-auto hidden items-center gap-6 text-sm text-mute lg:flex">
          <Link href="/#how-it-works" className="transition hover:text-ink">How it works</Link>
          <Link href="/#private-by-design" className="transition hover:text-ink">Private by design</Link>
          <Link href="/#faq" className="transition hover:text-ink">FAQ</Link>
        </div>
        <div className="ml-auto flex items-center gap-2 lg:ml-4">
          <span className="hidden md:block">
            <KofiButton />
          </span>
          <a
            href={GITHUB_URL}
            aria-label="Scribe's source on GitHub"
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
      </nav>
    </header>
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

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-28 border-y border-edge/60 bg-bg-2/40">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <SectionHead eyebrow="How it works" title={<>Hold the key, talk, <span className="gradient-text">let go</span></>}>
          That&apos;s it. No window to switch to, nothing to copy or paste.
        </SectionHead>
        <div className="mt-12">
          <DictationDemo />
        </div>
      </div>
    </section>
  );
}

/** What else it does: one compact row each, the icon beside the words. */
export function Features() {
  return (
    <section id="features" className="mx-auto max-w-5xl scroll-mt-28 px-6 py-20">
      <SectionHead eyebrow="Features" title="The small things that make it nice to use" />
      <ul className="mt-10 grid grid-cols-1 gap-x-10 gap-y-2 md:grid-cols-2">
        {FEATURES.map((f) => (
          <li key={f.title} className="flex items-start gap-4 rounded-xl px-3 py-4 transition hover:bg-card/70">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan/25 bg-cyan/10 text-cyan">
              <Icon name={f.icon} />
            </span>
            <p className="pt-0.5 text-[0.95rem] leading-relaxed text-mute">
              <span className="font-semibold text-ink">{f.title}.</span> {f.body}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

// What leaves the PC, and when (from the app's source: update_check.rs,
// model_manager.rs, github_backup.rs, note_analysis.rs).
const ONLINE: { what: string; when: string }[] = [
  { what: "Checks for updates", when: "when it starts" },
  { what: "Downloads a speech model", when: "when you pick one" },
  { what: "Backs up notes to GitHub", when: "if you turn it on" },
  { what: "Sends text to an AI tool", when: "if you set one up" },
];

const ON_PC = ["Your voice", "The speech model", "Your transcripts", "Your history and stats"];

export function PrivateByDesign() {
  return (
    <section id="private-by-design" className="scroll-mt-28 border-y border-edge/60 bg-bg-2/40">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <SectionHead eyebrow="Private by design" title={<>Your voice stays <span className="gradient-text">on your PC</span></>}>
          Scribe has no server, so there&apos;s nowhere for your voice to go.
        </SectionHead>

        {/* Your PC on the left, the internet on the right, and what crosses */}
        <div className="mt-12 grid grid-cols-1 items-stretch gap-4 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
          <div className="rounded-2xl border border-green/35 bg-green/[0.05] p-6">
            <p className="flex items-center gap-2.5 font-semibold text-ink">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-green/15 text-green">
                <Icon name="chip" className="h-4 w-4" />
              </span>
              Your PC
            </p>
            <ul className="mt-5 space-y-3">
              {ON_PC.map((item) => (
                <li key={item} className="flex items-center gap-3 text-ink">
                  <Icon name="lock" className="h-4 w-4 shrink-0 text-green" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-mute">Always here. Never uploaded.</p>
          </div>

          <div aria-hidden="true" className="flex items-center justify-center">
            <span className="flex h-full min-h-10 flex-col items-center justify-center gap-1 text-faint md:px-2">
              <span className="h-6 w-px bg-edge md:h-full md:max-h-16" />
              <span className="rounded-full border border-edge bg-bg px-2.5 py-1 font-mono text-[0.7rem]">no audio</span>
              <span className="h-6 w-px bg-edge md:h-full md:max-h-16" />
            </span>
          </div>

          <div className="rounded-2xl border border-edge bg-card p-6">
            <p className="flex items-center gap-2.5 font-semibold text-ink">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan/10 text-cyan">
                <Icon name="spark" className="h-4 w-4" />
              </span>
              The internet
            </p>
            <ul className="mt-5 space-y-3">
              {ONLINE.map((c) => (
                <li key={c.what} className="text-ink">
                  {c.what} <span className="text-sm text-faint">({c.when})</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-mute">That&apos;s the whole list. No account, no tracking.</p>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-mute">
          Want to check?{" "}
          <a href={GITHUB_URL} className="font-semibold text-cyan underline decoration-cyan/40 underline-offset-4 transition hover:text-ink">
            The code is open
          </a>
          . The <a href="#faq" className="underline decoration-faint/50 underline-offset-2 hover:text-ink">FAQ</a> has the details.
        </p>
      </div>
    </section>
  );
}

export function VideoShowcase() {
  return (
    <section id="see-it">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <SectionHead eyebrow="See it" title="A quick tour" />
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
    <section id="faq" className="mx-auto max-w-3xl scroll-mt-28 px-6 py-20">
      <SectionHead eyebrow="FAQ" title="Questions" />
      <Faq items={FAQS} />
    </section>
  );
}

export function CTA({ release }: { release: Release }) {
  return (
    <section className="mx-auto max-w-4xl px-6 pb-24 text-center">
      <div className="rounded-3xl border border-edge bg-gradient-to-br from-cyan/10 via-card to-purple/10 px-6 py-12">
        <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
          Give it a try. <span className="gradient-text">It&apos;s free.</span>
        </h2>
        <p className="mx-auto mt-3 max-w-md text-mute">I use it every day. I hope you like it too.</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href={release.url} className={`inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-cyan to-purple px-7 py-3.5 font-semibold text-bg transition hover:brightness-110 ${FOCUS}`}>
            <DownloadIcon />
            Download v{release.version}<span className="hidden sm:inline">&nbsp;for Windows</span>
          </a>
          <KofiButton className="h-[3.25rem] px-6 text-base" />
        </div>
        <p className="mx-auto mt-5 max-w-lg text-sm text-faint">
          {release.sizeMb} MB. Windows may warn you because the installer isn&apos;t code-signed yet; you can check it against the{" "}
          <a href={release.checksumsUrl} className="underline decoration-faint/50 underline-offset-2 transition hover:text-ink">
            published checksums
          </a>
          .
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
      {/* More from n8builds: the push toward the rest of what I build */}
      <div className="mx-auto max-w-6xl px-6 pt-14">
        <a
          href={N8BUILDS_URL}
          className={`group flex flex-col items-start gap-4 rounded-2xl border border-edge bg-gradient-to-br from-cyan/[0.07] via-card to-card p-6 transition hover:border-cyan/40 sm:flex-row sm:items-center ${FOCUS}`}
        >
          <Image src="/n8builds-icon.png" alt="" width={48} height={48} className="rounded-xl ring-1 ring-white/10" />
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-ink">Scribe is one of my free tools on n8builds.dev</p>
            <p className="mt-1 text-sm text-mute">
              Chrome extensions, an uptime monitor, and more, all free and open source. Come see what else I&apos;m building.
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-edge-strong bg-bg px-4 py-2 text-sm font-semibold text-ink transition group-hover:border-cyan/60">
            Visit n8builds.dev ↗
          </span>
        </a>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-10 px-6 py-14 md:grid-cols-[minmax(0,1.2fr)_repeat(3,minmax(0,1fr))]">
        <div className="col-span-2 md:col-span-1">
          <Link href="/#top" className={`flex w-fit items-center gap-2.5 rounded-lg ${FOCUS}`}>
            <Image src="/scribe-icon.png" alt="" width={28} height={28} />
            <span className="font-bold tracking-tight text-ink">Scribe</span>
          </Link>
          <p className="mt-3 max-w-xs text-sm text-mute">Free speech-to-text for Windows, made by Nathan Watkins.</p>
          <div className="mt-4 flex items-center gap-2">
            <KofiButton />
            <a
              href={GITHUB_PROFILE_URL}
              aria-label="Nathan on GitHub"
              className={`flex h-9 w-9 items-center justify-center rounded-full border border-edge text-ink transition hover:border-cyan/60 ${FOCUS}`}
            >
              <GitHubIcon className="h-4 w-4" />
            </a>
          </div>
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

import Link from "next/link";
import Image from "next/image";
import {
  FAQS,
  GITHUB_PROFILE_URL,
  GITHUB_URL,
  KOFI_URL,
  N8BUILDS_URL,
  type Release,
} from "@/lib/site";
import { DownloadIcon, GitHubIcon, KofiIcon, StarIcon } from "@/components/Icons";
import { EditorDemo } from "@/components/EditorDemo";
import { Steps } from "@/components/Steps";
import { Faq } from "@/components/Faq";

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan";

/** The n8builds mark: the N8 icon and the name, linking home to n8builds.dev. */
function N8buildsMark({ label = "n8builds", className = "" }: { label?: string; className?: string }) {
  return (
    <a
      href={N8BUILDS_URL}
      className={`group inline-flex items-center gap-2 rounded-lg font-semibold leading-none tracking-tight text-mute transition hover:text-ink ${FOCUS} ${className}`}
    >
      <Image src="/n8builds-icon.png" alt="" width={24} height={24} className="rounded-md ring-1 ring-white/10 transition group-hover:ring-white/25" />
      <span>{label}</span>
    </a>
  );
}

/** Ko-fi on the page's own background, with Ko-fi's red cup. */
function KofiButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={KOFI_URL}
      className={`inline-flex h-9 items-center gap-1.5 rounded-full border border-edge bg-card px-3.5 text-sm font-semibold text-ink transition hover:border-[#ff5e5b]/60 ${FOCUS} ${className}`}
    >
      <KofiIcon className="h-5 w-5 text-[#ff5e5b]" />
      Ko-fi
    </a>
  );
}

/** Scribe's repo on GitHub: the star count first, then the GitHub mark and name. */
function StarButton({ stars }: { stars: number | null }) {
  return (
    <a
      href={GITHUB_URL}
      aria-label={stars == null ? "Scribe on GitHub" : `Scribe on GitHub, ${stars} ${stars === 1 ? "star" : "stars"}`}
      className={`inline-flex h-9 items-center overflow-hidden rounded-full border border-edge bg-card text-sm font-semibold text-ink transition hover:border-cyan/60 ${FOCUS}`}
    >
      {stars != null && (
        <span className="flex h-full items-center gap-1 border-r border-edge px-3 tabular-nums text-mute">
          <StarIcon className="h-3.5 w-3.5 text-[#e3b341]" />
          {stars.toLocaleString()}
        </span>
      )}
      <span className="flex items-center gap-1.5 px-3">
        <GitHubIcon className="h-[1.125rem] w-[1.125rem]" />
        GitHub
      </span>
    </a>
  );
}

export function Nav({ release, stars }: { release: Release; stars: number | null }) {
  return (
    <header className="sticky top-0 z-50 border-b border-edge/70 bg-bg/85 backdrop-blur">
      <nav aria-label="Primary" className="mx-auto flex max-w-6xl items-center gap-3 px-6 py-3">
        <Link href="/#top" className={`flex items-center gap-2.5 rounded-lg ${FOCUS}`}>
          <Image src="/scribe-icon.png" alt="" width={28} height={28} />
          <span className="font-bold leading-none tracking-tight">Scribe</span>
        </Link>
        <span aria-hidden="true" className="hidden h-5 w-px bg-edge sm:block" />
        <span className="hidden sm:flex">
          <N8buildsMark />
        </span>
        <div className="ml-auto hidden items-center gap-6 text-sm text-mute lg:flex">
          <Link href="/#how-it-works" className="transition hover:text-ink">How it works</Link>
          <Link href="/#private-by-design" className="transition hover:text-ink">Private by design</Link>
          <Link href="/#faq" className="transition hover:text-ink">FAQ</Link>
          <Link href="/whats-new" className="transition hover:text-ink">What&apos;s new</Link>
        </div>
        <div className="ml-auto flex items-center gap-2 lg:ml-4">
          <span className="hidden md:block">
            <KofiButton />
          </span>
          <span className="hidden sm:block">
            <StarButton stars={stars} />
          </span>
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
    <div data-reveal className="mx-auto max-w-2xl text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan">{eyebrow}</p>
      <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {children && <p className="mt-4 text-pretty text-mute">{children}</p>}
    </div>
  );
}

export function HowItWorks() {
  return (
    <section id="how-it-works" className="sep-glow sep-band scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <SectionHead eyebrow="How it works" title={<>Hold, talk, <span className="gradient-text">let go</span></>}>
          Your words land where you&apos;re typing, a phrase at a time, while you&apos;re still talking.
        </SectionHead>
        <div data-reveal className="mt-10">
          <EditorDemo />
        </div>
        <Steps />
      </div>
    </section>
  );
}

export function FAQ() {
  return (
    <section id="faq" className="sep-glow sep-band scroll-mt-20">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <SectionHead eyebrow="FAQ" title="Questions" />
        <Faq items={FAQS} />
      </div>
    </section>
  );
}

export function CTA({ release }: { release: Release }) {
  return (
    <section className="mx-auto max-w-4xl px-6 py-24 text-center">
      <div data-reveal className="rounded-3xl border border-edge bg-gradient-to-br from-cyan/10 via-card to-purple/10 px-6 py-12">
        <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
          Give it a try. <span className="gradient-text">It&apos;s free.</span>
        </h2>
        <p className="mx-auto mt-3 max-w-md text-mute">I use it every day. I hope you like it too.</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href={release.url} className={`inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-cyan to-purple px-7 py-3.5 font-semibold text-bg transition hover:brightness-110 ${FOCUS}`}>
            <DownloadIcon />
            <span>
              Download v{release.version}
              <span className="hidden sm:inline"> for Windows</span>
            </span>
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
        { label: "Private by design", href: "/#private-by-design" },
        { label: "Local AI", href: "/#local-ai" },
        { label: "Models", href: "/#models" },
        { label: "FAQ", href: "/#faq" },
        { label: "What's new", href: "/whats-new" },
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
          <p className="mt-3 max-w-xs text-sm text-mute">Free speech-to-text for Windows.</p>
          <div className="mt-4 flex items-center gap-2">
            <KofiButton />
            <a
              href={GITHUB_PROFILE_URL}
              aria-label="My GitHub profile, n8watkins"
              className={`inline-flex h-9 items-center gap-1.5 rounded-full border border-edge bg-card px-3.5 text-sm font-semibold text-ink transition hover:border-cyan/60 ${FOCUS}`}
            >
              <GitHubIcon className="h-[1.125rem] w-[1.125rem]" />
              n8watkins
            </a>
          </div>
        </div>
        {columns.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-ink">
              {c.title === "n8builds.dev" && (
                <Image src="/n8builds-icon.png" alt="" width={16} height={16} className="rounded ring-1 ring-white/10" />
              )}
              {c.title}
            </p>
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

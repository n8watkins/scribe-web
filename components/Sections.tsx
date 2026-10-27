import Image from "next/image";
import { FAQS, FEATURES, GITHUB_URL, N8BUILDS_URL, PRIVACY_POINTS, type Release } from "@/lib/site";
import { DownloadIcon, GitHubIcon, Icon } from "@/components/Icons";
import { DemoVideo } from "@/components/DemoVideo";
import { Kbd } from "@/components/Kbd";

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan";

export function Nav({ release }: { release: Release }) {
  return (
    <nav aria-label="Primary" className="sticky top-0 z-50 border-b border-edge/70 bg-bg/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-6 py-3.5">
        <a href="#top" className={`flex items-center gap-2.5 rounded-lg ${FOCUS}`}>
          <Image src="/scribe-icon.png" alt="" width={28} height={28} />
          <span className="font-bold tracking-tight">Scribe</span>
        </a>
        <div className="ml-auto hidden items-center gap-6 text-sm text-mute md:flex">
          <a href="#features" className="transition hover:text-ink">Features</a>
          <a href="#privacy" className="transition hover:text-ink">Privacy</a>
          <a href="#faq" className="transition hover:text-ink">FAQ</a>
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

/** Three steps, then what Scribe does, in six short cards. */
export function Features() {
  return (
    <section id="features" className="scroll-mt-16 border-y border-edge/60 bg-bg-2/40">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <SectionHead eyebrow="How it works" title={<>Three steps, <span className="gradient-text">no setup</span></>} />
        <ol className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            ["Hold", <>Press and hold <Kbd>Ctrl</Kbd> + <Kbd>Win</Kbd> in any app, or tap <Kbd>~</Kbd> to go hands-free.</>],
            ["Talk", <>whisper.cpp transcribes on your PC while you speak, phrase by phrase.</>],
            ["Let go", <>The text is typed where your cursor is. Nothing to copy or paste.</>],
          ].map(([title, body], i) => (
            <li key={String(title)} className="flex gap-4 rounded-2xl border border-edge bg-card p-5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan to-purple font-mono font-bold text-bg">
                {i + 1}
              </span>
              <div>
                <h3 className="font-semibold text-ink">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-mute">{body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
      </div>
    </section>
  );
}

export function Privacy() {
  return (
    <section id="privacy" className="mx-auto max-w-6xl scroll-mt-16 px-6 py-20">
      <SectionHead eyebrow="Privacy" title={<>Local means <span className="gradient-text">your PC does the work</span></>}>
        The whole dictation path runs on your machine, and you can see every step of it.
      </SectionHead>

      <ol aria-label="Where your voice goes" className="mt-10 grid grid-cols-1 overflow-hidden rounded-2xl border border-edge bg-card sm:grid-cols-4">
        {[
          ["Microphone", "Captures your speech"],
          ["Temporary audio", "Deleted after a successful result"],
          ["whisper.cpp", "Transcribes on this PC"],
          ["Your cursor", "Gets the finished text"],
        ].map(([title, body], index) => (
          <li key={title} className="relative border-b border-edge p-5 last:border-b-0 sm:border-r sm:border-b-0 sm:last:border-r-0">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan/10 font-mono text-sm font-bold text-cyan">{index + 1}</span>
              <span className="font-semibold text-ink">{title}</span>
            </div>
            <p className="mt-2 pl-11 text-sm text-mute">{body}</p>
            {index < 3 && <span aria-hidden="true" className="absolute -right-2.5 top-1/2 z-10 hidden h-5 w-5 -translate-y-1/2 rotate-45 border-r border-t border-edge bg-card sm:block" />}
          </li>
        ))}
      </ol>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {PRIVACY_POINTS.map((point) => (
          <article key={point.title} className="rounded-2xl border border-edge bg-card p-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-green/30 bg-green/10 text-green">
              <Icon name={point.icon} />
            </span>
            <h3 className="mt-4 font-semibold text-ink">{point.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-mute">{point.body}</p>
          </article>
        ))}
      </div>

      <p className="mt-6 rounded-2xl border border-purple/30 bg-purple/5 p-5 text-sm leading-relaxed text-mute">
        <span className="font-semibold text-ink">What can use the network?</span> Model downloads you start, update
        checks, GitHub sign-in and backup if you turn them on, and the optional AI tools, which go to the server URL you
        set. Your audio never does.
      </p>
    </section>
  );
}

/** The full tour, and the privacy story, as the app's own recordings (controls, no autoplay). */
export function VideoShowcase() {
  return (
    <section id="see-it" className="border-y border-edge/60 bg-bg-2/40">
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
      <div className="mt-10 space-y-3">
        {FAQS.map((item) => (
          <details key={item.question} className="group rounded-2xl border border-edge bg-card open:border-cyan/40 open:bg-card-2">
            <summary className={`flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-6 py-5 font-semibold text-ink marker:content-none ${FOCUS}`}>
              {item.question}
              <span aria-hidden="true" className="text-xl font-normal text-cyan transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="px-6 pb-6 pr-14 leading-relaxed text-mute">{item.answer}</p>
          </details>
        ))}
      </div>
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

export function Footer() {
  return (
    <footer className="border-t border-edge/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-faint sm:flex-row">
        <div className="flex items-center gap-2">
          <Image src="/scribe-icon.png" alt="" width={22} height={22} />
          <span>Scribe, private local dictation for Windows</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <a href="#privacy" className="transition hover:text-ink">Privacy</a>
          <a href="#faq" className="transition hover:text-ink">FAQ</a>
          <a href={GITHUB_URL} className="transition hover:text-ink">GitHub</a>
          <a href={N8BUILDS_URL + "/builds/scribe"} className="transition hover:text-cyan">How it was built, on n8builds.dev ↗</a>
        </div>
      </div>
    </footer>
  );
}

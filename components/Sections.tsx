import Image from "next/image";
import {
  DOWNLOAD_URL,
  FAQS,
  FEATURES,
  GITHUB_URL,
  N8BUILDS_URL,
  PRIVACY_POINTS,
  STEPS,
} from "@/lib/site";

export function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-edge/70 bg-bg/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-6 py-3.5">
        <Image src="/scribe-icon.png" alt="" width={28} height={28} />
        <span className="font-bold tracking-tight">Scribe</span>
        <span className="ml-1 hidden text-sm text-faint lg:inline">· private local dictation</span>
        <div className="ml-auto hidden items-center gap-5 text-sm text-mute md:flex">
          <a href="#how" className="transition hover:text-ink">How it works</a>
          <a href="#privacy" className="transition hover:text-ink">Privacy</a>
          <a href="#faq" className="transition hover:text-ink">FAQ</a>
        </div>
        <div className="flex items-center gap-2 md:ml-2">
          <a href={GITHUB_URL} className="rounded-full border border-edge px-4 py-1.5 text-sm font-medium text-ink transition hover:border-cyan/60">⭐ Star</a>
          <a href={DOWNLOAD_URL} className="rounded-full bg-gradient-to-r from-cyan to-purple px-4 py-1.5 text-sm font-semibold text-bg transition hover:brightness-110">Download</a>
        </div>
      </div>
    </nav>
  );
}

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="text-center text-3xl sm:text-4xl font-bold tracking-tight">
        Everything happens <span className="gradient-text">on your machine</span>
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-center text-mute">
        Powerful where it counts, private by default. Opt into the cloud only if you want to.
      </p>
      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((f) => (
          <div key={f.title} className="rounded-2xl border border-edge bg-card p-5 transition hover:border-cyan/40 hover:bg-card-2">
            <div className="text-3xl">{f.icon}</div>
            <h3 className="mt-3 font-semibold text-ink">{f.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-mute">{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function HowItWorks() {
  return (
    <section id="how" className="border-y border-edge/60 bg-bg-2/40">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-center text-3xl sm:text-4xl font-bold tracking-tight">How it works</h2>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n} className="relative rounded-2xl border border-edge bg-card p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan to-purple text-xl font-bold text-bg">
                {s.n}
              </div>
              <h3 className="mt-5 text-xl font-semibold text-ink">{s.title}</h3>
              <p className="mt-2 text-mute">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Privacy() {
  return (
    <section id="privacy" className="border-y border-edge/60 bg-bg-2/40 scroll-mt-16">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan">Privacy, made concrete</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Local means <span className="gradient-text">your PC does the work</span>
          </h2>
          <p className="mt-4 text-mute">
            Scribe keeps the core dictation path short, visible, and under your control.
          </p>
        </div>

        <ol aria-label="Scribe's local dictation data flow" className="mt-10 grid grid-cols-1 overflow-hidden rounded-2xl border border-edge bg-card sm:grid-cols-4">
          {[
            ["1", "Microphone", "Capture your speech"],
            ["2", "Temporary audio", "Delete it after a successful result"],
            ["3", "Local Whisper", "Transcribe on this PC"],
            ["4", "Your cursor", "Insert the finished text"],
          ].map(([number, title, body], index) => (
            <li key={title} className="relative border-b border-edge p-5 last:border-b-0 sm:border-r sm:border-b-0 sm:last:border-r-0">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan/10 font-mono text-sm font-bold text-cyan">{number}</span>
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
              <span aria-hidden="true" className="text-2xl">{point.icon}</span>
              <h3 className="mt-3 font-semibold text-ink">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mute">{point.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-purple/30 bg-purple/5 p-6 sm:flex sm:items-start sm:gap-5">
          <span aria-hidden="true" className="text-2xl">🌐</span>
          <div className="mt-3 sm:mt-0">
            <h3 className="font-semibold text-ink">What can use the network?</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-mute">
              Model downloads you start, update checks, GitHub authorization and backup when enabled, and optional AI features pointed at the server URL you configure. Core transcription does not send audio or text to a Scribe cloud service.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const VIDEOS: { src: string; label: string }[] = [
  { src: "/videos/Scribe-15a.mp4", label: "Talk. It types." },
  { src: "/videos/Scribe-30a.mp4", label: "Full tour" },
  { src: "/videos/Scribe-15b.mp4", label: "Private by design" },
  { src: "/videos/Scribe-30b.mp4", label: "Privacy first" },
];

export function VideoShowcase() {
  return (
    <section id="see-it" className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="text-center text-3xl sm:text-4xl font-bold tracking-tight">
        See it <span className="gradient-text">in motion</span>
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-center text-mute">A few seconds is all it takes to get it.</p>
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {VIDEOS.map((v) => (
          <figure key={v.src} className="overflow-hidden rounded-2xl border border-edge bg-card">
            <video
              className="aspect-video w-full bg-bg-2"
              controls
              playsInline
              muted
              preload="metadata"
              poster="/scribe-icon.png"
            >
              <source src={v.src} type="video/mp4" />
            </video>
            <figcaption className="px-4 py-3 text-sm text-mute">{v.label}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export function FAQ() {
  return (
    <section id="faq" className="mx-auto max-w-4xl scroll-mt-16 px-6 py-20">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan">Straight answers</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Frequently asked questions</h2>
        <p className="mx-auto mt-4 max-w-2xl text-mute">
          The practical details about privacy, connectivity, storage, and installing Scribe.
        </p>
      </div>
      <div className="mt-10 space-y-3">
        {FAQS.map((item) => (
          <details key={item.question} className="group rounded-2xl border border-edge bg-card open:border-cyan/40 open:bg-card-2">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-semibold text-ink marker:content-none">
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

export function CTA() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-20 text-center">
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
        Your voice. Your machine. <span className="gradient-text">Your data.</span>
      </h2>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <a href={GITHUB_URL} className="rounded-full bg-gradient-to-r from-cyan to-purple px-7 py-3.5 font-semibold text-bg transition hover:brightness-110">⭐ Star on GitHub</a>
        <a href={DOWNLOAD_URL} className="rounded-full border border-edge-strong bg-card px-7 py-3.5 font-semibold text-ink transition hover:border-cyan/60">↓ Download for Windows</a>
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
          <span>Scribe - private local dictation</span>
        </div>
        <div className="flex items-center gap-5">
          <a href="#privacy" className="transition hover:text-ink">Privacy</a>
          <a href="#faq" className="transition hover:text-ink">FAQ</a>
          <a href={GITHUB_URL} className="transition hover:text-ink">GitHub</a>
          <a href={DOWNLOAD_URL} className="transition hover:text-ink">Download</a>
          <a href={N8BUILDS_URL} className="transition hover:text-cyan">built by n8builds ↗</a>
        </div>
      </div>
    </footer>
  );
}

import Image from "next/image";
import { FEATURES, STEPS, GITHUB_URL, DOWNLOAD_URL, N8BUILDS_URL } from "@/lib/site";

export function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-edge/70 bg-bg/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-6 py-3.5">
        <Image src="/scribe-icon.png" alt="" width={28} height={28} />
        <span className="font-bold tracking-tight">Scribe</span>
        <span className="ml-1 hidden text-sm text-faint sm:inline">· private local dictation</span>
        <div className="ml-auto flex items-center gap-2">
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
          <a href={GITHUB_URL} className="transition hover:text-ink">GitHub</a>
          <a href={DOWNLOAD_URL} className="transition hover:text-ink">Download</a>
          <a href={N8BUILDS_URL} className="transition hover:text-cyan">built by n8builds ↗</a>
        </div>
      </div>
    </footer>
  );
}

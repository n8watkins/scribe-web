import { GITHUB_URL, type Release } from "@/lib/site";
import { CheckIcon, GitHubIcon } from "@/components/Icons";
import { DemoVideo } from "@/components/DemoVideo";
import { DownloadButton, DownloadDetails, HoldKeys } from "@/components/Download";

// The hero says it in one line, then shows it: the real 15-second demo
// (muted and looping, playing on its own unless reduced motion is asked for),
// beside the download for the visitor's system with its real version and
// size from the latest release.
export function Hero({ release, stars }: { release: Release; stars: number | null }) {
  return (
    <section className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 pt-14 pb-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:pt-24">
      <div className="text-center lg:text-left">
        <span style={{ "--d": "0ms" } as React.CSSProperties} className="rise inline-flex items-center gap-2 rounded-full border border-edge bg-card/70 px-3 py-1 text-sm text-mute">
          <span className="h-2 w-2 rounded-full bg-green shadow-[0_0_10px_var(--color-green)]" aria-hidden="true" />
          <span>
            Free speech-to-text<span className="hidden sm:inline"> for Windows, Mac and Linux</span>
          </span>
        </span>
        <h1 style={{ "--d": "90ms" } as React.CSSProperties} className="rise mt-6 text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl xl:text-7xl">
          Talk. <span className="gradient-text">It types.</span>
        </h1>
        <p style={{ "--d": "180ms" } as React.CSSProperties} className="rise mx-auto mt-5 max-w-xl text-lg text-mute sm:text-xl lg:mx-0">
          Hold <HoldKeys />, talk, and let go. Your words show up wherever you&apos;re typing.
          It all runs <span className="font-semibold text-ink">on your PC</span>, so your voice never leaves it.
        </p>

        <div style={{ "--d": "270ms" } as React.CSSProperties} className="rise mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
          <DownloadButton release={release} />
          <a
            href={GITHUB_URL}
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-edge-strong bg-card px-6 py-3.5 font-semibold text-ink transition hover:border-cyan/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
          >
            <GitHubIcon />
            Source on GitHub
            {stars != null && stars >= 10 && (
              <span className="rounded-full bg-bg-2 px-2 py-0.5 text-sm tabular-nums text-mute">
                ★ {stars.toLocaleString()}
              </span>
            )}
          </a>
        </div>
        <div style={{ "--d": "360ms" } as React.CSSProperties} className="rise">
          <div className="mt-5">
            <DownloadDetails release={release} />
          </div>
          <ul className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-sm text-mute lg:justify-start">
            {["Free and open source", "No account", "Works offline"].map((item) => (
              <li key={item} className="flex items-center gap-1.5">
                <CheckIcon className="h-4 w-4 text-green" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <DemoVideo
        className="rise [--d:200ms]"
        src="/videos/Scribe-15a.mp4"
        poster="/posters/scribe-15a.webp"
        label="Scribe in 15 seconds: hold Ctrl + Win, talk, and the words appear at the cursor"
      />
    </section>
  );
}

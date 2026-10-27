import { GITHUB_URL, MAC_LINUX_REQUEST_URL, type Release } from "@/lib/site";
import { DownloadIcon, GitHubIcon, WindowsIcon } from "@/components/Icons";
import { DemoVideo } from "@/components/DemoVideo";
import { Kbd } from "@/components/Kbd";

// The hero says it in one line, then shows it: the real 15-second demo
// (muted and looping, playing on its own unless reduced motion is asked for),
// beside the download with its real version and size from the latest release.
export function Hero({ release, stars }: { release: Release; stars: number | null }) {
  return (
    <section className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 pt-14 pb-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:pt-24">
      <div className="text-center lg:text-left">
        <span className="inline-flex items-center gap-2 rounded-full border border-edge bg-card/70 px-3 py-1 text-sm text-mute">
          <span className="h-2 w-2 rounded-full bg-green shadow-[0_0_10px_var(--color-green)]" aria-hidden="true" />
          Free speech-to-text for Windows
        </span>
        <h1 className="mt-6 text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl xl:text-7xl">
          Talk. <span className="gradient-text">It types.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-mute sm:text-xl lg:mx-0">
          Hold <Kbd>Ctrl</Kbd> + <Kbd>Win</Kbd>, talk, and let go. Your words show up wherever you&apos;re typing.
          It all runs <span className="font-semibold text-ink">on your PC</span>, so your voice never leaves it.
        </p>

        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
          <a
            href={release.url}
            className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-full bg-gradient-to-r from-cyan to-purple px-7 py-3.5 font-semibold text-bg shadow-lg shadow-cyan/20 transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
          >
            <DownloadIcon />
            Download for Windows
          </a>
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
        <p className="mt-5 flex items-center justify-center gap-2 text-sm text-faint lg:justify-start">
          <WindowsIcon />
          v{release.version} · {release.sizeMb} MB · Windows 10 and 11, 64-bit
        </p>
        <p className="mt-1.5 text-sm text-faint">Free and open source · no account · no tracking</p>
        <p className="mt-1.5 text-sm text-faint">
          On a Mac or Linux?{" "}
          <a href={MAC_LINUX_REQUEST_URL} className="text-mute underline decoration-faint/50 underline-offset-2 transition hover:text-ink">
            Ask for it
          </a>
        </p>
      </div>

      <DemoVideo
        src="/videos/Scribe-15a.mp4"
        poster="/posters/scribe-15a.webp"
        zoom={{ scale: 1.25, origin: "50% 70%" }}
        label="Scribe in 15 seconds: hold Ctrl + Win, talk, and the words appear at the cursor"
      />
    </section>
  );
}

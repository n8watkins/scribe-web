import Link from "next/link";
import type { Metadata } from "next";
import { DownloadIcon } from "@/components/Icons";
import { Footer, Nav } from "@/components/Sections";
import { getRelease, getStarCount } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found - Scribe",
  robots: { index: false },
};

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan";

// Served for every unknown path with a real 404 status: the static export
// writes it to out/404.html and wrangler.jsonc's not_found_handling uses it.
export default async function NotFound() {
  const [release, stars] = await Promise.all([getRelease(), getStarCount()]);
  return (
    <>
      <Nav release={release} stars={stars} />
      <main id="top" className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 py-20 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan">404 - page not found</p>
        <h1 className="mt-3 text-balance text-4xl font-bold tracking-tight sm:text-5xl">Nothing to type out here.</h1>
        <p className="mt-4 max-w-md text-pretty text-lg text-mute">
          This page doesn&apos;t exist. Everything about Scribe is on the home page, and the download is one click away.
        </p>
        <div className="mt-9 flex w-full max-w-xs flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row">
          <a
            href={release.url}
            className={`inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-gradient-to-r from-cyan to-purple px-7 py-3.5 font-semibold text-bg shadow-lg shadow-cyan/20 transition hover:brightness-110 ${FOCUS}`}
          >
            <DownloadIcon />
            Download for Windows
          </a>
          <Link
            href="/"
            className={`inline-flex items-center justify-center whitespace-nowrap rounded-full border border-edge-strong bg-card px-6 py-3.5 font-semibold text-ink transition hover:border-cyan/60 ${FOCUS}`}
          >
            Go to the home page
          </Link>
        </div>
      </main>
      <Footer release={release} />
    </>
  );
}

import Link from "next/link";
import type { Metadata } from "next";
import { Footer, Nav } from "@/components/Sections";
import { getRelease, GITHUB_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy - Scribe",
  description: "What scribe.n8builds.dev collects (nothing of its own) and how the Scribe app handles your data.",
  alternates: { canonical: "/privacy" },
};

const UPDATED = "October 27, 2026";

// The site's privacy policy, and a pointer to the app's own data handling
// (the home page's "Private by design" section has the full detail).
export default async function PrivacyPage() {
  const release = await getRelease();
  return (
    <>
      <Nav release={release} />
      <main id="top" className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan">Privacy policy</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Nothing to track</h1>
        <p className="mt-3 text-sm text-faint">Last updated {UPDATED}</p>

        <div className="mt-10 space-y-10 leading-relaxed text-mute">
          <section>
            <h2 className="text-xl font-semibold text-ink">This website</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>
                <span className="text-ink">No cookies.</span> scribe.n8builds.dev sets none, so there is no cookie banner
                to click through.
              </li>
              <li>
                <span className="text-ink">No analytics or trackers.</span> No Google Analytics, no pixels, no
                fingerprinting, and nothing stored in your browser.
              </li>
              <li>
                <span className="text-ink">No third parties.</span> Every file the page loads, fonts and videos
                included, comes from this site itself.
              </li>
              <li>
                <span className="text-ink">Hosting.</span> The site is served by Vercel, which handles standard request
                data (such as your IP address and browser) to deliver the page and protect it from abuse. I don&apos;t
                use that data to identify or follow you.
              </li>
              <li>
                <span className="text-ink">Downloads.</span> The download and source links go to GitHub, which has its own
                privacy policy.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-ink">The Scribe app</h2>
            <p className="mt-4">
              Scribe has no account and no telemetry. Your audio is transcribed on your PC and deleted once the text is
              ready, and your history stays in a local database you control. The app only connects out to check for
              updates, to download a model you pick, and to the optional GitHub backup and AI tools if you turn them on.
            </p>
            <p className="mt-3">
              <Link href="/#private-by-design" className="font-semibold text-cyan underline decoration-cyan/40 underline-offset-4 hover:text-ink">
                See every connection it makes
              </Link>
              , or read the{" "}
              <a href={GITHUB_URL} className="font-semibold text-cyan underline decoration-cyan/40 underline-offset-4 hover:text-ink">
                source code
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-ink">Questions</h2>
            <p className="mt-4">
              Email{" "}
              <a href="mailto:contact@n8builds.dev" className="font-semibold text-cyan underline decoration-cyan/40 underline-offset-4 hover:text-ink">
                contact@n8builds.dev
              </a>
              . If this policy changes, the date above changes with it.
            </p>
          </section>
        </div>
      </main>
      <Footer release={release} />
    </>
  );
}

import type { Metadata } from "next";
import { Footer, Nav } from "@/components/Sections";
import { getChangelog, parseInline, type Block } from "@/lib/changelog";
import { getRelease, getStarCount, GITHUB_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "What's new - Scribe",
  description: "Release notes for every Scribe version: new features, fixes and privacy improvements.",
  alternates: { canonical: "/whats-new" },
};

const LINK = "font-semibold text-cyan underline decoration-cyan/40 underline-offset-4 hover:text-ink";

function formatDate(date: string): string {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

function Text({ text }: { text: string }) {
  return (
    <>
      {parseInline(text).map((piece, i) => {
        switch (piece.kind) {
          case "strong":
            // Bold text can hold code or links ("**Full-precision `large-v3-turbo`**").
            return <strong key={i} className="font-semibold text-ink"><Text text={piece.text} /></strong>;
          case "em":
            return <em key={i}>{piece.text}</em>;
          case "code":
            return <code key={i} className="rounded bg-card-2 px-1.5 py-0.5 font-mono text-[0.85em] text-ink">{piece.text}</code>;
          case "link":
            return <a key={i} href={piece.href} className={LINK}>{piece.text}</a>;
          default:
            return <span key={i}>{piece.text}</span>;
        }
      })}
    </>
  );
}

/** Groups consecutive bullets into lists so each renders as one <ul>. */
function Blocks({ blocks }: { blocks: Block[] }) {
  const groups: (Block | Block[])[] = [];
  for (const block of blocks) {
    const last = groups[groups.length - 1];
    if (block.kind === "li" && Array.isArray(last)) last.push(block);
    else groups.push(block.kind === "li" ? [block] : block);
  }
  return (
    <div className="mt-5 space-y-4">
      {groups.map((group, i) =>
        Array.isArray(group) ? (
          <ul key={i} className="list-disc space-y-2 pl-5 marker:text-faint">
            {group.map((item, j) => (
              <li key={j}><Text text={item.text} /></li>
            ))}
          </ul>
        ) : group.kind === "h" ? (
          <h3 key={i} className="pt-2 text-sm font-semibold uppercase tracking-[0.14em] text-cyan">{group.text}</h3>
        ) : (
          <p key={i}><Text text={group.text} /></p>
        ),
      )}
    </div>
  );
}

// Release notes for each version, read from the app's CHANGELOG.md at build time (hourly).
export default async function WhatsNewPage() {
  const [release, stars, entries] = await Promise.all([getRelease(), getStarCount(), getChangelog()]);
  return (
    <>
      <Nav release={release} stars={stars} />
      <main id="top" className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan">Scribe</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">What&apos;s new</h1>
        <p className="mt-4 leading-relaxed text-mute">
          Every Scribe release, newest first. Installed copies update themselves, so you get these changes the next
          time you start Scribe.
        </p>

        {entries && entries.length > 0 ? (
          <div className="mt-12 space-y-14">
            {entries.map((entry) => (
              <article key={entry.version} id={`v${entry.version}`} className="scroll-mt-24 border-t border-edge pt-10 leading-relaxed text-mute">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h2 className="text-2xl font-bold tracking-tight text-ink">
                    <a href={`#v${entry.version}`} className="hover:text-cyan">Version {entry.version}</a>
                  </h2>
                  {entry.date ? (
                    <time dateTime={entry.date} className="text-sm text-faint">{formatDate(entry.date)}</time>
                  ) : null}
                  {entry.version === release.version ? (
                    <span className="rounded-full border border-cyan/40 px-2.5 py-0.5 text-xs font-semibold text-cyan">Latest</span>
                  ) : null}
                </div>
                <Blocks blocks={entry.blocks} />
              </article>
            ))}
          </div>
        ) : (
          <p className="mt-12 leading-relaxed text-mute">
            The release notes couldn&apos;t be loaded right now. They&apos;re also on{" "}
            <a href={`${GITHUB_URL}/releases`} className={LINK}>GitHub</a>.
          </p>
        )}

        <p className="mt-16 border-t border-edge pt-8 text-sm text-faint">
          Earlier versions are in the{" "}
          <a href={`${GITHUB_URL}/blob/main/CHANGELOG.md`} className={LINK}>full changelog</a>.
        </p>
      </main>
      <Footer release={release} />
    </>
  );
}

import { REPO } from "@/lib/site";

// The app's CHANGELOG.md is the single source of release notes: release-kit
// writes it, and each GitHub release body is a copy of its section.
const CHANGELOG_URL = `https://raw.githubusercontent.com/${REPO}/main/CHANGELOG.md`;

// Older sections are developer notes from before the user-facing format.
const OLDEST_SHOWN = [0, 6, 0];

/** One line of a section: a paragraph, a heading, or a bullet. */
export type Block =
  | { kind: "p"; text: string }
  | { kind: "h"; text: string }
  | { kind: "li"; text: string };

export type ChangelogEntry = { version: string; date: string | null; blocks: Block[] };

/** Inline pieces of a line: plain text, bold, italic, code, or a link. */
export type Inline =
  | { kind: "text"; text: string }
  | { kind: "strong"; text: string }
  | { kind: "em"; text: string }
  | { kind: "code"; text: string }
  | { kind: "link"; text: string; href: string };

export async function getChangelog(): Promise<ChangelogEntry[] | null> {
  try {
    const res = await fetch(CHANGELOG_URL, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return parseChangelog(await res.text());
  } catch {
    return null;
  }
}

function versionParts(version: string): number[] {
  return version.split(".").map((part) => Number.parseInt(part, 10) || 0);
}

function isShown(version: string): boolean {
  const parts = versionParts(version);
  for (let i = 0; i < 3; i += 1) {
    if (parts[i] !== OLDEST_SHOWN[i]) return parts[i] > OLDEST_SHOWN[i];
  }
  return true;
}

/** Splits CHANGELOG.md into versions ("## 1.2.3 - 2026-10-28") and their blocks. */
export function parseChangelog(markdown: string): ChangelogEntry[] {
  const entries: ChangelogEntry[] = [];
  let current: ChangelogEntry | null = null;
  // A wrapped line continues the paragraph or bullet above it.
  let open: Block | null = null;

  for (const raw of markdown.split(/\r?\n/)) {
    const line = raw.replace(/—/g, "-");
    const version = /^##\s+(\d+\.\d+\.\d+)(?:\s+-\s+(\d{4}-\d{2}-\d{2}))?/.exec(line);
    if (version) {
      current = { version: version[1], date: version[2] ?? null, blocks: [] };
      entries.push(current);
      open = null;
      continue;
    }
    if (!current || /^#\s/.test(line)) continue;

    const trimmed = line.trim();
    if (!trimmed) {
      open = null;
      continue;
    }
    const heading = /^###\s+(.+)$/.exec(trimmed) ?? /^\*\*([^*]+)\*\*$/.exec(trimmed);
    const bullet = /^[-*]\s+(.+)$/.exec(trimmed);
    if (heading) {
      current.blocks.push({ kind: "h", text: heading[1] });
      open = null;
    } else if (bullet) {
      open = { kind: "li", text: bullet[1] };
      current.blocks.push(open);
    } else if (open) {
      open.text = `${open.text} ${trimmed}`;
    } else {
      open = { kind: "p", text: trimmed };
      current.blocks.push(open);
    }
  }
  return entries.filter((entry) => isShown(entry.version));
}

/** Splits a line into bold, italic, code and link pieces. */
export function parseInline(text: string): Inline[] {
  const pieces: Inline[] = [];
  const pattern = /\*\*([^*]+)\*\*|`([^`]+)`|\[([^\]]+)\]\(([^)\s]+)\)|\*([^*\s][^*]*)\*/g;
  let last = 0;
  for (const match of text.matchAll(pattern)) {
    const index = match.index ?? 0;
    if (index > last) pieces.push({ kind: "text", text: text.slice(last, index) });
    if (match[1] !== undefined) pieces.push({ kind: "strong", text: match[1] });
    else if (match[2] !== undefined) pieces.push({ kind: "code", text: match[2] });
    else if (match[3] !== undefined) pieces.push({ kind: "link", text: match[3], href: match[4] });
    else pieces.push({ kind: "em", text: match[5] });
    last = index + match[0].length;
  }
  if (last < text.length) pieces.push({ kind: "text", text: text.slice(last) });
  return pieces;
}

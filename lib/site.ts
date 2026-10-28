export const SITE_URL = "https://scribe.n8builds.dev";
export const REPO = "n8watkins/scribe";
export const GITHUB_URL = `https://github.com/${REPO}`;
export const DOWNLOAD_URL = `${GITHUB_URL}/releases/latest`;
export const N8BUILDS_URL = "https://n8builds.dev";
export const KOFI_URL = "https://ko-fi.com/n8watkins";
export const GITHUB_PROFILE_URL = "https://github.com/n8watkins";
// A prefilled GitHub issue: the same "ask for it" link as Scribe's row on n8builds.dev.
export const MAC_LINUX_REQUEST_URL = `${GITHUB_URL}/issues/new?title=${encodeURIComponent(
  "Request: Scribe for macOS or Linux"
)}&body=${encodeURIComponent(
  "Which platform would you use Scribe on (macOS or Linux, and which version)?\n\nWhat would you use it for?"
)}`;

export type IconName =
  | "lock"
  | "chip"
  | "clipboard"
  | "keyboard"
  | "pill"
  | "spark"
  | "history"
  | "shield"
  | "mic"
  | "file"
  | "chart"
  | "refresh"
  | "cloudDown"
  | "github"
  | "monitor"
  | "globe";

/** An answer can end with one link, shown as a button (the Mac and Linux request). */
export type FaqItem = { question: string; answer: string; link?: { label: string; href: string } };

/** The latest Windows release, read from GitHub at build time (hourly). */
export type Release = { version: string; url: string; sizeMb: number; checksumsUrl: string };

// Used when GitHub can't be reached at build time: the release live on 2026-10-28.
const FALLBACK_RELEASE: Release = {
  version: "0.9.0",
  url: `${GITHUB_URL}/releases/download/v0.9.0/Scribe_0.9.0_x64-setup.exe`,
  sizeMb: 13,
  checksumsUrl: `${GITHUB_URL}/releases/download/v0.9.0/SHA256SUMS.txt`,
};

export async function getRelease(): Promise<Release> {
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return FALLBACK_RELEASE;
    const data = (await res.json()) as {
      tag_name?: string;
      assets?: { name: string; size: number; browser_download_url: string }[];
    };
    const setup = data.assets?.find((asset) => /x64-setup\.exe$/.test(asset.name));
    const sums = data.assets?.find((asset) => asset.name === "SHA256SUMS.txt");
    if (!data.tag_name || !setup) return FALLBACK_RELEASE;
    return {
      version: data.tag_name.replace(/^v/, ""),
      url: setup.browser_download_url,
      sizeMb: Math.round(setup.size / 1_000_000),
      checksumsUrl: sums?.browser_download_url ?? DOWNLOAD_URL,
    };
  } catch {
    return FALLBACK_RELEASE;
  }
}

// Ordered by what people ask before installing; the page itself covers
// models, updates and the AI tools, so they aren't repeated here.
export const FAQS: FaqItem[] = [
  {
    question: "Is it really free?",
    answer:
      "Yes. Scribe is free and open source (MIT), with no account, no subscription and no limits. If it helps you, you can buy me a coffee on Ko-fi.",
  },
  {
    question: "Does my voice ever leave my PC?",
    answer:
      "No. Your voice is recorded and turned into text on your PC, and the audio never leaves it. Each recording is kept on your PC so you can play it back in History, and is deleted with its transcript (after 30 days by default). Turn off \u201cSave raw audio clips\u201d to delete recordings as soon as the text is ready.",
  },
  {
    question: "Why does Windows warn me when I install it?",
    answer:
      "The installer isn't code-signed yet, so Windows SmartScreen may call it an unrecognized app. Choose \u201cMore info\u201d, then \u201cRun anyway\u201d. Only download Scribe from here or its GitHub page, where you can see the code and check every release.",
  },
  {
    question: "What do I need to run it?",
    answer:
      "A 64-bit Windows 10 or 11 PC and a microphone. The default speech model is 190 MB. A graphics card makes the bigger models fast, but you don't need one.",
  },
  {
    question: "Does it work offline?",
    answer:
      "Yes. Once a speech model is downloaded, dictation works with no internet at all.",
  },
  {
    question: "Want it on Mac or Linux?",
    answer:
      "Scribe is Windows-only for now. Open a request on GitHub and say which system you use. The requests decide what comes next.",
    link: { label: "Open a request", href: MAC_LINUX_REQUEST_URL },
  },
  {
    question: "What does the GitHub backup upload?",
    answer:
      "Nothing until you connect it. Then Scribe saves your notes as Markdown files in a private GitHub repo that you own, and your transcripts too if you choose. It checks the repo is private, and it never uploads audio.",
  },
];

export async function getStarCount(): Promise<number | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}`, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { stargazers_count?: number };
    return typeof data.stargazers_count === "number" ? data.stargazers_count : null;
  } catch {
    return null;
  }
}

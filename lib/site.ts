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

// Used when GitHub can't be reached at build time: the release live on 2026-10-27.
const FALLBACK_RELEASE: Release = {
  version: "0.8.0",
  url: `${GITHUB_URL}/releases/download/v0.8.0/Scribe_0.8.0_x64-setup.exe`,
  sizeMb: 12,
  checksumsUrl: `${GITHUB_URL}/releases/download/v0.8.0/SHA256SUMS.txt`,
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

export const FAQS: FaqItem[] = [
  {
    question: "Does Scribe send my voice to the cloud?",
    answer:
      "No. Your voice is recorded and turned into text on your PC with whisper.cpp, and the audio never leaves it. Each recording is kept on your PC so you can play it back in History, and is deleted with its transcript (after 30 days by default). Turn off \u201cSave raw audio clips\u201d to delete recordings as soon as the text is ready.",
  },
  {
    question: "Does it work without the internet?",
    answer:
      "Yes. Once you've downloaded a speech model, dictation works offline. Scribe only goes online to check for updates, to download a model you pick, and for the GitHub backup or AI tools if you turn them on.",
  },
  {
    question: "Which speech models can I use?",
    answer:
      "OpenAI's Whisper models, run on your PC by whisper.cpp. Scribe starts with Small English (190 MB), a good balance of speed and accuracy. In the app you can switch to English-only Tiny, Base, Small or Medium (78 MB to 1.5 GB), the multilingual version of each, or Large v3 Turbo for the best accuracy (574 MB or 1.6 GB). Each one downloads once, from Hugging Face, and is checked against its known size.",
  },
  {
    question: "How does Scribe update?",
    answer:
      "It checks Scribe's GitHub releases when it starts, when you come back to it, and every 6 hours. When there's a new version, it installs the signed update the next time you open Scribe, never in the middle of your work. Both are switches in About: \u201cAutomatically check for updates\u201d and \u201cInstall updates automatically\u201d.",
  },
  {
    question: "Where are my transcripts saved?",
    answer:
      "In a small database in Scribe's app folder on your PC. From the settings you can open that folder, clear your history, or stop saving it at all.",
  },
  {
    question: "What does the GitHub backup upload?",
    answer:
      "It's off unless you turn it on. When it's on, Scribe saves your notes as Markdown files in a private GitHub repo that you own, and your transcripts too if you choose. It never uploads audio.",
  },
  {
    question: "What happens to my text with the AI tools?",
    answer:
      "Nothing, unless you turn on \u201cAnalyze notes with a local LLM\u201d in Settings. Then each note gets an Analyze button: Scribe sends that one note's text to the AI server you set, which by default sums it up and lists any action items (you can change what it asks). Out of the box the server is LM Studio on your own PC, and Ollama works too. If you point it at an online service instead, the text goes there.",
  },
  {
    question: "Do I need an account?",
    answer:
      "No. Scribe is free and open source, with no account and no subscription. You only need a GitHub account if you want the backup.",
  },
  {
    question: "Want it on Mac or Linux?",
    answer:
      "Scribe is Windows-only for now (64-bit Windows 10 and 11). Open a request on GitHub and say which system you use. The requests decide what comes next.",
    link: { label: "Open a request", href: MAC_LINUX_REQUEST_URL },
  },
  {
    question: "Why does Windows warn me when I install it?",
    answer:
      "The installer isn't code-signed yet, so Windows SmartScreen may call it an unrecognized app. Only download Scribe from its GitHub page, where you can see the code and every release.",
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

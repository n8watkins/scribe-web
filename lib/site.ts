export const SITE_URL = "https://scribe.n8builds.dev";
export const REPO = "n8watkins/scribe";
export const GITHUB_URL = `https://github.com/${REPO}`;
export const DOWNLOAD_URL = `${GITHUB_URL}/releases/latest`;
export const N8BUILDS_URL = "https://n8builds.dev";
export const KOFI_URL = "https://ko-fi.com/n8watkins";
export const GITHUB_PROFILE_URL = "https://github.com/n8watkins";

export type IconName = "lock" | "chip" | "clipboard" | "keyboard" | "pill" | "spark" | "history" | "shield";

export type Feature = { icon: IconName; title: string; body: string };

export type FaqItem = { question: string; answer: string };

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

// Six things worth knowing before you install, said plainly.
export const FEATURES: Feature[] = [
  { icon: "chip", title: "Fast", body: "The speech model stays loaded, so your text is there the moment you let go of the key." },
  { icon: "keyboard", title: "Your keys", body: "Hold Ctrl + Win to talk, or tap ~ to talk hands-free. Change either one." },
  { icon: "pill", title: "See it listening", body: "A small pill sits on top of your screen and shows what it hears as you talk." },
  { icon: "clipboard", title: "Works in any app", body: "Email, Slack, Word, your code editor. Ctrl + Alt + V pastes your last one again." },
  { icon: "history", title: "Find what you said", body: "Everything you dictate is saved on your PC to search later. Or turn history off." },
  { icon: "spark", title: "Extras if you want them", body: "AI tools for your notes and a GitHub backup. Both are off until you turn them on." },
];

export const FAQS: FaqItem[] = [
  {
    question: "Does Scribe send my voice to the cloud?",
    answer:
      "No. Your voice is recorded and turned into text on your PC with whisper.cpp. The recording is deleted as soon as the text is ready. If something goes wrong, Scribe keeps the last 20 recordings on your PC so you can try them again.",
  },
  {
    question: "Does it work without the internet?",
    answer:
      "Yes. Once you've downloaded a speech model, dictation works offline. Scribe only goes online to check for updates, to download a model you pick, and for the GitHub backup or AI tools if you turn them on.",
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
      "They're optional and off at first. When you use one, Scribe sends that text to the AI server you set. By default that's LM Studio running on your own PC; if you point it at an online service, the text goes there.",
  },
  {
    question: "Do I need an account?",
    answer:
      "No. Scribe is free and open source, with no account and no subscription. You only need a GitHub account if you want the backup.",
  },
  {
    question: "Does it work on Mac or Linux?",
    answer: "Not right now. Scribe is made for 64-bit Windows 10 and 11.",
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

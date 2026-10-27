export const SITE_URL = "https://scribe.n8builds.dev";
export const REPO = "n8watkins/scribe";
export const GITHUB_URL = `https://github.com/${REPO}`;
export const DOWNLOAD_URL = `${GITHUB_URL}/releases/latest`;
export const N8BUILDS_URL = "https://n8builds.dev";

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

// Six, not eight: what you'd actually want to know before installing.
export const FEATURES: Feature[] = [
  { icon: "chip", title: "Runs on your PC", body: "whisper.cpp transcribes locally and keeps the model warm in memory, so text is ready the moment you let go." },
  { icon: "keyboard", title: "Your hotkeys", body: "Hold Ctrl + Win to talk, or tap tilde to toggle hands-free. Rebind either one." },
  { icon: "pill", title: "Live as you speak", body: "A small always-on-top pill shows it listening, and it transcribes phrase by phrase while you talk." },
  { icon: "clipboard", title: "Any app, any field", body: "Words land at your cursor. Ctrl + Alt + V pastes your last transcript again." },
  { icon: "history", title: "Searchable history", body: "Transcripts live in a local SQLite database you can search, clear, or switch off." },
  { icon: "spark", title: "Optional extras", body: "AI note tools on a server you choose (LM Studio on your PC by default), and private GitHub backup. Both start off." },
];

export const FAQS: FaqItem[] = [
  {
    question: "Does Scribe send my voice to the cloud?",
    answer:
      "No. Core dictation records and transcribes audio locally with whisper.cpp. Temporary audio is deleted after successful transcription. If transcription fails, Scribe can keep up to 20 recordings in its local failed-recordings folder so they can be recovered. Microphone audio is not uploaded for transcription.",
  },
  {
    question: "Can I dictate without an internet connection?",
    answer:
      "Yes, after you download a Whisper model. Core dictation then runs offline. Network access is still used for update checks, model downloads you start, GitHub authorization and backup when enabled, and any optional AI server you configure.",
  },
  {
    question: "Where are my transcripts stored?",
    answer:
      "History is stored in a local SQLite database under Scribe's Windows app-data folder. The Data & Privacy tab can open that folder, clear history, or disable history entirely.",
  },
  {
    question: "What does optional GitHub backup upload?",
    answer:
      "GitHub backup is off by default. When you enable it, Scribe can save dictated notes as dated Markdown in a private repository you control, with a separate option to include every transcript. It does not upload microphone audio.",
  },
  {
    question: "How do the optional AI tools handle my text?",
    answer:
      "Note analysis and selected-text transforms send the relevant text to the OpenAI-compatible server URL you choose. It defaults to LM Studio on your PC, but a remote URL sends the text to that remote service. These tools are optional and off by default. Core dictation does not need an LLM.",
  },
  {
    question: "Do I need an account or subscription?",
    answer:
      "No. Scribe is free and open source, and core dictation requires no account. A GitHub account is only needed if you choose to enable GitHub backup.",
  },
  {
    question: "Which systems does Scribe support?",
    answer:
      "Scribe is built for 64-bit Windows 10 and Windows 11. macOS and Linux are not currently supported.",
  },
  {
    question: "Why might Windows SmartScreen show a warning?",
    answer:
      "The Windows installer is not Authenticode code-signed, so SmartScreen may label it as an unrecognized app. Download releases only from Scribe's official GitHub repository, where the source and release history are available for inspection.",
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

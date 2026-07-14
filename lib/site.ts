export const REPO = "n8watkins/scribe";
export const GITHUB_URL = `https://github.com/${REPO}`;
export const DOWNLOAD_URL = `${GITHUB_URL}/releases/latest`;
export const N8BUILDS_URL = "https://n8builds.dev";

export type Feature = { icon: string; title: string; body: string };

export type PrivacyPoint = { icon: string; title: string; body: string };

export type FaqItem = { question: string; answer: string };

export const FEATURES: Feature[] = [
  { icon: "🔒", title: "100% local", body: "Local Whisper models transcribe on your machine. Your audio never leaves your PC." },
  { icon: "🧠", title: "Model picker", body: "Choose the Whisper model that fits your hardware. Favor speed, accuracy, or a balance of both." },
  { icon: "📋", title: "Paste anywhere", body: "Ctrl+Alt+V drops your last transcript without consuming the keyboard." },
  { icon: "⌨️", title: "Rebindable hotkeys", body: "Push-to-talk (Ctrl+Win) or toggle (tilde). Bind the keys you want." },
  { icon: "🤖", title: "Optional AI tools", body: "Use an OpenAI-compatible server for note analysis and selected-text transforms. The default points to LM Studio on your PC." },
  { icon: "☁️", title: "Private GitHub backup", body: "Optionally sync notes and transcripts to a private repository you control." },
  { icon: "📌", title: "Floating pill", body: "A tiny status pill shows when Scribe is listening, live and incremental." },
  { icon: "🆓", title: "Free and open", body: "No account, no subscription, and no telemetry. The source is available on GitHub." },
];

export const STEPS: { n: string; title: string; body: string }[] = [
  { n: "1", title: "Hold the key", body: "Press and hold Ctrl + Win (or toggle with tilde) anywhere in Windows." },
  { n: "2", title: "Speak", body: "A local Whisper model transcribes in real time. Nothing is uploaded for transcription." },
  { n: "3", title: "It types", body: "Release, and the text lands right where your cursor is. Any app." },
];

export const PRIVACY_POINTS: PrivacyPoint[] = [
  {
    icon: "🎙️",
    title: "Voice stays local",
    body: "Scribe transcribes temporary audio on your PC, then deletes it after success. If transcription fails, up to 20 recordings can be kept locally for recovery.",
  },
  {
    icon: "🗃️",
    title: "History is yours",
    body: "Transcripts are stored in a local SQLite database. You can disable history, clear it, or open the data folder yourself.",
  },
  {
    icon: "🚫",
    title: "No tracking layer",
    body: "Core dictation needs no account, subscription, analytics, or telemetry service. Product usage is not sent to a Scribe tracking service.",
  },
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

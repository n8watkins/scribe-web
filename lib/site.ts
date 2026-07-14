export const REPO = "n8watkins/scribe";
export const GITHUB_URL = `https://github.com/${REPO}`;
export const DOWNLOAD_URL = `${GITHUB_URL}/releases/latest`;
export const N8BUILDS_URL = "https://n8builds.dev";

export type Feature = { icon: string; title: string; body: string };

export const FEATURES: Feature[] = [
  { icon: "🔒", title: "100% local", body: "Local Whisper models transcribe on your machine. Your audio never leaves your PC." },
  { icon: "🧠", title: "Model picker", body: "Choose the Whisper model that fits your hardware. Favor speed, accuracy, or a balance of both." },
  { icon: "📋", title: "Paste anywhere", body: "Ctrl+Alt+V drops your last transcript without consuming the keyboard." },
  { icon: "⌨️", title: "Rebindable hotkeys", body: "Push-to-talk (Ctrl+Win) or toggle (tilde). Bind the keys you want." },
  { icon: "🤖", title: "Local AI cleanup", body: "Connect LM Studio to clean up and organize transcripts while keeping the workflow local." },
  { icon: "☁️", title: "Private GitHub backup", body: "Optionally sync notes and transcripts to a private repository you control." },
  { icon: "📌", title: "Floating pill", body: "A tiny status pill shows when Scribe is listening, live and incremental." },
  { icon: "🆓", title: "Free and open", body: "No account, no subscription, and no telemetry. The source is available on GitHub." },
];

export const STEPS: { n: string; title: string; body: string }[] = [
  { n: "1", title: "Hold the key", body: "Press and hold Ctrl + Win (or toggle with tilde) anywhere in Windows." },
  { n: "2", title: "Speak", body: "A local Whisper model transcribes in real time. Nothing is uploaded for transcription." },
  { n: "3", title: "It types", body: "Release, and the text lands right where your cursor is. Any app." },
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

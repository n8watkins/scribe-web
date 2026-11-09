export const SITE_URL = "https://scribe.n8builds.dev";
export const REPO = "n8watkins/scribe";
export const GITHUB_URL = `https://github.com/${REPO}`;
export const DOWNLOAD_URL = `${GITHUB_URL}/releases/latest`;
export const N8BUILDS_URL = "https://n8builds.dev";
export const KOFI_URL = "https://ko-fi.com/n8watkins";
export const GITHUB_PROFILE_URL = "https://github.com/n8watkins";
export const ISSUES_URL = `${GITHUB_URL}/issues`;
/** Install steps, permissions and known limits per system, in the app's repo. */
export const INSTALL_GUIDES_URL = `${GITHUB_URL}/tree/main/docs/install`;

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

/** A desktop system Scribe ships for: Windows, and macOS and Linux in beta. */
export type DesktopOs = "windows" | "mac" | "linux";

export const OS_NAMES: Record<DesktopOs, string> = { windows: "Windows", mac: "macOS", linux: "Linux" };

/** One system's download: its main file, and for Linux a second package. */
export type OsDownload = {
  href: string;
  /** Megabytes, when GitHub could say at build time. */
  sizeMb: number | null;
  /** What it runs on, for the line under the download button. */
  runsOn: string;
  beta: boolean;
  /** The system's install guide (first-open steps, permissions, limits). */
  guide: string;
  alt?: { label: string; href: string; sizeMb: number | null };
};

/** The latest release, read from GitHub at build time (hourly). */
export type Release = {
  version: string;
  /** The Windows installer, the main download. */
  url: string;
  sizeMb: number;
  checksumsUrl: string;
  downloads: Record<DesktopOs, OsDownload>;
};

// macOS and Linux files keep one name across releases, so these links always
// fetch the newest; Windows' installer carries its version in its name.
const LATEST_DOWNLOAD = `${GITHUB_URL}/releases/latest/download`;
const MAC_DMG = "Scribe-macos-universal.dmg";
const LINUX_APPIMAGE = "Scribe-linux-x86_64.AppImage";
const LINUX_DEB = "Scribe-linux-amd64.deb";
const guide = (os: DesktopOs) => `${GITHUB_URL}/blob/main/docs/install/${os === "mac" ? "macos" : os}.md`;

function downloadsFor(windowsUrl: string, sizes: Map<string, number>): Record<DesktopOs, OsDownload> {
  const mb = (name: string | undefined) => {
    const bytes = name == null ? undefined : sizes.get(name);
    return bytes == null ? null : Math.round(bytes / 1_000_000);
  };
  const setup = [...sizes.keys()].find((name) => /x64-setup\.exe$/.test(name));
  return {
    windows: {
      href: windowsUrl,
      sizeMb: mb(setup),
      runsOn: "Windows 10 and 11, 64-bit",
      beta: false,
      guide: guide("windows"),
    },
    mac: {
      href: `${LATEST_DOWNLOAD}/${MAC_DMG}`,
      sizeMb: mb(MAC_DMG),
      runsOn: "macOS 13.3 or later, Apple silicon and Intel",
      beta: true,
      guide: guide("mac"),
    },
    linux: {
      href: `${LATEST_DOWNLOAD}/${LINUX_APPIMAGE}`,
      sizeMb: mb(LINUX_APPIMAGE),
      runsOn: "Linux x86_64 AppImage",
      beta: true,
      guide: guide("linux"),
      alt: { label: ".deb", href: `${LATEST_DOWNLOAD}/${LINUX_DEB}`, sizeMb: mb(LINUX_DEB) },
    },
  };
}

// Used when GitHub can't be reached at build time: the release live on 2026-11-09.
const FALLBACK_RELEASE: Release = {
  version: "0.12.0",
  url: `${GITHUB_URL}/releases/download/v0.12.0/Scribe_0.12.0_x64-setup.exe`,
  sizeMb: 13,
  checksumsUrl: `${GITHUB_URL}/releases/download/v0.12.0/SHA256SUMS.txt`,
  downloads: downloadsFor(
    `${GITHUB_URL}/releases/download/v0.12.0/Scribe_0.12.0_x64-setup.exe`,
    new Map([
      ["Scribe_0.12.0_x64-setup.exe", 13_058_609],
      [MAC_DMG, 22_139_879],
      [LINUX_APPIMAGE, 90_888_696],
      [LINUX_DEB, 13_496_732],
    ])
  ),
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
    const sizes = new Map((data.assets ?? []).map((asset) => [asset.name, asset.size]));
    return {
      version: data.tag_name.replace(/^v/, ""),
      url: setup.browser_download_url,
      sizeMb: Math.round(setup.size / 1_000_000),
      checksumsUrl: sums?.browser_download_url ?? DOWNLOAD_URL,
      downloads: downloadsFor(setup.browser_download_url, sizes),
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
    question: "Why does my computer warn me when I install it?",
    answer:
      "Scribe isn't code-signed yet. On Windows, SmartScreen may call it an unrecognized app: choose \u201cMore info\u201d, then \u201cRun anyway\u201d. On a Mac, the app isn't notarized by Apple, so macOS blocks the first open: click Done, then open System Settings, Privacy & Security, and click \u201cOpen Anyway\u201d next to Scribe (on macOS 13 and 14 you can also Control-click Scribe and choose Open). Only download Scribe from here or its GitHub page, where you can see the code and check every release.",
    link: { label: "Install guides", href: INSTALL_GUIDES_URL },
  },
  {
    question: "What do I need to run it?",
    answer:
      "A microphone and a 64-bit Windows 10 or 11 PC, a Mac with macOS 13.3 or later (Apple silicon or Intel), or an x86_64 Linux desktop (Ubuntu 22.04 or later, or any current distribution through the AppImage). The default speech model is 190 MB. A graphics card makes the bigger models fast, but you don't need one.",
  },
  {
    question: "Does it work offline?",
    answer:
      "Yes. Once a speech model is downloaded, dictation works with no internet at all.",
  },
  {
    question: "Does it work on a Mac or on Linux?",
    answer:
      "Yes, in beta. Every release ships a universal Mac app and a Linux AppImage and .deb next to the Windows installer, and each one is installed and tested on a fresh machine before it goes out. They've had less hands-on use than the Windows app, and they don't update themselves yet: Scribe tells you when a new version is out. On Linux, hotkeys and pasting work best in an X11 session. If something doesn't work, please open an issue on GitHub.",
    link: { label: "Install guides", href: INSTALL_GUIDES_URL },
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

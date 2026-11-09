"use client";

import { Fragment } from "react";
import { AppleIcon, DownloadIcon, LinuxIcon, WindowsIcon } from "@/components/Icons";
import { Kbd } from "@/components/Kbd";
import { usePlatform } from "@/lib/platform";
import { OS_NAMES, type DesktopOs, type Release } from "@/lib/site";

/*
 * Scribe ships for Windows, and for macOS (one universal .dmg) and Linux (an
 * AppImage, and a .deb) in beta. Each download button offers the file for the
 * visitor's system; a phone, a tablet or anything else gets Windows, the full
 * release, with the other two one tap away. The static HTML is the Windows
 * version and the browser switches once hydrated; the buttons keep their size
 * so nothing jumps.
 */

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan";
const LINK = "underline decoration-faint/50 underline-offset-2 transition hover:text-ink";
const ORDER: DesktopOs[] = ["windows", "mac", "linux"];

/** The visitor's system, or Windows when it isn't one Scribe ships for. */
function useDownloadOs(): { os: DesktopOs; desktop: boolean } {
  const platform = usePlatform();
  return platform === "other" ? { os: "windows", desktop: false } : { os: platform, desktop: true };
}

export function OsIcon({ os, className = "h-4 w-4" }: { os: DesktopOs; className?: string }) {
  if (os === "mac") return <AppleIcon className={className} />;
  if (os === "linux") return <LinuxIcon className={className} />;
  return <WindowsIcon className={className} />;
}

function BetaTag() {
  return <span className="rounded-md bg-bg/25 px-1.5 py-px text-[0.65rem] font-bold uppercase tracking-wider">Beta</span>;
}

/** The main download button: "Download for macOS", with the Beta tag where it applies. */
export function DownloadButton({ release, className = "" }: { release: Release; className?: string }) {
  const { os } = useDownloadOs();
  const download = release.downloads[os];
  return (
    <a
      href={download.href}
      data-download-os={os}
      className={`inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-gradient-to-r from-cyan to-purple px-7 py-3.5 font-semibold text-bg shadow-lg shadow-cyan/20 transition hover:brightness-110 ${FOCUS} ${className}`}
    >
      <DownloadIcon />
      Download for {OS_NAMES[os]}
      {download.beta && <BetaTag />}
    </a>
  );
}

/** The navigation bar's short "Download" for the visitor's system. */
export function NavDownload({ release, className = "" }: { release: Release; className?: string }) {
  const { os } = useDownloadOs();
  return (
    <a
      href={release.downloads[os].href}
      aria-label={`Download Scribe for ${OS_NAMES[os]}`}
      className={`inline-flex h-9 items-center gap-1.5 rounded-full bg-gradient-to-r from-cyan to-purple px-4 text-sm font-semibold text-bg transition hover:brightness-110 ${FOCUS} ${className}`}
    >
      <DownloadIcon className="h-4 w-4" />
      Download
    </a>
  );
}

function sizeText(sizeMb: number | null) {
  return sizeMb == null ? null : `${sizeMb} MB`;
}

/**
 * What the button fetches (version, size, what it runs on), the one step a
 * first run needs on this system, its install guide, and the other systems.
 */
export function DownloadDetails({ release, align = "start" }: { release: Release; align?: "start" | "center" }) {
  const { os } = useDownloadOs();
  const download = release.downloads[os];
  const justify = align === "center" ? "justify-center" : "justify-center lg:justify-start";
  const textAlign = align === "center" ? "text-center" : "text-center lg:text-left";
  const facts = [`v${release.version}`, sizeText(download.sizeMb), download.runsOn].filter(Boolean).join(" · ");
  return (
    <div className="text-sm text-faint">
      <p className={`text-pretty ${textAlign}`}>
        <OsIcon os={os} className="mr-2 inline-block h-4 w-4 align-[-3px]" />
        {facts}
      </p>
      <p className={`mt-1.5 text-pretty ${textAlign}`}>
        <FirstRun os={os} release={release} />{" "}
        <a href={download.guide} className={`whitespace-nowrap ${LINK}`}>
          Install guide
        </a>
      </p>
      <OtherSystems release={release} justify={justify} />
    </div>
  );
}

/** One short sentence on what the first install asks of you here. */
function FirstRun({ os, release }: { os: DesktopOs; release: Release }) {
  if (os === "mac") return <span>Not notarized by Apple yet: the first open needs Open Anyway in Privacy &amp; Security.</span>;
  if (os === "linux") {
    const deb = release.downloads.linux.alt;
    return (
      <span>
        {deb && (
          <>
            Or the{" "}
            <a href={deb.href} className={LINK}>
              {deb.label}
              {deb.sizeMb != null && ` (${deb.sizeMb} MB)`}
            </a>{" "}
            for Debian and Ubuntu.
          </>
        )}
      </span>
    );
  }
  return <span>Windows may warn you: the installer isn&apos;t code-signed yet.</span>;
}

/** Links to the other systems' downloads: "Also for macOS (beta) · Linux (beta)". */
export function OtherSystems({ release, justify = "justify-center" }: { release: Release; justify?: string }) {
  const { os: offered } = useDownloadOs();
  const others = ORDER.filter((os) => os !== offered);
  return (
    <p className={`mt-1.5 flex flex-wrap items-center gap-x-1.5 ${justify}`}>
      <span>Also for</span>
      {others.map((os, i) => (
        <Fragment key={os}>
          {i > 0 && <span aria-hidden="true">·</span>}
          <a href={release.downloads[os].href} className={`inline-flex items-center gap-1 ${LINK}`}>
            <OsIcon os={os} className="h-3.5 w-3.5" />
            {OS_NAMES[os]}
            {release.downloads[os].beta && " (beta)"}
          </a>
        </Fragment>
      ))}
    </p>
  );
}

/** The hold-to-talk chord, as it is by default on the visitor's system. */
export function HoldKeys() {
  const { os } = useDownloadOs();
  const keys = os === "mac" ? ["Control", "Option", "Z"] : os === "linux" ? ["Ctrl", "Alt", "Space"] : ["Ctrl", "Win"];
  return (
    <>
      {keys.map((key, i) => (
        <Fragment key={key}>
          {i > 0 && " + "}
          <Kbd>{key}</Kbd>
        </Fragment>
      ))}
    </>
  );
}

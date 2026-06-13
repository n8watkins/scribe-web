import type { Metadata } from "next";
import "./globals.css";

const TITLE = "Scribe — Local, free voice dictation for Windows";
const DESC =
  "Hold a key, speak, and Scribe types it at your cursor. 100% local Whisper, " +
  "your voice never leaves your PC. Free & open source.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  metadataBase: new URL("https://scribe-web.vercel.app"),
  openGraph: { title: TITLE, description: DESC, type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}

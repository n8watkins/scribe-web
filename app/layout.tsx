import type { Metadata } from "next";
import "./globals.css";

const TITLE = "Scribe - Private local dictation for Windows";
const DESC =
  "Hold a key, speak, and Scribe types at your cursor. Local Whisper keeps " +
  "your voice on your PC. Free, open source, and built for Windows.";

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

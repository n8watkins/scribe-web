import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const TITLE = "Scribe - Private local dictation for Windows";
const DESC =
  "Hold a key, speak, and Scribe types at your cursor. Local Whisper keeps " +
  "your voice on your PC. Free, open source, and built for Windows.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: DESC,
    type: "website",
    siteName: "Scribe",
    url: "/",
  },
  twitter: { card: "summary", title: TITLE, description: DESC },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}

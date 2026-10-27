import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

// Self-hosted at build time (next/font), so the CSP's font-src 'self' holds.
const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

const TITLE = "Scribe - Free speech-to-text for Windows";
const DESC =
  "Hold Ctrl + Win, talk, and let go: Scribe types what you said into any app. " +
  "It runs on your PC, so your voice never leaves it. Free and open source.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  icons: { icon: "/scribe-icon.png", apple: "/scribe-icon.png" },
  openGraph: {
    title: TITLE,
    description: DESC,
    type: "website",
    siteName: "Scribe",
    url: "/",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}

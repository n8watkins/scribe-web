"use client";

import { useEffect } from "react";
import { reportError } from "@/lib/error-reporting";

// Shown only when the root layout itself fails, so it carries its own markup
// and styles (the site's palette, inlined; the CSP allows inline style
// attributes but not <style> elements).
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => reportError(error), [error]);

  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#070b14", color: "#eaf6fb", fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
        <main style={{ minHeight: "100vh", padding: "48px 16px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
          <p style={{ fontWeight: 700, margin: 0 }}>Scribe</p>
          <h1 style={{ fontSize: 36, lineHeight: 1.15, margin: "32px 0 0" }}>This page didn&apos;t load.</h1>
          <p style={{ maxWidth: 420, color: "#9fb3c8", fontSize: 18, lineHeight: 1.5, margin: "16px 0 0" }}>
            It&apos;s a problem with the website, not the Scribe app, and it has been reported.
          </p>
          <button type="button" onClick={reset} style={{ marginTop: 32, padding: "14px 28px", border: 0, borderRadius: 999, background: "linear-gradient(90deg, #22d3ee, #8b5cf6)", color: "#070b14", fontWeight: 600, fontSize: 16, cursor: "pointer" }}>
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}

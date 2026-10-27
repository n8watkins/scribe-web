import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// The share card (1200x630), drawn at build time: the icon, the line, the
// facts, in the site's navy and cyan-to-purple.
export const alt = "Scribe: Talk. It types. Private local dictation for Windows.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const icon = await readFile(join(process.cwd(), "public/scribe-icon.png"));
  const src = `data:image/png;base64,${icon.toString("base64")}`;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 96px",
          backgroundColor: "#070b14",
          backgroundImage:
            "radial-gradient(60% 70% at 15% 0%, rgba(34,211,238,0.22), transparent 70%), radial-gradient(50% 60% at 95% 20%, rgba(139,92,246,0.22), transparent 70%)",
          color: "#eaf6fb",
        }}
      >
        <img src={src} width={112} height={112} alt="" />
        <div style={{ display: "flex", marginTop: 40, fontSize: 104, fontWeight: 800, letterSpacing: -3, lineHeight: 1 }}>
          Talk.&nbsp;
          <span style={{ backgroundImage: "linear-gradient(100deg, #22d3ee, #8b5cf6)", backgroundClip: "text", color: "transparent" }}>
            It types.
          </span>
        </div>
        <div style={{ marginTop: 28, fontSize: 38, color: "#9fb3c8" }}>Private local dictation for Windows</div>
        <div style={{ marginTop: 40, display: "flex", gap: 16, fontSize: 26, color: "#eaf6fb" }}>
          {["whisper.cpp on your PC", "Free and open source", "No account"].map((t) => (
            <div key={t} style={{ display: "flex", padding: "10px 20px", border: "1px solid #2a3c5e", borderRadius: 999, background: "#0e1626" }}>
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}

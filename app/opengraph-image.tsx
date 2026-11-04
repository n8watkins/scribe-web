import { OG_SIZE, dataUrl, shareCard } from "@/lib/og-card";
import { readPublicFile } from "@/lib/publicFile";

// The share card (Open Graph and Twitter): the n8builds family layout in the
// site's navy and cyan-to-violet, with the dictation flow drawn on the right.
// The static export renders it once into out/opengraph-image at build time.
export const dynamic = "force-static";
export const alt = "Scribe: hold Ctrl + Win, talk and let go. It types into any app, right on your PC.";
export const size = OG_SIZE;
export const contentType = "image/png";

const ink = "#eaf6fb";
const muted = "#9fb3c8";
const cyan = "#22d3ee";
const violet = "#8b5cf6";

export default async function OpengraphImage() {
  // Inter (OFL, public/og/Inter-LICENSE.txt) and the icons, from public/.
  const [medium, extraBold, icon, n8] = await Promise.all([
    readPublicFile("/og/Inter-Medium.ttf"),
    readPublicFile("/og/Inter-ExtraBold.ttf"),
    readPublicFile("/scribe-icon.png"),
    readPublicFile("/og/n8-icon.png"),
  ]);

  return shareCard({
    colors: {
      bg: "#070b14",
      bgImage:
        "radial-gradient(circle at 80% 30%, rgba(139,92,246,0.18), rgba(7,11,20,0) 50%), radial-gradient(circle at 10% 80%, rgba(34,211,238,0.10), rgba(7,11,20,0) 45%)",
      ink,
      muted,
      body: muted,
      accent: cyan,
    },
    font: "Inter",
    fonts: [
      { name: "Inter", data: medium, weight: 500 },
      { name: "Inter", data: extraBold, weight: 800 },
    ],
    logo: dataUrl(icon, "image/png"),
    logoStyle: { background: "#0e1626" },
    n8Icon: dataUrl(n8, "image/png"),
    host: "scribe.n8builds.dev",
    name: "Scribe",
    tagline: "Hold Ctrl + Win, talk and let go. It types into any app, right on your PC.",
    visual: <Dictation />,
  });
}

const BARS = [10, 18, 30, 44, 26, 52, 36, 22, 46, 30, 16, 38, 24, 12, 8];

function Key({ label }: { label: string }) {
  return (
    <div
      style={{
        display: "flex",
        padding: "8px 16px",
        borderRadius: 10,
        background: "#111a2c",
        border: "1.5px solid #2a3c5e",
        borderBottomWidth: 4,
        color: ink,
        fontWeight: 800,
      }}
    >
      {label}
    </div>
  );
}

/** The hotkey, the listening pill and the words landing in a message box. */
function Dictation() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 26, position: "absolute", left: 640, top: 104, width: 500 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, color: muted }}>
        Hold <Key label="Ctrl" /> + <Key label="Win" />
      </div>
      <div
        style={{
          display: "flex",
          alignSelf: "flex-start",
          alignItems: "center",
          gap: 16,
          padding: "16px 28px",
          borderRadius: 999,
          background: "#0e1626",
          border: `1.5px solid ${cyan}`,
          boxShadow: "0 0 40px rgba(34,211,238,0.28)",
        }}
      >
        <div style={{ display: "flex", width: 14, height: 14, borderRadius: 14, background: cyan }} />
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          {BARS.map((h, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                width: 6,
                height: h,
                borderRadius: 3,
                backgroundImage: `linear-gradient(180deg, ${i < 8 ? cyan : violet}, ${i < 6 ? "#38bdf8" : violet})`,
              }}
            />
          ))}
        </div>
        <div style={{ display: "flex", fontSize: 26, fontWeight: 500, color: ink }}>Listening...</div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: 500,
          borderRadius: 20,
          overflow: "hidden",
          background: "#0c1322",
          border: "1.5px solid #22304a",
          boxShadow: "0 30px 70px rgba(0,0,0,0.55)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "14px 20px",
            borderBottom: "1px solid #1b2840",
            fontSize: 19,
            color: "#6b7f99",
          }}
        >
          {["#f87171", "#fbbf24", "#34d399"].map((c) => (
            <div key={c} style={{ display: "flex", width: 11, height: 11, borderRadius: 11, background: c }} />
          ))}
          <div style={{ display: "flex", marginLeft: 10 }}>Message to Sam</div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", padding: "26px 28px 34px", fontSize: 31, lineHeight: 1.4, color: ink }}>
          Running ten minutes late, save me a seat by the window.
          <div style={{ display: "flex", width: 3, height: 40, marginLeft: 4, background: cyan }} />
        </div>
      </div>
    </div>
  );
}

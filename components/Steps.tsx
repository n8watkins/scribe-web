// How it works in three panels: an empty text box, the keys held with the
// pill listening, and the same box with the words in it. Drawn in HTML (no
// screenshots yet), with the same message in all three so it reads as one story.
const MESSAGE = "Thursday works for me. I'll send the invite.";

function Thread({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-edge bg-bg/80 p-4 text-left">
      <p className="text-xs font-semibold text-ink">#launch</p>
      <div className="mt-3 flex gap-2.5">
        <span aria-hidden="true" className="h-7 w-7 shrink-0 rounded-full bg-gradient-to-br from-purple/70 to-cyan/60" />
        <p className="text-[0.8rem] leading-snug text-mute">
          <span className="font-semibold text-ink">Sam</span> Can we move the review to Thursday?
        </p>
      </div>
      <div className="mt-auto rounded-lg border border-edge-strong bg-card px-3 py-2.5 text-[0.8rem]">{children}</div>
    </div>
  );
}

function Caret() {
  return <span aria-hidden="true" className="ml-px inline-block h-4 w-px translate-y-0.5 animate-pulse bg-cyan" />;
}

/** A key shown held down: pressed in, lit cyan. */
function HeldKey({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="translate-y-px rounded-lg border border-cyan/60 bg-cyan/10 px-3 py-1.5 font-mono text-sm text-ink shadow-[0_0_18px_rgba(34,211,238,0.25)]">
      {children}
    </kbd>
  );
}

function Pill() {
  return (
    <div className="mx-auto flex w-fit items-center gap-2.5 rounded-full border border-cyan/40 bg-bg px-3.5 py-2 shadow-lg shadow-cyan/10">
      <span aria-hidden="true" className="flex h-4 items-center gap-[3px]">
        {Array.from({ length: 9 }, (_, i) => (
          <span
            key={i}
            className="block h-full w-[3px] origin-center rounded-full bg-cyan"
            style={{ animation: `wave 900ms ease-in-out ${i * 90}ms infinite` }}
          />
        ))}
      </span>
      {/* Mid-sentence: it shows the words as they come */}
      <span className="whitespace-nowrap text-xs text-ink">Thursday works for me. I&apos;ll</span>
    </div>
  );
}

const STEPS: { title: string; body: string; panel: React.ReactNode }[] = [
  {
    title: "Click into any text box",
    body: "Email, Slack, Word, your code editor. Anywhere you'd type.",
    panel: (
      <Thread>
        <span className="text-faint">Reply</span>
        <Caret />
      </Thread>
    ),
  },
  {
    title: "Hold Ctrl + Win and talk",
    body: "A small pill shows what it hears while you speak.",
    panel: (
      <div className="flex h-full flex-col items-center justify-center gap-6 rounded-xl border border-edge bg-bg/80 p-4">
        <span className="flex items-center gap-2 text-mute">
          <HeldKey>Ctrl</HeldKey> + <HeldKey>Win</HeldKey>
        </span>
        <Pill />
      </div>
    ),
  },
  {
    title: "Let go",
    body: "Your words land where you were typing. Nothing to copy or paste.",
    panel: (
      <Thread>
        <span className="text-ink">{MESSAGE}</span>
        <Caret />
      </Thread>
    ),
  },
];

export function Steps() {
  return (
    <ol data-reveal className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
      {STEPS.map((step, i) => (
        <li key={step.title} className="group">
          <div
            aria-hidden="true"
            className="h-56 rounded-2xl border border-edge bg-card/70 p-3 transition duration-300 group-hover:-translate-y-1 group-hover:border-cyan/40"
          >
            {step.panel}
          </div>
          <p className="mt-5 flex items-center gap-3 font-semibold text-ink">
            <span className="rounded-md border border-edge-strong px-1.5 py-0.5 font-mono text-xs text-cyan">0{i + 1}</span>
            {step.title}
          </p>
          <p className="mt-2 text-[0.95rem] leading-relaxed text-mute">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}

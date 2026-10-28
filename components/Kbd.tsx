export function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="rounded-md border border-b-2 border-edge-strong bg-card px-1.5 py-0.5 font-mono text-[0.85em] text-ink">
      {children}
    </kbd>
  );
}

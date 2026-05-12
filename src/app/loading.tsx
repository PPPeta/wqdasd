export default function Loading(): JSX.Element {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="grid min-h-screen place-items-center bg-background"
    >
      <div className="relative h-16 w-16">
        <span className="absolute inset-0 rounded-full border-2 border-white/10" />
        <span className="absolute inset-0 animate-gradient-spin rounded-full border-2 border-transparent border-t-brand-400 border-r-fuchsia-400" />
        <span className="absolute inset-3 animate-pulse-glow rounded-full bg-brand-500/20 shadow-glow" />
      </div>
      <span className="sr-only">Loading…</span>
    </div>
  );
}

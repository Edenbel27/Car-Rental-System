export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`bg-neutral-700/60 rounded animate-pulse ${className || ""}`}
      aria-busy="true"
      aria-label="Loading..."
    />
  );
}

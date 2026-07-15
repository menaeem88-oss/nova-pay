/**
 * InfoSnippet — NovaKit Lite (new)
 * A low-emphasis informational note: grayed-out info icon on the left,
 * text on the right. For supplementary facts that aren't a status/alert
 * (that's what `StatusBanner` is for) — just neutral, good-to-know
 * context, styled so it doesn't compete with the tones StatusBanner uses.
 */
export default function InfoSnippet({ children, className = "" }) {
  return (
    <div className={`rounded-lg border border-divider bg-neutral-50 p-4 flex gap-3 items-start ${className}`}>
      <span
        aria-hidden="true"
        className="h-6 w-6 shrink-0 rounded-full bg-neutral-200 text-neutral-500 text-caption font-bold flex items-center justify-center"
      >
        i
      </span>
      <div className="text-body text-neutral-700">{children}</div>
    </div>
  );
}

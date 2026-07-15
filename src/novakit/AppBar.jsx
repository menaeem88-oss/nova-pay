/**
 * AppBar — NovaKit Lite
 * title + optional back affordance + optional trailing action slot
 *
 * Fixes vs. starter:
 * - no trailing-action slot -> added `trailing` (e.g. a "?" help/terms
 *   button on the disclosure screen).
 * - back button was 36x36px, under the HIG 44x44pt minimum -> 44x44px.
 * - the back chevron was a Unicode glyph ('‹'). Even bumped to a larger,
 *   bolder font size it still read as thin/undersized — a single text
 *   character doesn't have a consistent stroke weight the way an icon
 *   does. Replaced with a stroke-based inline SVG chevron sized/weighted
 *   to match iOS HIG's back-chevron proportions; tap target unchanged
 *   (44x44pt). Still LTR-only — a PK-market wallet will eventually need
 *   an RTL-aware mirror of this icon; flagged in docs/DESIGN_SYSTEM.md,
 *   not fixed here — out of scope for restraint.
 */
export default function AppBar({ title, onBack = null, trailing = null }) {
  return (
    <header className="h-14 flex items-center gap-2 px-3 border-b border-divider bg-white">
      {onBack ? (
        <button
          onClick={onBack}
          aria-label="Back"
          className="h-11 w-11 -ml-2 flex items-center justify-center rounded-full text-neutral-700 active:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </button>
      ) : null}
      <h1 className="text-title font-semibold text-neutral-900 flex-1 truncate">{title}</h1>
      {trailing ? <div className="shrink-0">{trailing}</div> : null}
    </header>
  );
}

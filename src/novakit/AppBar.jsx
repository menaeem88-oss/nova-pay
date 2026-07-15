/**
 * AppBar — NovaKit Lite
 * title + optional back affordance + optional trailing action slot
 *
 * Fixes vs. starter:
 * - no trailing-action slot -> added `trailing` (e.g. a "?" help/terms
 *   button on the disclosure screen).
 * - back button was 36x36px, under the HIG 44x44pt minimum -> 44x44px.
 * - the back chevron glyph rendered at the inherited body font size (~16px,
 *   regular weight), so it looked thin/undersized inside its own 44x44pt
 *   tap target — iOS's back chevron reads as a clearly legible, bolder
 *   mark. Bumped to `text-title` (20px) + `font-bold`; tap target unchanged.
 * - back affordance was a bare glyph ('‹') with no localisation story ->
 *   kept the glyph (system default, per "use the system's defaults") but
 *   gave it a proper aria-label and flagged LTR-only in docs/DESIGN_SYSTEM.md:
 *   a PK-market wallet will eventually need Urdu/RTL, at which point this
 *   glyph and the icon language across the kit (↑ ↓ ‹ ✓) should move to a
 *   direction-aware icon set. Not fixed here — out of scope for restraint.
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
          <span aria-hidden="true" className="text-title font-bold leading-none">‹</span>
        </button>
      ) : null}
      <h1 className="text-title font-semibold text-neutral-900 flex-1 truncate">{title}</h1>
      {trailing ? <div className="shrink-0">{trailing}</div> : null}
    </header>
  );
}

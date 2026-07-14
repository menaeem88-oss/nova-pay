/**
 * Button — NovaKit Lite
 * Variants: primary | secondary
 * Sizes: md | lg
 * States: default, hover, pressed (active), focus-visible, disabled, loading
 *
 * Fixes vs. starter (see docs/DESIGN_SYSTEM.md):
 * - secondary text was neutral-500 (~4:1 on white, fails AA body text and
 *   reads as disabled) -> neutral-700 (~8:1).
 * - disabled text was neutral-300 (~1.4:1, effectively invisible) -> neutral-400,
 *   still clearly muted but perceivable, matching disabled-state best practice.
 * - no focus-visible ring anywhere in the system -> added, using the new
 *   `focus` token, required for keyboard/VoiceOver users (HIG a11y gate).
 * - no loading/pending state -> added; needed for the async accept/disburse
 *   call so the highest-trust moment never reads as stalled (Doherty).
 */
export default function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  onClick,
  type = "button",
  className = "",
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors select-none w-full " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2";

  const sizes = {
    md: "h-11 px-4 text-body", // 44px — meets the 44x44pt HIG minimum tap target
    lg: "h-14 px-5 text-title",
  };

  const variants = {
    primary:
      "bg-brand text-white hover:bg-brand-700 active:bg-brand-pressed " +
      "disabled:bg-neutral-200 disabled:text-neutral-400",
    secondary:
      "bg-white text-neutral-700 border border-divider-strong hover:bg-neutral-50 active:bg-neutral-100 " +
      "disabled:text-neutral-400 disabled:border-divider",
  };

  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      onClick={onClick}
      className={`${base} ${sizes[size]} ${variants[variant]} ${
        isDisabled ? "cursor-not-allowed" : ""
      } ${className}`}
    >
      {loading ? (
        <span
          aria-hidden="true"
          className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin motion-reduce:animate-none"
        />
      ) : null}
      <span>{loading ? "Please wait…" : children}</span>
    </button>
  );
}

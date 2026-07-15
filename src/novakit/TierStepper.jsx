/**
 * TierStepper — NovaKit Lite (new)
 * Renders the loan tiers up to the user's offered limit as selectable chips.
 *
 * Fix: previously rendered all three fixed tiers and disabled whichever
 * were above the limit. An option the user can never select is pure
 * visual noise once it's on screen at all — even greyed out, it's still
 * something to read and discount (Hick's Law: don't offer a choice that
 * isn't actually available; NN/g minimalism: don't display what can't be
 * used). Tiers above the limit are now simply not rendered.
 *
 * UX rationale: Hick's Law (three fixed options, not a free-form amount
 * field, keeps the decision light) + NN/g Error Prevention (the over-limit
 * hard moment is prevented at input, per Context Digest assumption #4) +
 * Fitts's Law (each chip is a full 44pt+ tap target, not a tiny radio).
 *
 * Selected-state styling is deliberately NOT the same solid `bg-brand`
 * fill as the primary Button — a tinted `brand-50` background with a
 * `brand` border and `brand-700` text keeps "this is selected" visually
 * distinct from "this is the action to take," so the tier chips and the
 * Continue button don't read as the same control at a glance.
 */
export default function TierStepper({ tiers, limit, value, onChange }) {
  const availableTiers = tiers.filter((tier) => tier <= limit);

  return (
    <div>
      <div className="flex gap-2" role="radiogroup" aria-label="Advance amount">
        {availableTiers.map((tier) => {
          const selected = value === tier;
          return (
            <button
              key={tier}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(tier)}
              className={[
                "flex-1 h-14 rounded-md border text-body font-semibold transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2",
                selected
                  ? "bg-brand-50 border-brand text-brand-700"
                  : "bg-white border-divider-strong text-neutral-900 active:bg-neutral-50",
              ].join(" ")}
            >
              Rs {new Intl.NumberFormat("en-PK").format(tier)}
            </button>
          );
        })}
      </div>
      {limit < Math.max(...tiers) ? (
        <p className="mt-2 text-caption text-neutral-500">
          Your offered limit today is Rs {new Intl.NumberFormat("en-PK").format(limit)}.
        </p>
      ) : null}
    </div>
  );
}

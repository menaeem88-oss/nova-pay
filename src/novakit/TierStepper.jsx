/**
 * TierStepper — NovaKit Lite (new)
 * Renders the three fixed loan tiers as selectable chips, disabling any
 * tier above the user's offered limit — with an inline reason, not a
 * post-submit error.
 *
 * UX rationale: Hick's Law (three fixed options, not a free-form amount
 * field, keeps the decision light) + NN/g Error Prevention (the over-limit
 * hard moment is prevented at input, per Context Digest assumption #4) +
 * Fitts's Law (each chip is a full 44pt+ tap target, not a tiny radio).
 */
export default function TierStepper({ tiers, limit, value, onChange }) {
  return (
    <div>
      <div className="flex gap-2" role="radiogroup" aria-label="Advance amount">
        {tiers.map((tier) => {
          const disabled = tier > limit;
          const selected = value === tier;
          return (
            <button
              key={tier}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-disabled={disabled}
              disabled={disabled}
              onClick={() => !disabled && onChange(tier)}
              className={[
                "flex-1 h-14 rounded-md border text-body font-semibold transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2",
                disabled
                  ? "bg-neutral-100 border-divider text-neutral-400 cursor-not-allowed"
                  : selected
                  ? "bg-brand border-brand text-white"
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
          Your offered limit today is Rs {new Intl.NumberFormat("en-PK").format(limit)} — tiers above that aren't available right now.
        </p>
      ) : null}
    </div>
  );
}

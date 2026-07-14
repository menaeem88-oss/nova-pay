/**
 * AmountText — NovaKit Lite
 * Formats an integer PKR amount, e.g. 10000 -> "Rs 10,000".
 *
 * Added vs. starter: `tone` (money-in vs. money-out previously looked
 * identical — a lending app needs to visually distinguish them) and the
 * `caption` size (existed in the type scale but wasn't wired up here).
 */
const SIZES = {
  display: "text-display font-bold",
  title: "text-title font-semibold",
  body: "text-body font-semibold",
  caption: "text-caption font-semibold",
};

const TONES = {
  default: "text-neutral-900",
  positive: "text-success-700",
  negative: "text-neutral-900", // debit/repayment: emphasized, not alarming (red is reserved for danger states)
  muted: "text-neutral-500",
};

export default function AmountText({
  amount,
  size = "title",
  tone = "default",
  className = "",
}) {
  const formatted = new Intl.NumberFormat("en-PK").format(amount ?? 0);
  return (
    <span className={`${SIZES[size] || SIZES.title} ${TONES[tone] || TONES.default} ${className}`}>
      Rs {formatted}
    </span>
  );
}

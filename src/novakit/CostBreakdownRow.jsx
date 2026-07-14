import AmountText from "./AmountText.jsx";

/**
 * CostBreakdownRow — NovaKit Lite (new)
 * label + AmountText, for principal/fee/total lines. Chunks cost into
 * digestible parts rather than one undifferentiated number (Miller's Law).
 */
export default function CostBreakdownRow({ label, amount, emphasis = false, muted = false }) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className={`text-body ${muted ? "text-neutral-500" : "text-neutral-700"}`}>{label}</span>
      <AmountText amount={amount} size={emphasis ? "title" : "body"} tone={muted ? "muted" : "default"} />
    </div>
  );
}

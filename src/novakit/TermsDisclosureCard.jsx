import AmountText from "./AmountText.jsx";
import CostBreakdownRow from "./CostBreakdownRow.jsx";
import Panel from "./Panel.jsx";

/**
 * TermsDisclosureCard — NovaKit Lite (new)
 * The terms / total-cost disclosure hard moment (a).
 *
 * Layout deliberately satisfies three UX laws at once:
 * - Von Restorff + Serial Position: the total-to-repay + date headline
 *   appears FIRST (this block) and is repeated at the LAST position in the
 *   auto-debit note below, so the two most important facts bookend the
 *   screen instead of hiding in the middle.
 * - Law of Proximity / Common Region: principal+fee+total are one grouped
 *   region (the breakdown Panel); date+auto-debit are a separate region.
 */
export default function TermsDisclosureCard({ principal, fee, total, dueDateLabel, haircutNote = null, children }) {
  return (
    <div className="space-y-3">
      <div className="rounded-lg border border-brand-100 bg-brand-50 p-4">
        <div className="text-caption font-semibold text-brand-700 uppercase tracking-wide mb-1">
          Total to repay
        </div>
        <AmountText amount={total} size="display" />
        <div className="text-body text-neutral-700 mt-1">
          on <span className="font-semibold text-neutral-900">{dueDateLabel}</span>
        </div>
      </div>

      {haircutNote}

      <Panel>
        <CostBreakdownRow label="Amount disbursed" amount={principal} />
        <CostBreakdownRow label="Fee (3% of disbursed, once)" amount={fee} muted />
        <div className="border-t border-divider mt-1 pt-1">
          <CostBreakdownRow label="Total to repay" amount={total} emphasis />
        </div>
      </Panel>

      <Panel className="bg-neutral-50">
        <p className="text-body text-neutral-700">
          We'll pull <span className="font-semibold text-neutral-900">Rs {new Intl.NumberFormat("en-PK").format(total)}</span> automatically
          from your NovaPay balance on <span className="font-semibold text-neutral-900">{dueDateLabel}</span>. If your balance is short that day, we'll mark
          the advance late and let you know what happens next — no surprise charges.
        </p>
        {children}
      </Panel>
    </div>
  );
}

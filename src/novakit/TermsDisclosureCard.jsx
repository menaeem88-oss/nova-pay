import AmountText from "./AmountText.jsx";
import CostBreakdownRow from "./CostBreakdownRow.jsx";
import Panel from "./Panel.jsx";
import InfoSnippet from "./InfoSnippet.jsx";

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
 *
 * The auto-debit note used to be a full paragraph repeating the amount,
 * date, AND the late-payment consequence inline — heavy copy for a fact
 * already stated in the headline above it. Trimmed to one line and moved
 * into `InfoSnippet` (a neutral, icon-led note) instead of a plain Panel,
 * so it reads as supplementary info rather than another same-weight card.
 */
export default function TermsDisclosureCard({ principal, fee, total, dueDateLabel, haircutNote = null, children }) {
  return (
    <div className="space-y-4">
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

      <InfoSnippet>
        Auto-debits from your NovaPay balance on <span className="font-semibold text-neutral-900">{dueDateLabel}</span>.
        {children}
      </InfoSnippet>
    </div>
  );
}

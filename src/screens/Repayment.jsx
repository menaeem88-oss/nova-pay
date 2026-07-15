import { AppBar, Panel, AmountText, Button, ReminderBanner } from "../novakit";
import { useAdvanceFlow } from "../state/AdvanceFlowContext.jsx";

export default function Repayment() {
  const { repaymentView, pop, resetToHome, notify } = useAdvanceFlow();
  if (!repaymentView) return null;
  const { status, amount, daysLate, dueDateLabel } = repaymentView;
  const severe = status === "late" || status === "default";

  return (
    <>
      <AppBar title="Repayment" onBack={pop} />
      <main className="p-4 space-y-4 h-[724px] overflow-y-auto">
        <ReminderBanner status={status} daysLate={daysLate} dueDateLabel={dueDateLabel} amount={amount} />

        {/*
          One card, one clear typographic hierarchy — was a Panel (amount +
          date rows) sitting directly above a separate Card repeating the
          same idea in prose. Merged: caption label -> heading amount ->
          secondary date line -> a divider -> tertiary/caption explanation.
        */}
        <Panel>
          <div className="text-caption text-neutral-500 uppercase tracking-wide mb-1">Total to repay</div>
          <AmountText amount={amount} size="title" />
          <div className="text-body text-neutral-600 mt-1">
            {status === "on_time" ? "Repaid on" : "Due"} {dueDateLabel}
          </div>
          <p className="text-caption text-neutral-500 mt-3 pt-3 border-t border-divider">
            {status === "on_time"
              ? "Fully settled — nothing else to do."
              : "Auto-debits from your NovaPay balance — no action needed unless you'd like to add funds ahead of time."}
          </p>
        </Panel>

        {severe ? (
          <Button
            variant="secondary"
            onClick={() => notify("This is a prototype — support chat would open here.", "info")}
          >
            Contact support
          </Button>
        ) : null}

        <Button onClick={resetToHome}>Done</Button>
      </main>
    </>
  );
}

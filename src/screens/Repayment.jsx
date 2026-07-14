import { AppBar, Card, Panel, Button, CostBreakdownRow, ReminderBanner } from "../novakit";
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

        <Panel>
          <CostBreakdownRow label="Total to repay" amount={amount} emphasis />
          <div className="flex items-center justify-between py-1.5">
            <span className="text-body text-neutral-500">
              {status === "on_time" ? "Repaid on" : "Repayment date"}
            </span>
            <span className="text-body text-neutral-900 font-semibold">{dueDateLabel}</span>
          </div>
        </Panel>

        <Card>
          <p className="text-body text-neutral-700">
            {status === "on_time"
              ? "This advance is fully settled — nothing else to do."
              : "Repayment is pulled automatically from your NovaPay balance — you don't need to do anything manually unless you'd like to add funds ahead of time."}
          </p>
        </Card>

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

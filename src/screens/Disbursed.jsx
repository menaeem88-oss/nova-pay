import { AppBar, Card, Panel, Button, CostBreakdownRow, StatusBanner } from "../novakit";
import { useAdvanceFlow } from "../state/AdvanceFlowContext.jsx";
import { DUE_DATE_LABEL } from "../data/productRules.js";

export default function Disbursed() {
  const { disbursedAmount, total, isHaircut, viewRepaymentFromFlow, resetToHome } = useAdvanceFlow();

  return (
    <>
      <AppBar title="You're all set" />
      <main className="p-4 space-y-4 h-[724px] overflow-y-auto">
        <StatusBanner tone="success" label="Disbursed" title={`Rs ${new Intl.NumberFormat("en-PK").format(disbursedAmount)} sent to your NovaPay balance`}>
          {isHaircut
            ? "This reflects the adjusted amount you reviewed and accepted."
            : "You can use it right away."}
        </StatusBanner>

        <Panel>
          <CostBreakdownRow label="Disbursed" amount={disbursedAmount} />
          <div className="border-t border-divider mt-1 pt-1">
            <CostBreakdownRow label="Total to repay" amount={total} emphasis />
          </div>
          <div className="pt-2 text-caption text-neutral-500">Pulled automatically on {DUE_DATE_LABEL}</div>
        </Panel>

        <Card>
          <p className="text-body text-neutral-700">
            We'll remind you before {DUE_DATE_LABEL}. No action needed if your balance is ready that day.
          </p>
        </Card>

        <div className="space-y-2">
          <Button size="lg" onClick={viewRepaymentFromFlow}>
            View repayment schedule
          </Button>
          <Button variant="secondary" onClick={resetToHome}>
            Done
          </Button>
        </div>
      </main>
    </>
  );
}

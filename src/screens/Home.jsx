import {
  AppBar,
  Card,
  ListRow,
  Button,
  AmountText,
  ReminderBanner,
} from "../novakit";
import { useAdvanceFlow } from "../state/AdvanceFlowContext.jsx";
import { REPAYMENT_SCENARIOS } from "../data/scenarios.js";

export default function Home() {
  const { startApplication, repaymentScenarioKey, viewExistingRepayment } = useAdvanceFlow();

  const hasExistingAdvance = repaymentScenarioKey !== "none";
  const existing = REPAYMENT_SCENARIOS[repaymentScenarioKey];

  return (
    <>
      <AppBar title="NovaPay" />
      <main className="p-4 space-y-4 h-[724px] overflow-y-auto">
        <Card>
          <div className="text-caption text-neutral-500">Available balance</div>
          <div className="mt-1">
            <AmountText amount={4250} size="display" />
          </div>
        </Card>

        {hasExistingAdvance ? (
          <button
            type="button"
            onClick={viewExistingRepayment}
            className="w-full text-left rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
          >
            <ReminderBanner
              status={existing.status}
              daysLate={existing.daysLate}
              dueDateLabel={existing.dueDateLabel}
              amount={existing.amount}
            />
          </button>
        ) : (
          <Card className="space-y-3">
            <div>
              <div className="text-title font-semibold text-neutral-900">Need cash before payday?</div>
              <div className="text-body text-neutral-700 mt-1">
                You may qualify for a NovaPay salary advance.
              </div>
            </div>
            <Button size="lg" onClick={startApplication}>
              See your offer
            </Button>
          </Card>
        )}

        <Card>
          <div className="text-caption text-neutral-500 mb-1">Recent activity</div>
          <ListRow
            icon="↑"
            title="Sent to Ahmed K."
            subtitle="Today, 2:14 PM"
            trailing={<AmountText amount={1500} size="body" />}
          />
          <ListRow
            icon="↓"
            title="Salary credited"
            subtitle="28 Jun"
            trailing={<AmountText amount={68000} size="body" />}
          />
          <ListRow
            icon="↑"
            title="Mobile top-up"
            subtitle="27 Jun"
            trailing={<AmountText amount={500} size="body" />}
          />
        </Card>
      </main>
    </>
  );
}

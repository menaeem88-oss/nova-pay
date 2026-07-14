import {
  AppBar,
  Card,
  Panel,
  ListRow,
  Button,
  AmountText,
  ReminderBanner,
  Chip,
} from "../novakit";
import { useAdvanceFlow } from "../state/AdvanceFlowContext.jsx";
import { DECISION_SCENARIOS, REPAYMENT_SCENARIOS } from "../data/scenarios.js";

export default function Home() {
  const {
    startApplication,
    decisionScenarioKey,
    setDecisionScenarioKey,
    repaymentScenarioKey,
    setRepaymentScenarioKey,
    viewExistingRepayment,
  } = useAdvanceFlow();

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

        <Panel className="bg-neutral-50">
          <div className="text-caption font-semibold text-neutral-500 uppercase tracking-wide mb-2">
            Prototype scenarios <span className="normal-case font-normal">— for this review only, not a product screen</span>
          </div>

          <div className="mb-3">
            <div className="text-caption text-neutral-500 mb-1">Decision outcome for "See your offer"</div>
            <div className="flex flex-wrap gap-1.5">
              {Object.entries(DECISION_SCENARIOS).map(([key, s]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setDecisionScenarioKey(key)}
                  className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded-full"
                >
                  <Chip tone={key === decisionScenarioKey ? "brand" : "neutral"}>{s.label}</Chip>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-caption text-neutral-500 mb-1">Existing advance state</div>
            <div className="flex flex-wrap gap-1.5">
              {Object.entries(REPAYMENT_SCENARIOS).map(([key, s]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setRepaymentScenarioKey(key)}
                  className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded-full"
                >
                  <Chip tone={key === repaymentScenarioKey ? "brand" : "neutral"}>{s.label}</Chip>
                </button>
              ))}
            </div>
          </div>
        </Panel>
      </main>
    </>
  );
}

import { AppBar, Card, Button, TierStepper, ProgressStepper } from "../novakit";
import { useAdvanceFlow } from "../state/AdvanceFlowContext.jsx";
import { TIERS } from "../data/productRules.js";

export default function AmountSelect() {
  const { scenario, chosenTier, setChosenTier, push, pop } = useAdvanceFlow();

  return (
    <>
      <AppBar title="Choose your amount" onBack={pop} />
      <main className="p-4 space-y-4 h-[724px] overflow-y-auto">
        <ProgressStepper steps={["Amount", "Review", "Confirm"]} current={0} />
        <Card className="space-y-3">
          <div className="text-body text-neutral-700">
            Pick the amount you need. You can only choose up to your offered limit — asking for more isn't possible here, so there's nothing to get wrong.
          </div>
          <TierStepper tiers={TIERS} limit={scenario.limit} value={chosenTier} onChange={setChosenTier} />
        </Card>
        <Button size="lg" disabled={!chosenTier} onClick={() => push("terms")}>
          Continue
        </Button>
      </main>
    </>
  );
}

import { Toast } from "./novakit";
import { AdvanceFlowProvider, useAdvanceFlow } from "./state/AdvanceFlowContext.jsx";
import Home from "./screens/Home.jsx";
import Offer from "./screens/Offer.jsx";
import AmountSelect from "./screens/AmountSelect.jsx";
import Terms from "./screens/Terms.jsx";
import Disbursed from "./screens/Disbursed.jsx";
import Repayment from "./screens/Repayment.jsx";

const SCREENS = {
  home: Home,
  offer: Offer,
  amount: AmountSelect,
  terms: Terms,
  disbursed: Disbursed,
  repayment: Repayment,
};

function FlowRouter() {
  const { screen, toast } = useAdvanceFlow();
  const Screen = SCREENS[screen] || Home;
  return (
    <>
      <Screen />
      <Toast open={toast.open} message={toast.message} variant={toast.variant} />
    </>
  );
}

/**
 * NovaPay salary-advance prototype.
 * Spine: Home -> Offer (approved|declined) -> Amount select (over-limit
 * blocked) -> Terms/total-cost disclosure -> Accept (modal, auto-debit
 * consent) -> Disbursed (+haircut variant) -> Repayment (upcoming/due/
 * late/default). See docs/FLOWS.md for the full state inventory.
 */
export default function App() {
  return (
    <div className="min-h-screen w-full flex justify-center py-6">
      {/* Mobile frame */}
      <div className="relative w-[390px] h-[780px] bg-white rounded-[28px] shadow-xl overflow-hidden border border-neutral-300">
        <AdvanceFlowProvider>
          <FlowRouter />
        </AdvanceFlowProvider>
      </div>
    </div>
  );
}

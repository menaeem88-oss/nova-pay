import { Toast } from "./novakit";
import { AdvanceFlowProvider, useAdvanceFlow } from "./state/AdvanceFlowContext.jsx";
import ScenarioSidebar from "./dev/ScenarioSidebar.jsx";
import Home from "./screens/Home.jsx";
import Offer from "./screens/Offer.jsx";
import Terms from "./screens/Terms.jsx";
import Disbursed from "./screens/Disbursed.jsx";
import Repayment from "./screens/Repayment.jsx";

const SCREENS = {
  home: Home,
  offer: Offer,
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
 * Spine: Home -> Offer (approved w/ amount select, over-limit blocked |
 * declined) -> Terms/total-cost disclosure -> Accept (modal, auto-debit
 * consent) -> Disbursed (+haircut variant) -> Repayment (upcoming/due/
 * late/default). See docs/FLOWS.md for the full state inventory.
 *
 * Layout: the reviewer-only ScenarioSidebar sits outside the phone frame
 * (left on wide viewports, stacked above it on narrow ones) so it's never
 * mistaken for part of the product UI. AdvanceFlowProvider wraps both so
 * the sidebar can drive the same live state the phone frame renders.
 */
export default function App() {
  return (
    <AdvanceFlowProvider>
      <div className="min-h-screen w-full flex flex-col lg:flex-row items-center justify-center gap-6 py-6 px-4">
        <ScenarioSidebar />

        {/* Mobile frame */}
        <div className="relative w-[390px] h-[780px] bg-white rounded-frame shadow-xl overflow-hidden border border-neutral-300">
          <FlowRouter />
        </div>
      </div>
    </AdvanceFlowProvider>
  );
}

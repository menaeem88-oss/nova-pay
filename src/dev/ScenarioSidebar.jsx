import { Chip } from "../novakit";
import { useAdvanceFlow } from "../state/AdvanceFlowContext.jsx";
import { DECISION_SCENARIOS, REPAYMENT_SCENARIOS } from "../data/scenarios.js";

/**
 * ScenarioSidebar — reviewer tooling, NOT part of the NovaPay product UI.
 *
 * This used to live inside the phone frame as a Panel at the bottom of
 * Home, which blurred the line between "the app" and "how a reviewer
 * drives the demo." Moved outside the frame entirely and styled with a
 * dashed border + monospace label on a plain page background — deliberately
 * NOT using the phone's rounded/shadowed chrome — so it reads unambiguously
 * as an external control surface, not a screen a NovaPay user would ever see.
 */
export default function ScenarioSidebar() {
  const {
    decisionScenarioKey,
    setDecisionScenarioKey,
    repaymentScenarioKey,
    setRepaymentScenarioKey,
  } = useAdvanceFlow();

  return (
    <aside
      aria-label="Prototype review controls"
      className="w-full lg:w-[280px] shrink-0 rounded-lg border border-dashed border-neutral-400 bg-white/80 p-4"
    >
      <div className="flex items-center gap-2 mb-1">
        <span aria-hidden="true" className="text-body">🧪</span>
        <span className="text-caption font-semibold font-mono uppercase tracking-wide text-neutral-500">
          Reviewer controls
        </span>
      </div>
      <p className="text-caption text-neutral-500 mb-4">
        Not part of NovaPay's UI — drives the mock decisioning so every path is reachable without a backend.
      </p>

      <div className="mb-4">
        <div className="text-caption text-neutral-500 mb-1.5">Decision outcome for "See your offer"</div>
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
        <div className="text-caption text-neutral-500 mb-1.5">Existing advance state (Home banner)</div>
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
    </aside>
  );
}

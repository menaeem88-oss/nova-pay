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
 *
 * Sized to match the phone frame's height (780px) so the two panels read as
 * one reviewing surface, with full-width option rows (not small pills) for
 * easier scanning/clicking than the original chip grid.
 */
function OptionRow({ label, selected, onClick }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={[
        "w-full flex items-center justify-between gap-2 rounded-md border px-3 py-2 text-body font-semibold text-left transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-1",
        selected
          ? "bg-brand-50 border-brand text-brand-700"
          : "bg-white border-divider-strong text-neutral-700 hover:bg-neutral-50",
      ].join(" ")}
    >
      <span>{label}</span>
      {selected ? (
        <span aria-hidden="true" className="text-brand-700">
          ✓
        </span>
      ) : null}
    </button>
  );
}

export default function ScenarioSidebar() {
  const {
    decisionScenarioKey,
    selectDecisionScenario,
    repaymentScenarioKey,
    setRepaymentScenarioKey,
  } = useAdvanceFlow();

  return (
    <aside
      aria-label="Prototype review controls"
      className="w-full lg:w-[320px] shrink-0 h-auto lg:h-[780px] flex flex-col rounded-lg border border-dashed border-neutral-400 bg-white/80 p-4 overflow-y-auto"
    >
      <div className="flex items-center gap-2 mb-1">
        <span aria-hidden="true" className="text-body">🧪</span>
        <span className="text-caption font-semibold font-mono uppercase tracking-wide text-neutral-500">
          Reviewer controls
        </span>
      </div>
      <p className="text-caption text-neutral-500 mb-3">
        Not part of NovaPay's UI — drives the mock decisioning so every path is reachable without a backend.
      </p>

      <div className="mb-4">
        <div className="text-caption text-neutral-500 mb-1.5">Decision outcome for "See your offer"</div>
        <div className="flex flex-col gap-1.5">
          {Object.entries(DECISION_SCENARIOS).map(([key, s]) => (
            <OptionRow
              key={key}
              label={s.label}
              selected={key === decisionScenarioKey}
              onClick={() => selectDecisionScenario(key)}
            />
          ))}
        </div>
      </div>

      <div>
        <div className="text-caption text-neutral-500 mb-1.5">Existing advance state (Home banner)</div>
        <div className="flex flex-col gap-1.5">
          {Object.entries(REPAYMENT_SCENARIOS).map(([key, s]) => (
            <OptionRow
              key={key}
              label={s.label}
              selected={key === repaymentScenarioKey}
              onClick={() => setRepaymentScenarioKey(key)}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}

import { useState } from "react";
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
 * one reviewing surface. The two option groups are single-open accordions
 * (picking one section always collapses the other) to keep the panel light
 * rather than a permanent wall of buttons.
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

function AccordionSection({ id, title, isOpen, onToggle, children }) {
  return (
    <div className="border-b border-divider last:border-b-0">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={`${id}-panel`}
        id={`${id}-header`}
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-2 py-2.5 text-caption text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded-sm"
      >
        <span>{title}</span>
        <span
          aria-hidden="true"
          className={`transition-transform duration-200 motion-reduce:transition-none ${isOpen ? "rotate-180" : ""}`}
        >
          ▾
        </span>
      </button>
      <div
        role="region"
        id={`${id}-panel`}
        aria-labelledby={`${id}-header`}
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out motion-reduce:transition-none ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-1.5 pb-3">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default function ScenarioSidebar() {
  const {
    decisionScenarioKey,
    selectDecisionScenario,
    repaymentScenarioKey,
    selectRepaymentScenario,
  } = useAdvanceFlow();

  const [openSection, setOpenSection] = useState("decision");

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
      <p className="text-caption text-neutral-500 mb-1">
        Not part of NovaPay's UI — drives the mock decisioning so every path is reachable without a backend.
      </p>

      <AccordionSection
        id="decision"
        title='Decision outcome for "See your offer"'
        isOpen={openSection === "decision"}
        onToggle={() => setOpenSection("decision")}
      >
        {Object.entries(DECISION_SCENARIOS).map(([key, s]) => (
          <OptionRow
            key={key}
            label={s.label}
            selected={key === decisionScenarioKey}
            onClick={() => selectDecisionScenario(key)}
          />
        ))}
      </AccordionSection>

      <AccordionSection
        id="repayment"
        title="Existing advance state (Home banner)"
        isOpen={openSection === "repayment"}
        onToggle={() => setOpenSection("repayment")}
      >
        {Object.entries(REPAYMENT_SCENARIOS).map(([key, s]) => (
          <OptionRow
            key={key}
            label={s.label}
            selected={key === repaymentScenarioKey}
            onClick={() => selectRepaymentScenario(key)}
          />
        ))}
      </AccordionSection>
    </aside>
  );
}

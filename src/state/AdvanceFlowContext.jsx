import { createContext, useContext, useMemo, useRef, useState } from "react";
import { DECISION_SCENARIOS, REPAYMENT_SCENARIOS } from "../data/scenarios.js";
import { computeFee, computeTotal, DUE_DATE_LABEL } from "../data/productRules.js";

const AdvanceFlowContext = createContext(null);

export function AdvanceFlowProvider({ children }) {
  const [decisionScenarioKey, setDecisionScenarioKey] = useState("approved_full");
  const [repaymentScenarioKey, setRepaymentScenarioKey] = useState("none");
  const [stack, setStack] = useState(["home"]);
  const [chosenTier, setChosenTier] = useState(null);
  const [autoDebitConsent, setAutoDebitConsent] = useState(false);
  const [accepting, setAccepting] = useState(false);
  const [repaymentView, setRepaymentView] = useState(null);
  const [toast, setToast] = useState({ open: false, message: "", variant: "info" });
  const toastTimer = useRef(null);

  const screen = stack[stack.length - 1];
  const scenario = DECISION_SCENARIOS[decisionScenarioKey];

  function push(next) {
    setStack((s) => [...s, next]);
  }
  function pop() {
    setStack((s) => (s.length > 1 ? s.slice(0, -1) : s));
  }
  function resetFlowState() {
    setStack(["home"]);
    setChosenTier(null);
    setAutoDebitConsent(false);
    setAccepting(false);
  }
  function resetToHome() {
    resetFlowState();
  }
  function startApplication() {
    setChosenTier(null);
    setAutoDebitConsent(false);
    push("offer");
  }
  function selectDecisionScenario(key) {
    // Home shows either the existing-advance banner OR the "See your
    // offer" CTA, never both — so leaving a stale existing-advance state
    // selected would hide the CTA a reviewer just asked to test. Picking a
    // decision outcome always clears it back to "no active advance".
    //
    // Also resets navigation back to Home: without this, picking a new
    // scenario while already mid-flow (e.g. on the "Your offer" screen)
    // left the reviewer stranded on that screen showing stale state
    // instead of restarting from the natural entry point.
    setDecisionScenarioKey(key);
    setRepaymentScenarioKey("none");
    resetFlowState();
  }
  function selectRepaymentScenario(key) {
    setRepaymentScenarioKey(key);
    resetFlowState();
  }
  function notify(message, variant = "info") {
    clearTimeout(toastTimer.current);
    setToast({ open: true, message, variant });
    toastTimer.current = setTimeout(() => setToast((t) => ({ ...t, open: false })), 2600);
  }
  function viewRepaymentFromFlow() {
    setRepaymentView({ status: "upcoming", amount: total, daysLate: 0, dueDateLabel: DUE_DATE_LABEL });
    push("repayment");
  }
  function viewExistingRepayment() {
    const s = REPAYMENT_SCENARIOS[repaymentScenarioKey];
    if (!s || repaymentScenarioKey === "none") return;
    setRepaymentView(s);
    push("repayment");
  }

  // Haircut math: disbursed can be less than applied when risk checks
  // warrant it. Rounded to the nearest Rs 100, both principal and fee then
  // recompute — this is not a silent adjustment, it's shown on Terms.
  const disbursedAmount = useMemo(() => {
    if (!chosenTier) return 0;
    if (scenario?.haircut) return Math.round((chosenTier * 0.6) / 100) * 100;
    return chosenTier;
  }, [chosenTier, scenario]);

  const fee = computeFee(disbursedAmount);
  const total = computeTotal(disbursedAmount);
  const isHaircut = Boolean(scenario?.haircut && chosenTier && disbursedAmount < chosenTier);

  const value = {
    decisionScenarioKey,
    setDecisionScenarioKey,
    selectDecisionScenario,
    repaymentScenarioKey,
    setRepaymentScenarioKey,
    selectRepaymentScenario,
    scenario,
    screen,
    push,
    pop,
    resetToHome,
    startApplication,
    chosenTier,
    setChosenTier,
    autoDebitConsent,
    setAutoDebitConsent,
    accepting,
    setAccepting,
    disbursedAmount,
    fee,
    total,
    isHaircut,
    repaymentView,
    viewRepaymentFromFlow,
    viewExistingRepayment,
    toast,
    notify,
  };

  return <AdvanceFlowContext.Provider value={value}>{children}</AdvanceFlowContext.Provider>;
}

export function useAdvanceFlow() {
  const ctx = useContext(AdvanceFlowContext);
  if (!ctx) throw new Error("useAdvanceFlow must be used within AdvanceFlowProvider");
  return ctx;
}

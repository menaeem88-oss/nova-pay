/**
 * Mock scenarios — this prototype has no backend, so decisioning is
 * simulated. Each scenario mirrors real fields from PRODUCT_REFERENCE.md
 * (decision, denial_reason, income_verified, income_source) so the UI
 * logic is exactly what it would be against a real API.
 *
 * Selectable from the Home screen's "Prototype scenarios" panel — see
 * Context Digest assumption #7. This panel is clearly out-of-product
 * scaffolding, not a designed screen.
 */
export const DECISION_SCENARIOS = {
  approved_full: {
    label: "Approved — full limit",
    decision: "approved",
    limit: 15000,
    incomeVerified: true,
    incomeSource: "salaried",
    haircut: false,
  },
  approved_mid: {
    label: "Approved — mid limit",
    decision: "approved",
    limit: 10000,
    incomeVerified: true,
    incomeSource: "salaried",
    haircut: false,
  },
  haircut: {
    label: "Approved — with haircut",
    decision: "approved",
    limit: 15000,
    incomeVerified: true,
    incomeSource: "salaried",
    haircut: true,
  },
  declined_credit_score: {
    label: "Declined — credit score",
    decision: "denied",
    denialReason: "credit_score",
    incomeSource: "salaried",
  },
  declined_income_unverified: {
    label: "Declined — income unverified",
    decision: "denied",
    denialReason: "income_unverified",
    incomeVerified: false,
    incomeSource: "salaried",
  },
  declined_freelance: {
    label: "Declined — freelance income",
    decision: "denied",
    denialReason: "other",
    incomeSource: "freelance",
  },
};

export const DECLINE_COPY = {
  credit_score: {
    kicker: "Declined",
    title: "We can't offer an advance right now",
    body: "Based on your account history, we're not able to extend a salary advance today. This isn't permanent — we review eligibility again as your account activity changes, no reapplication needed.",
    actionLabel: null,
  },
  income_unverified: {
    kicker: "Declined",
    title: "We couldn't verify your income",
    body: "We need a recent payslip or bank statement to confirm your salary before we can offer an advance. This usually takes a couple of minutes.",
    actionLabel: "Verify income",
  },
  other: {
    kicker: "Not available yet",
    title: "This advance isn't available for your account",
    body: "NovaPay salary advances currently require a fixed salaried payday to repay against. Freelance and variable income aren't supported yet — we're exploring how to extend this responsibly.",
    actionLabel: null,
  },
};

// Independent of the decision scenario above: lets the reviewer see the
// Home screen's existing-advance banner and the Repayment screen in every
// post-disbursement state without re-running the whole accept flow.
export const REPAYMENT_SCENARIOS = {
  none: { label: "No active advance" },
  upcoming: { label: "Upcoming", status: "upcoming", amount: 10300, daysLate: 0, dueDateLabel: "4 Aug" },
  due_today: { label: "Due today", status: "due_today", amount: 10300, daysLate: 0, dueDateLabel: "14 Jul" },
  late: { label: "Late", status: "late", amount: 10300, daysLate: 4, dueDateLabel: "10 Jul" },
  default: { label: "Default (30+ days)", status: "default", amount: 15450, daysLate: 34, dueDateLabel: "10 Jun" },
  on_time: { label: "Settled on time", status: "on_time", amount: 5150, daysLate: 0, dueDateLabel: "23 Jun" },
};

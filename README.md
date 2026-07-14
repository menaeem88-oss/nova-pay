# NovaPay — salary advance prototype

A coded, runnable prototype of the NovaPay salary-advance flow, built on **NovaKit Lite** for the AI-First Product Designer case study. Covers the three hard moments — terms/total-cost disclosure, the accept decision, and the not-good paths (declined, over-limit, haircut, late/default) — end to end.

## Run it

```bash
npm install
npm run dev
```

Open the local URL Vite prints. The app renders inside a ~390px mobile frame.

```bash
npm run build   # production build / sanity check
```

**To click through every path:** a "Reviewer controls" panel sits outside the phone frame (left on wide viewports, stacked above it on narrow ones) — deliberately styled as external tooling, not a product screen, so it's never mistaken for part of the NovaPay UI. It has chips to switch the decision outcome (approved at each limit, haircut, or each of the three decline reasons) and the existing-advance repayment state (upcoming/due/late/default/on-time), driving the phone frame live. There's no backend, so this is how a reviewer reaches every hard moment without re-running real underwriting.

## Read this first

| Doc | What's in it |
|---|---|
| [`docs/CONTEXT_DIGEST.md`](docs/CONTEXT_DIGEST.md) | Product rules restated, the three hard moments, constraints, assumptions (Gate 0) |
| [`docs/BENCHMARK.md`](docs/BENCHMARK.md) | Trust-forward references per hard moment — adopted vs. rejected, patterns designed against |
| [`docs/FLOWS.md`](docs/FLOWS.md) | Flow map, full state inventory, copy deck, UX-law tags on key decisions |
| [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md) | Every token/component added or changed, one-line rationale, code map (Code Connect–style) |
| [`docs/HIG_CHECKLIST.md`](docs/HIG_CHECKLIST.md) | iOS HIG + WCAG AA checklist, pass/fail with fixes applied |
| [`docs/WRITEUP.md`](docs/WRITEUP.md) | The ~2-page submission writeup (what's going on, what was built and why, success metrics, never-do list, assumptions, open questions, what I'd do differently) |
| [`docs/AI_LOG.md`](docs/AI_LOG.md) | AI process log + one AI-generated output that was rejected and reworked |

## What's in the code

```
src/
  novakit/                 # design system — extended for this build
    Button, TextField, Card, Panel, ListRow, AppBar,
    BottomSheet, Toast, AmountText          # fixed — see docs/DESIGN_SYSTEM.md
    TierStepper, CostBreakdownRow, StatusBanner,
    TermsDisclosureCard, ReminderBanner, ProgressStepper,
    EmptyState, Skeleton, Chip              # new
  screens/                 # Home, Offer, AmountSelect, Terms, Disbursed, Repayment
  state/AdvanceFlowContext.jsx   # navigation + application state (no backend — mocked)
  data/productRules.js, scenarios.js        # fee/haircut math + mock decision scenarios
  dev/ScenarioSidebar.jsx  # reviewer-only controls, rendered outside the phone frame
  App.jsx                  # page shell (sidebar + phone frame) + router
tailwind.config.js          # extended tokens — see docs/DESIGN_SYSTEM.md
```

## Product rules (source of truth)

See `PRODUCT_REFERENCE.md` — tiers (PKR 5,000/10,000/15,000), 3% one-time fee on disbursed amount, single repayment on next payday, haircut may reduce disbursed below applied, decline reasons (`credit_score`/`income_unverified`/`other`), repayment states (`on_time`/`late`/`default`).

# QA Report — full project pass

Scope: functional click-through of every path (real browser, Playwright-driven with assertions), independent business-rule math verification, regression checks against every review-round fix from this session, and code/docs hygiene. Run at commit `36d942a` + the doc fixes in this commit.

## 1. Functional QA — 12/12 checks pass, zero console errors

| Check | Result |
|---|---|
| Full-limit end-to-end: Home → Offer+amount → Terms → Accept sheet → Disbursed → Repayment, with consent gating (Accept disabled until checkbox) and Continue gating (disabled until tier chosen) | PASS |
| Mid-limit: Rs 15,000 tier not rendered at all; limit caption shown | PASS |
| Haircut: recomputed numbers on Terms (Rs 6,000/180/6,180 from a Rs 10,000 application), inline one-line reason, no "Why?" link, Disbursed carries the adjusted numbers | PASS |
| Declined — credit score: humane title, InfoSnippet reassurance, Back to home works | PASS |
| Declined — income unverified: same + "Verify income" action present | PASS |
| Declined — freelance: same, no action (correct — nothing recoverable) | PASS |
| All five repayment states reachable from the Home banner; "Contact support" appears for late/default only | PASS |
| Sidebar: picking a decision scenario mid-flow (from the Terms screen) resets navigation to Home and clears the existing-advance state | PASS |
| Accordion: single-open; expanding one section collapses the other (verified via `aria-expanded`) | PASS |
| Accept sheet: ESC closes it; "Not now" is disabled mid-accept (can't cancel an in-flight request) | PASS |
| Terms "?" FAQ sheet: two entries on a normal flow; the haircut entry does not leak into non-haircut flows | PASS |
| Sticky wizard stepper: verified scrolled state; no visual artifact (see note below) | PASS |

## 2. Business-rule math — all pass (recomputed independently, not read off the UI)

- Fee = `round(disbursed × 0.03)` for every tier: 5,000→150, 10,000→300, 15,000→450 ✓
- Haircut = 60% of applied, rounded to nearest Rs 100; fee and total recompute from the *disbursed* amount: 5,000→3,000/90/3,090 · 10,000→6,000/180/6,180 · 15,000→9,000/270/9,270 — all integers, no rounding artifacts ✓
- Every mock repayment-scenario amount (10,300 / 15,450 / 5,150) equals a valid tier total — internally consistent ✓

## 3. Regression — all session fixes still hold

Radii are token-only (no `rounded-[...]` anywhere); dark balance card token-driven with `inverse` AmountText tone; back chevron is a stroke SVG; wizard stepper has original styling, in-flow, `sticky`; `InfoSnippet` used on both the auto-debit note and decline reassurance; haircut banner has no "Why?" indirection; Repayment screen is one card with caption→heading→secondary→caption hierarchy; selected tier chips (tinted) are visually distinct from the primary button (solid); `space-y-xl` (24px) stack rhythm on all five screens; accordion chevron at title-size/bold; focus-visible + `motion-reduce` + aria roles (`dialog`/`status`/`alert`/`radiogroup`/`aria-expanded`) all present; 44px+ tap targets on product-UI controls.

## 4. Defects found → fixed in this commit (all documentation-level)

1. **`docs/FLOWS.md` copy deck was stale** — still quoted the pre-trim auto-debit paragraph and the old long haircut copy. Updated to the current one-line strings.
2. **`docs/FLOWS.md` Proximity/Common-Region tag** said the auto-debit fact lives in "a separate Panel" — it's an `InfoSnippet` now. Updated.
3. **`docs/DESIGN_SYSTEM.md` `Chip` entry** claimed it's "used for the scenario switcher" — stale since the sidebar moved to full-width option rows. Reworded as library surface with its history noted.
4. **`docs/DESIGN_SYSTEM.md` `AmountText` entry** didn't list the later-added `inverse` tone. Added.

## 5. Informational notes (no action taken — flagged for awareness)

- **Library-surface components with no current app usage:** `TextField` (starter), `EmptyState`, `Chip`. All are documented as intentional surface; none are dead weight worth deleting in a design-system context.
- **`src/index.css` keeps two raw hex values** (page canvas color behind the phone frame, base text color) — starter chrome outside the product UI, deliberately left out of the token audit's scope.
- **The sticky stepper never visibly engages today**: no screen has more than ~11px of scrollable overflow at the standard frame size, so the pinning is future-proofing for taller content rather than observable behavior.
- **Reviewer-sidebar controls (option rows ~40px, accordion headers ~38px) sit under the 44pt tap-target minimum** — acceptable because the HIG gate applies to the product UI in the phone frame, not the desktop reviewer tooling; noted in case that tooling is ever reused on touch devices.
- **`AdvanceFlowContext` exports raw `setDecisionScenarioKey`/`setRepaymentScenarioKey`** alongside the `select*` wrappers; only the wrappers are used by the UI. Harmless API surface.

## Verdict

No functional, business-rule, or regression defects found. Four stale-documentation defects found and fixed. Build clean (`vite build`, 60 modules), zero page errors across all click-throughs.

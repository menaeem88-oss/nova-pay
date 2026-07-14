# Context Digest — Gate 0

*Written before any screen, token, or component was touched, per the master prompt's operating principle "read before you build."*

## Product rules (restated)

- **Tiers:** PKR 5,000 / 10,000 / 15,000. The offered limit is the highest tier a user qualifies for; they may take any amount up to it. **Requesting above the limit is not allowed** — it must be prevented at input, not rejected after submit.
- **Fee:** flat **3% of the amount disbursed**, charged once. Rs 10,000 disbursed → Rs 300 fee → Rs 10,300 owed. Not monthly interest, not compounding.
- **Tenor:** a single repayment, pulled automatically on the user's next payday (~2–4 weeks out). The exact date is known at offer time and must be shown before acceptance.
- **Haircut:** disbursed amount may be *less* than the amount applied for, if risk checks warrant it. When this happens, **both principal and the 3% fee recompute** — this is a disclosure moment, not a silent adjustment.
- **Repayment is auto-debited.** The user must understand and consent to this at accept time. Insufficient balance on payday → `late` (tracked via `days_late`) → `default` at 30+ days.
- **Decisions:** `approved` / `denied` in the data model, shown to users as **Approved / Declined**. Internal decline reasons — `credit_score`, `income_unverified`, `other` — are never surfaced as raw enums; they're translated into humane copy with a real next step.
- **Repayment states:** `on_time`, `late` (+ `days_late`), `default` (30+ days late).
- **Data fields:** `applied_amount`, `disbursed_amount`, `decision`, `denial_reason`, `repayment_status`, `days_late`, `income_verified`, `income_source` (`salaried` / `freelance`).

## The tension worth naming

NovaPay is a *salary* advance for *salaried* users, but the schema allows `income_source: freelance`. That's a structural mismatch, not an edge case — a freelance applicant has no "payday" for the auto-debit tenor to anchor to. I'm treating `freelance` as **out of scope for this product** and routing it to the same humane decline path as `income_unverified`, rather than inventing a parallel freelance underwriting model the brief never asked for.

## The three hard moments (what gets built with depth)

1. **Terms / total-cost disclosure** — the moment the user sees what the advance actually costs and when it's collected. Principal, fee, total, and repayment date must be legible together, with total-and-date visually dominant (Von Restorff), on the *same screen* as the decision to accept.
2. **The accept decision** — the highest-trust moment in the app. Consent to auto-debit must be explicit, not implied by tapping a big button. This is where Doherty (perceived responsiveness) and Peak-End (this is a peak) matter most.
3. **One not-good path, built deep** — I'm building **all three** of decline, over-limit, and late/default to a real standard, because they share one underlying component (`StatusBanner`) and the incremental cost of covering all three is low once the humane-copy pattern is established. Over-limit is designed as *prevention* (disabled state + inline explanation), not a post-submit rejection — the other two are true "bad news" screens designed for dignity.

## Constraints

- Mobile viewport (~390px frame), coded not mock — must run via `npm run dev`.
- Build only enough surrounding flow (offer, entry point) to make the three moments legible. Not counted on screen count; restraint is graded.
- Every token/component change must exist in code with a rationale; a Figma file or an equivalent Code Connect–style mapping is acceptable — I'm using the markdown mapping (see `docs/DESIGN_SYSTEM.md`) since the brief explicitly allows either and no target Figma file was provided for this session.
- iOS HIG + WCAG AA is a completion gate (§5 of the master prompt), not a nice-to-have: 44×44pt targets, focus-visible states, Reduce Motion respected, no meaning encoded in color alone.

## Assumptions I'm resolving now (see `docs/WRITEUP.md` §5 for the full list)

1. Total cost of credit **and** repayment date sit on the same screen as Accept, even though this is more numbers than a typical "one big CTA" screen — trust over conversion.
2. Auto-debit consent is an explicit, separately-legible checkbox/switch inside the accept sheet, not implied by the primary button.
3. `income_source: freelance` → routed to Declined (reason: `other`, surfaced humanely as "this advance isn't available for your income type yet").
4. Over-limit is prevented at the amount-selection step (tier chips above the limit are disabled with an inline reason), never a post-submit error.
5. Haircut triggers a re-disclosure screen with recomputed numbers and a genuine, no-penalty decline option — accepting the original offer silently at a lower amount would be a dark pattern.
6. Fee is computed as `round(disbursed * 0.03)`, always shown as its own line, never folded into "total" without a visible breakdown.
7. Since this is a click-through prototype with no backend, I'm adding a small **scenario switcher** on the Home screen (approved / declined / haircut / late) so a reviewer can reach every hard moment without needing real underwriting logic. This is scaffolding for the demo, not a product screen, and is marked as such in the UI.

*No blocking ambiguity remains — proceeding to benchmarking and build.*

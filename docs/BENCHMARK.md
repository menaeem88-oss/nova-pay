# Benchmark matrix — Gate 3

Trust-forward references for each hard moment, per the master prompt §3. Adapted, not copied — each row states what was taken and what was deliberately rejected.

## (a) Terms / total-cost disclosure

| Source | Pattern | Adopted | Rejected |
|---|---|---|---|
| **Dave (ExtraCash)** | Repayment date is chosen/shown at accept time, not buried in fine print. | Date sits directly beside the total, both inside the same dominant headline block (`TermsDisclosureCard`). | Dave lets the user *pick* the date; NovaPay's tenor is fixed to next payday, so we show it as a fact, not a choice — inventing a date picker would misrepresent the product. |
| **EarnIn** | "Your limit, shown up front" — the actual ceiling is visible before the user commits to an amount. | The offered limit is stated on the Offer screen's approval banner, and tiers above it simply aren't rendered in the tier selector — never a silent constraint, and never a disabled option left on screen to distract from. | EarnIn frames "tips" as optional cost; NovaPay's fee is mandatory and flat, so we don't borrow the optional-cost framing — it would understate what this product actually costs. |
| **Cleo — Loan detail** | Friendly, chunked cost breakdown rather than a wall of numbers. | `CostBreakdownRow` chunks principal/fee/total into separate rows (Miller's Law); Cleo's conversational tone informed the plain-language copy ("We'll pull Rs X automatically…"). | Cleo sometimes uses light humor/emoji on financial numbers; rejected for a lending decision — the amount and date need to be unambiguous, not softened by tone. |
| **Monese — Applying for a loan** | Progressive disclosure: headline first, detail one tap deeper. | Total + date lead the screen; the fee-rate explanation ("why is there a fee?") is pushed one tap deeper into the AppBar help sheet rather than cluttering the main disclosure. | — |

## (b) The accept decision

| Source | Pattern | Adopted | Rejected |
|---|---|---|---|
| **Cleo — Cash advance / Offers** | Humane microcopy on the commit step; explicit confirmation language rather than a single ambiguous "Confirm" button. | The accept sheet spells out the exact deduction ("Rs X will be automatically deducted… on [date]") behind an explicit, unchecked-by-default checkbox — consent is a separate act from tapping the CTA. | — |
| **Kakao Pay — Apply for a loan** | Modal/sheet used specifically for the commit step, distinct from the browsing screens. | `BottomSheet` (hardened with focus trap, ESC, scroll-lock — see HIG checklist) is used only for Accept and the help FAQ, never for browsing. | — |
| **Dave (ExtraCash)** | Single-advance mental model — no stacked add-ons or upsells at the moment of commit. | The accept sheet contains exactly one decision (accept the stated terms); no pre-ticked add-ons, no upsell, no tip prompt. | — |

## (c) The not-good path — declined / over-limit / haircut / late

| Source | Pattern | Adopted | Rejected |
|---|---|---|---|
| **Monzo / Vivid — declined/ineligible screens** | Calm, factual decline framing without alarm styling. | `StatusBanner` uses `warning` (amber) tone for declines, not `danger` (red) — a full-bleed red alarm was an actual AI-generated draft I rejected; see `docs/AI_LOG.md`. | — |
| **Affirm — declined screen** | Names the actual reason rather than a generic "not eligible." | Decline copy always names the real reason (income unverified / credit history / income type) via `DECLINE_COPY`, never a raw enum, never a blanket "declined." | Affirm's screen leans on a dense legal-style explanation; rejected in favor of one short, humane paragraph — compliance detail belongs in a linked policy doc, not the peak-emotion screen itself. |
| **Cleo — repayment due/late** | Supportive, factual late-state tone; no red alarm, no shame language. | `ReminderBanner`'s `late` tone stays `warning`, only escalating to `danger` at true 30+ day default, and copy stays factual ("your balance was short," never "you failed to pay"). | — |
| **CRED — overdue screen** | Clear "what happens next" framing. | Every late/default banner states the concrete next step (auto-retry, no first-retry fee, or "contact support") rather than just flagging the problem. | CRED gamifies on-time payment with score/reward framing; rejected — reward mechanics on a debt product risk nudging repeat borrowing, which is exactly the CFPB-flagged pattern we're designing against. |
| **EarnIn / Payactiv (context)** | Non-recourse, non-shaming framing on "already-earned" advances. | Borrowed the tone, not the "already earned" claim — NovaPay's advance isn't earned-wage-access against worked hours, so claiming that would misrepresent the product. | |

## Patterns designed against (named explicitly)

- **Fake urgency / countdowns** on the offer or accept screen — not used anywhere; the offer doesn't expire visibly or push the user to hurry.
- **Pre-selected largest tier** — `TierStepper` starts with nothing selected; the user must actively choose.
- **Buried auto-debit** — stated twice (Terms screen's auto-debit Panel, and again as the literal consent checkbox text in the accept sheet).
- **Confirmshaming / hard-to-decline** — "Not now" in the accept sheet and "Back to home" on decline are plain, neutral labels, not guilt-worded ("No thanks, I like debt" style dark patterns).
- **Red alarm-styling on decline** — see the AI-rejected-output note above; corrected to calm amber.
- **Reward/gamification on repayment** — deliberately not added, per the CRED row above.

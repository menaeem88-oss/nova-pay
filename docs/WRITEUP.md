# NovaPay salary advance — writeup

## 1. What's going on

The starter app had no salary-advance flow at all — `App.jsx` was a home screen with a stub "See your offer" button. So "what's failing at the hard moments" isn't really a critique of an existing flow; it's a critique of what the *design system* would have let a team ship if they'd built fast under the Monday-morning brief. Reading `NovaKit Lite` closely, the failure modes are structural, not cosmetic: there was no `danger`/`warning`/`info` color anywhere, so a team building under time pressure would have had exactly two honest choices for a decline screen — reuse `success` green (wrong) or misuse the amber `accent` (wrong, and the master prompt calls this out explicitly). `Button`'s secondary variant read as disabled even when it wasn't (contrast failure), which is exactly the kind of thing that makes an accept/decline screen feel "off at the edges" without anyone being able to say why. `BottomSheet` — the component that would hold the single highest-trust interaction in the app — had no focus management, no ESC-to-close, no scroll lock. None of this is a "we didn't get to it" gap; it's the specific set of things a lending product cannot skip.

## 2. What you built, and why

Built the full spine end-to-end (Home → Offer, with amount selection merged into that same screen → Terms → Accept → Disbursed → Repayment) plus all three not-good paths at real depth — decline (all three reasons), over-limit prevention, haircut re-disclosure, and every repayment status (upcoming/due/late/default/on-time). I chose to build all three "not-good" variants rather than picking one, because they share one component (`StatusBanner`) and one copy pattern (name the real reason, give a real next step, stay calm) — once that pattern exists, the incremental cost of covering decline + over-limit + late is small, and covering all three demonstrates the pattern generalizes rather than being a one-off.

The sharpest decision was **not building a separate over-limit screen**. The brief lists it as one option for the "not-good path," but a dedicated over-limit *error* screen is a worse design than preventing the error — so `TierStepper` disables anything above the offered limit with an inline reason, and there's nothing to submit incorrectly. I made the same call on haircut: it's not a destination, it's a different set of numbers on the *same* Terms screen, re-disclosed with a specific callout, because inventing a new screen for "the numbers changed" would break the total+date-dominant composition that's supposed to be the constant, trustworthy anchor of that screen.

## 3. Where you extended the system, and why

Full change-log in `docs/DESIGN_SYSTEM.md`. Highlights: added `danger`/`warning`/`info` semantic ramps (the single biggest gap — a lending app cannot express "declined" or "overdue" without them); fixed `Button`'s secondary-variant contrast failure (~4:1, read as disabled) and its fully-invisible disabled state (~1.4:1); hardened `BottomSheet` with focus trap, ESC-close, and scroll-lock for the accept step; added a `divider` token to replace three different off-token grays. New components (`TermsDisclosureCard`, `StatusBanner`, `TierStepper`, `ReminderBanner`, `CostBreakdownRow`, `ProgressStepper`) are all composed from the extended tokens, not one-offs. Flagged-but-not-fixed: the icon language is glyph-only and LTR (a real pre-scale concern for a PK-market wallet); no dark mode, though every new ramp is dark-mode-shaped.

## 4. How you'd know it's good

**60–90 day signals:** comprehension (can a user state the total cost + repayment date right after accepting, without looking back at the screen); on-time repayment rate and decline-recovery rate (declined-for-`income_unverified` users who verify and return); no upward drift in advances-per-user (the CFPB's ~27/year repeat-borrowing flag) even if raw conversion rises; CS contact rate/sentiment specifically at the late/default states, since a spike there means the banner copy isn't actually landing as reassurance.

**What it must never do, regardless of conversion:** hide or delay the total cost or the repayment date; let a user request more than their limit and find out after submitting; silently adjust a haircut without re-disclosure; bury the auto-debit consent inside the primary CTA instead of a separate, explicit act; use color alone to signal a decline or a late status; make "not now" or "back to home" harder to find than "accept."

## 5. Assumptions I'm making

1. Total cost of credit **and** repayment date sit on the same screen as Accept, even though it's more numbers up front than a single-CTA screen would prefer — trust over conversion.
2. Auto-debit consent is an explicit, separately-legible checkbox in the accept sheet, not implied by tapping the primary button.
3. `income_source: freelance` routes to Declined (`other`) — this product's tenor requires a fixed salaried payday, and freelance income has no such anchor.
4. Over-limit is prevented at the amount-selection step (disabled tiers + inline reason), never a post-submit error.
5. A haircut triggers re-disclosure with recomputed numbers and a genuine, no-penalty way to decline — silently accepting the original offer at a lower amount would be a dark pattern.
6. Fee = `round(disbursed × 0.03)`, always its own line item, never folded into "total" without a visible breakdown.
7. Since there's no backend, a small "Reviewer controls" sidebar (clearly labeled, rendered outside the phone frame entirely — not on any product screen) lets a reviewer reach every decision/repayment state without re-running real underwriting logic.

## 6. What I'd want to know that I don't

From engineering: is the accept step actually a single atomic call, or could disbursement succeed while the auto-debit mandate registration fails (a state this prototype doesn't model)? From compliance/SBP: what's the actual required disclosure language for a fee-based short-tenor product in this market — my copy is a defensible plain-language draft, not reviewed legal copy. From CS: what do decline and late-state contacts actually sound like today — the "no shame" tone here is a hypothesis, not validated against real complaint transcripts. Data I'd want: the real distribution of decline reasons (is `income_unverified` actually the common one the reference doc says it is, at scale, and does the "Verify income" recovery path get used when offered).

## 7. What I'd do differently with more time

Usability-test the accept sheet specifically — does the explicit consent checkbox read as reassuring or as friction, and does that differ by whether the user has used a lending app before (Jakob's Law cuts both ways here). Build a dark-mode pass, since the token ramps are structured for it but untested. Build the full reminder cadence (a day-before push-notification-style banner, not just the in-app Repayment screen) since the auto-debit's biggest trust risk is a surprise deduction, and a single in-app status screen someone has to go looking for doesn't fully address that. Localise the icon language for Urdu/RTL before this scales in the PK market, per the flag in `docs/DESIGN_SYSTEM.md`.

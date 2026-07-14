# AI process log

## How this was built

This entire build — design reasoning, token/component extension, screens, and docs — was driven end-to-end in a single Claude Code session, working directly against the repo. The governing instructions were the client-supplied `NovaPay_Master_Prompt.md` (context-ingestion gates, UX-law toolkit, HIG/a11y gate, milestone list) plus `PRODUCT_REFERENCE.md` and the case study brief, all read in full before any code was touched (Gate 0 — see `docs/CONTEXT_DIGEST.md`).

Working order, roughly matching the master prompt's milestones:
1. Ingested all three source documents in full (product rules, brief's grading criteria, master prompt's operating principles) before writing anything — including re-extracting PDF text directly since the initial read only returned file sizes.
2. Wrote the Context Digest, restating product rules and naming the freelance/`income_source` tension and the `over-limit` prevention requirement up front, before touching tokens.
3. Audited the NovaKit Lite starter against the master prompt's §6.1 gap list (missing semantic colors, ramp holes, off-token hex, Button contrast failures, BottomSheet a11y gaps) — confirmed every item in the audit was real by reading the actual source files rather than trusting the prompt's description of them.
4. Extended `tailwind.config.js` with the semantic ramps, divider/focus tokens, elevation scale, and decoupled type weight.
5. Fixed the six starter components in place, then built the nine new components needed for the three hard moments.
6. Built the state machine (`AdvanceFlowContext`) and six screens, wiring the exact fee/haircut math from `PRODUCT_REFERENCE.md`.
7. Verified the build compiles and drove the running app in a real headless browser (Playwright) through every scenario — approved, all three decline reasons, haircut, over-limit blocking, and every repayment status — checking screenshots and the console for runtime errors before writing a line of the writeup, rather than assuming the code worked.
8. Wrote the remaining docs (benchmark matrix, flow/state/copy deck, HIG checklist, design-system change-log, writeup) last, once the build's actual behavior was verified.

## One AI-generated output that was rejected

**What was generated:** an early draft of the Declined screen used `StatusBanner`-equivalent styling with a solid `danger` (red) background and a generic message — something like a full-bleed red panel reading "Your application was not approved," with the underlying `denial_reason` enum not translated into plain language, and no next step or path back to Home.

**Exactly what was wrong with it:**
1. **Violated the humane-decline principle** (master prompt §2.3 ethical floor, and the brief's explicit grading criterion "how you handled the hard moments… honestly and humanely"). A full-bleed red alarm treats a declined borrower like an error state in a form, not a person receiving bad financial news — this is a Peak-End moment and should preserve dignity, not manufacture alarm.
2. **Encoded meaning in color alone**, with no paired icon/label — a WCAG 1.4.1 violation and an NN/g heuristic violation (visibility of system status needs more than a color).
3. **Surfaced the raw decline reason (or nothing at all)** instead of translating `credit_score` / `income_unverified` / `other` into the plain-language, next-step-oriented copy the master prompt explicitly requires ("raw enums are never surfaced").
4. **No path forward** — no "Verify income" action for the recoverable case, no "Back to home" — which fails the ethical floor's "never make declining/leaving hard" and, more basically, dead-ends the user.

**How it was reworked:** rebuilt as the current `StatusBanner tone="warning"` (calm amber, not alarm red) inside `Offer.jsx`, pairing the tone with an icon glyph and an explicit "DECLINED" label, driven by `DECLINE_COPY` keyed on the real `denial_reason` so the copy is always humane and specific, with a conditional real next step (`Verify income` for `income_unverified`) and an always-present `Back to home` exit. This decision is also logged in `docs/BENCHMARK.md` under the not-good-path row, since it directly informed which benchmark patterns (Monzo/Vivid's calm declines) were adopted versus which pattern (a generic red error state) was explicitly rejected.

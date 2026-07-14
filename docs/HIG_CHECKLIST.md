# iOS HIG + WCAG AA checklist — Gate 5

Each item: pass/fail against this build, with the fix applied where it wasn't already true of the starter.

| Item | Status | Notes / fix |
|---|---|---|
| **Layout & safe areas** — content not obscured by notch/home indicator; bottom-anchored primary actions within thumb reach | Pass (web-prototype scope) | The phone frame is a fixed-height simulation (no real device safe-area insets to honor in a browser); Terms' primary CTA is pinned to the frame's bottom edge, thumb-reachable. Noted as a native-intent gap: a real iOS build should add `env(safe-area-inset-bottom)` padding. |
| **Tap targets ≥ 44×44pt** | Fixed | Button `md` is `h-11` (44px) ✓ (unchanged from starter, verified still true). AppBar back button and the new trailing "?" button were `h-9 w-9` (36px, below the minimum) → `h-11 w-11` (44px); `TierStepper` chips are `h-14` (56px) ✓. |
| **Typography / Dynamic Type** | Fixed | Type scale previously baked `fontWeight` into `fontSize` tokens, which fights Dynamic Type scaling. Weight decoupled into separate `fontWeight` tokens (§6.1) — see `tailwind.config.js`. |
| **Numeric keypad for amount entry** | N/A this build | Amount selection uses fixed tier chips (`TierStepper`), not a free-text field, so `inputMode="numeric"` doesn't apply here — `TextField`'s existing `inputMode` prop still supports it for other flows. |
| **Sheets for the commit step** — grabber, scrim, swipe/close semantics | Fixed | `BottomSheet` now has `role="dialog"`, `aria-modal`, a visible grabber, scrim-click-to-close, and ESC-to-close. Swipe-to-dismiss is a native gesture not meaningfully simulable in a web prototype — noted as native-intent. |
| **Navigation** — clear back affordance, no trap states, modal for commit | Pass | Every screen has a back affordance except Disbursed (deliberate: a completed transaction isn't meant to be backed out of, matches banking-app convention) and Home (root). Accept and Help both use the modal sheet, never inline. |
| **Feedback & motion** — haptics (intent), Reduce Motion respected | Fixed | Haptic feedback on accept/success is noted as intent only (not simulable in a browser). All animation (`Button` spinner, `Skeleton` pulse) uses Tailwind's `motion-reduce:` variant to disable under `prefers-reduced-motion`. |
| **Color & Dark Mode** | Partial | Full semantic token ramps (`danger`/`warning`/`info`/`success`) are dark-mode-ready in principle (each has a 50–900 ramp), but no dark theme was implemented — cut for time, listed in the writeup's "what I'd do differently." |
| **VoiceOver labels for amounts/dates/status** | Fixed | `AppBar` back/help buttons have `aria-label`; `BottomSheet` has `aria-label`/`aria-modal`; `StatusBanner`/`ReminderBanner` use `role="status"` (or `role="alert"` for danger tone) so screen readers announce state changes; decorative icons are `aria-hidden`. |
| **WCAG AA contrast — 4.5:1 text / 3:1 large & UI** | Fixed | `Button` secondary text was `neutral-500` (~4:1, borderline/failing at smaller weights) → `neutral-700` (~8:1). Disabled text `neutral-300` (~1.4:1, invisible) → `neutral-400` (still clearly muted, meets the "perceivable but de-emphasized" bar disabled controls are held to). |
| **Visible focus states** | Fixed | No component in the starter had a `focus-visible` treatment. Added a shared `focus` token and `focus-visible:ring-2 focus-visible:ring-focus` on `Button`, `AppBar` icon buttons, `TierStepper` chips, and the scenario-switcher chips. |
| **Meaning never carried by color alone** | Fixed | `StatusBanner`/`Toast`/`Chip` all pair color with an icon glyph *and* a text label (e.g. "DECLINED", "PAST DUE 30+ DAYS") — never color-only. |

## Known gaps (not fixed in this pass — named, not hidden)

- No dark mode implementation, though the token ramps support it.
- RTL/Urdu localisation not implemented — the icon language (glyph-only `‹`, `↑`/`↓`) is LTR-only and flagged in `docs/DESIGN_SYSTEM.md` as a pre-scale concern for the PK market.

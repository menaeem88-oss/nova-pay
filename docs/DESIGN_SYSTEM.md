# Design system — token & component change-log — Gate 6

This project submits the **Code Connect–style mapping** option from the brief ("a small Figma component sheet… OR an equivalent Code Connect-style mapping between design and code — your choice of tool") rather than a live Figma file: no target Figma file was provided for this build session, and the brief explicitly treats the two as equivalent. Every token below has a name that would map 1:1 onto a Figma variable of the same name if/when this is brought into Figma.

## Token change-log

| Token | Change | Rationale | Code |
|---|---|---|---|
| `danger`, `warning`, `info` (new, full 50–900 ramps) | Added | The single biggest gap: only `success` existed, so decline/over-limit/haircut/late had no correct semantic color and risked the amber `accent` being misused for error meaning. | `tailwind.config.js` → `theme.extend.colors` |
| `success` | Flat value → full ramp | Needed tints (`success-50`) for banner backgrounds, not just the solid toast/text color. | same |
| `brand` ramp | Completed 300/500/600/700/900 (was 50/100/200/400/DEFAULT/pressed/800) | `brand-600` etc. now resolve; `pressed` kept as an explicit alias onto 800, not silently redefined. | same |
| `neutral` ramp | Completed 400/600/800 | Components needed a mid-gray between 300 and 500 (disabled states) and between 500 and 700 (secondary icons). | same |
| `divider` (new: `DEFAULT`, `strong`) | Added | Replaced three different off-token hairline grays (`Card`'s raw `#E6E6E6`, `ListRow`'s raw `#DADADA`, `neutral-300` used ad hoc) with one token + a stronger variant. | `Card.jsx`, `Panel.jsx`, `ListRow.jsx`, `TextField.jsx` |
| `focus` (new) | Added | No dedicated focus-ring token existed; `TextField` hard-coded `brand` inline. Centralized so every focusable control (Button, TierStepper, icon buttons, scenario chips) shares one focus-visible treatment. | `Button.jsx`, `AppBar.jsx`, `TierStepper.jsx`, `TextField.jsx` |
| `shadow-sheet`, `shadow-overlay` (new) | Added elevation scale | Only `shadow-card` existed, so a modal sheet and a resting card shared the same shadow. | `BottomSheet.jsx`, `Toast.jsx` |
| `radius.sheet` (new) | Added | No radius distinguished a full-height sheet from a resting card beyond `lg`. | `BottomSheet.jsx` |
| Spacing `xs`–`2xl` (new, documented aliases over the default scale) | Added | Spacing was ad hoc; named aliases make intent legible in component code. | available to all components |
| `fontSize` tokens | Weight removed from the tuple | `title`/`display` baked in `fontWeight`, which fights Dynamic Type scaling and made a 400-weight title impossible. | `AmountText.jsx`, `AppBar.jsx` (now apply weight explicitly) |
| `fontWeight.regular/medium/semibold/bold` (new) | Added | Makes weight a first-class, explicitly named choice instead of an implicit side effect of size. | same |

## Component change-log

| Component | Change | Rationale |
|---|---|---|
| `Button` | Secondary text `neutral-500`→`neutral-700` (was ~4:1, failed AA-adjacent, read as disabled); disabled text `neutral-300`→`neutral-400` (was ~1.4:1, invisible); added `focus-visible` ring; added `loading` state with spinner + `aria-busy` | AA contrast + the async accept/disburse call needed a pending state (Doherty). |
| `Toast` | Hardcoded `bg-success` → `variant` prop (`success`/`error`/`info`); added `role="status"`/`aria-live` | A lending app needs error/info toasts, not just success. |
| `AmountText` | Added `tone` (default/positive/negative/muted/inverse) and wired up `caption` size (existed in the type scale but wasn't mapped here) | Money-in vs. money-out looked identical; the type scale had an unused size; `inverse` (white) supports amounts on dark surfaces like the Home balance card. |
| `Card` / `Panel` | Deliberately differentiated: `Card` = elevated (shadow), `Panel` = flush (no shadow, for nesting inside another surface). Both routed through the new `divider` token instead of raw hex/`neutral-300`. | They were near-duplicates in the starter; collapsing them would have lost a real distinction (elevation) that the product needs (e.g. a Panel nested inside a BottomSheet shouldn't float a second shadow). |
| `ListRow` | Divider → `divider-strong` token | Off-token raw hex. |
| `TextField` | Focus ring/border → `focus` token | Was hardcoded to `brand` inline, inconsistent with everything else. |
| `BottomSheet` | Added `role="dialog"`/`aria-modal`, focus trap + return-focus-on-close, ESC-to-close, scroll-lock, `max-h-[85%]` + internal scroll, `shadow-sheet`/`radius.sheet` | This is the accept-decision hard moment — the highest-trust step in the product — and had none of the a11y/robustness a commit-step modal needs. |
| `AppBar` | Added `trailing` slot; back/help buttons enlarged 36px→44px; back chevron switched from a Unicode glyph (`‹`) to a stroke-based inline SVG | No trailing-action slot existed (needed for the Terms screen's help sheet); back button was under the HIG tap-target minimum; the text glyph never read as a properly-weighted icon at any font size. |
| `TierStepper` (new) | — | Renders only the tiers up to the offered limit — anything above it isn't shown at all (not even disabled), since an unselectable option is still a distraction (Hick's Law / NN/g minimalism). Prevents the over-limit hard moment at input rather than rejecting it after submit. Selected-state styling (tinted `brand-50`, not solid `bg-brand`) is deliberately distinct from the primary Button's fill, so selection and action don't read as the same control. |
| `CostBreakdownRow` (new) | — | Chunks the cost into labeled principal/fee/total lines (Miller's Law) instead of one undifferentiated number. |
| `StatusBanner` (new) | — | The single most-reused new component: decline reason, haircut notice, freelance-ineligible message, and (via `ReminderBanner`) late/default all use it. Tone + icon + text label together — never color alone. |
| `TermsDisclosureCard` (new) | — | Composes the total-cost disclosure hard moment: total+date headline first, principal/fee/total grouped, date/auto-debit grouped and repeated last (Von Restorff + Serial Position + Proximity, simultaneously). |
| `ReminderBanner` (new) | — | Repayment status at a glance (upcoming/due/late/default/on_time), built on `StatusBanner` so the visual language stays one system. |
| `ProgressStepper` (new) | — | Amount → Review → Confirm, honest progress without manufactured urgency. |
| `EmptyState`, `Skeleton` (new) | — | Doherty Threshold scaffolding (loading state on Offer) and a documented empty-state pattern for future screens. |
| `Chip` (new) | — | Status pill. (Originally used by the reviewer scenario switcher; that panel later moved to full-width option rows, so Chip is currently library surface for future list-row status tags.) |
| `InfoSnippet` (new) | — | Low-emphasis note with a grayed-out leading info icon — for supplementary facts (auto-debit note, decline reassurance note) that aren't a status/alert and shouldn't compete visually with `StatusBanner`'s toned callouts. |

## What's flagged but *not* fixed (named per the brief's "flag what's wrong/missing")

- **Icon language is mostly glyph-only and LTR** (`↑`, `↓`, `✓`, `!`, `i` — the back chevron above was moved to an inline SVG for legibility, but is still LTR-only) — fragile, not localisation-friendly. A PK-market wallet will eventually need Urdu/RTL; the remaining text glyphs should also move to a direction-aware icon set. Out of scope for this pass (restraint).
- **No dark mode** — token ramps (50–900 on every semantic color) are structured to support it, but no dark theme was authored.
- **`TextField` has no error state** — never used in this build (amount entry uses fixed tiers, not free text), so it wasn't exercised; if a free-text field is added later (e.g. custom amount), it needs an error/invalid variant.

## Design ↔ code mapping (Code Connect–style)

| Design concept | Code | Key props |
|---|---|---|
| Total-cost disclosure card | `src/novakit/TermsDisclosureCard.jsx` | `principal, fee, total, dueDateLabel, haircutNote, children` |
| Cost line item | `src/novakit/CostBreakdownRow.jsx` | `label, amount, emphasis, muted` |
| Tier selector | `src/novakit/TierStepper.jsx` | `tiers, limit, value, onChange` |
| Status / decline / haircut / late callout | `src/novakit/StatusBanner.jsx` | `tone (info\|warning\|danger\|success), label, title, children, action` |
| Repayment status banner | `src/novakit/ReminderBanner.jsx` | `status, daysLate, dueDateLabel, amount` |
| 3-step progress | `src/novakit/ProgressStepper.jsx` | `steps, current` |
| Commit-step modal | `src/novakit/BottomSheet.jsx` | `open, onClose, title, children` |
| Primary/secondary action | `src/novakit/Button.jsx` | `variant, size, disabled, loading` |
| Money display | `src/novakit/AmountText.jsx` | `amount, size, tone` |
| Status pill | `src/novakit/Chip.jsx` | `tone, children` |
| Low-emphasis info note | `src/novakit/InfoSnippet.jsx` | `children` |

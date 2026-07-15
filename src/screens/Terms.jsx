import { useState } from "react";
import {
  AppBar,
  Button,
  ProgressStepper,
  TermsDisclosureCard,
  StatusBanner,
  BottomSheet,
} from "../novakit";
import { useAdvanceFlow } from "../state/AdvanceFlowContext.jsx";
import { DUE_DATE_LABEL } from "../data/productRules.js";

export default function Terms() {
  const {
    chosenTier,
    disbursedAmount,
    fee,
    total,
    isHaircut,
    autoDebitConsent,
    setAutoDebitConsent,
    accepting,
    setAccepting,
    push,
    pop,
  } = useAdvanceFlow();

  const [acceptOpen, setAcceptOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  function handleAccept() {
    setAccepting(true);
    // Simulated network latency for the accept/disburse call. A skeleton or
    // spinner covers this window so the highest-trust moment never reads as
    // stalled (Doherty Threshold) — see Button's `loading` state.
    setTimeout(() => {
      setAccepting(false);
      setAcceptOpen(false);
      push("disbursed");
    }, 900);
  }

  return (
    <>
      <AppBar
        title="Review your offer"
        onBack={pop}
        trailing={
          <button
            type="button"
            aria-label="Help with this offer"
            onClick={() => setHelpOpen(true)}
            className="h-11 w-11 -mr-2 flex items-center justify-center rounded-full text-neutral-700 active:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
          >
            <span aria-hidden="true" className="text-title font-bold leading-none">?</span>
          </button>
        }
      />
      <main className="p-4 pt-xl space-y-xl pb-28 h-[724px] overflow-y-auto">
        {/*
          `sticky` (not pulled out of the scroll area) so it keeps its
          original in-flow spacing exactly as before, just pinned once
          scrolled to. `top-0` (not matched to main's pt-xl) deliberately —
          when the static offset exactly equals a nonzero `top`, Chromium
          doubles the gap at rest (a real, measured rendering quirk, not a
          padding mismatch). `top-0` avoids that; no visible "jump" risk
          since no screen currently scrolls enough for this to engage.
        */}
        <div className="sticky top-0 z-10 bg-white">
          <ProgressStepper steps={["Amount", "Review", "Confirm"]} current={1} />
        </div>

        <TermsDisclosureCard
          principal={disbursedAmount}
          fee={fee}
          total={total}
          dueDateLabel={DUE_DATE_LABEL}
          haircutNote={
            isHaircut ? (
              <StatusBanner tone="warning" label="Amount adjusted">
                We can offer Rs {new Intl.NumberFormat("en-PK").format(disbursedAmount)} instead of the Rs{" "}
                {new Intl.NumberFormat("en-PK").format(chosenTier)} you applied for, based on today's risk checks — no penalty
                either way.
              </StatusBanner>
            ) : null
          }
        />
      </main>

      <div className="absolute left-0 right-0 bottom-0 p-4 bg-white border-t border-divider">
        <Button size="lg" onClick={() => setAcceptOpen(true)}>
          Continue to accept
        </Button>
      </div>

      <BottomSheet open={acceptOpen} onClose={() => !accepting && setAcceptOpen(false)} title="Confirm your advance">
        <div className="space-y-4 pb-2">
          <div>
            <div className="text-title font-semibold text-neutral-900">
              Rs {new Intl.NumberFormat("en-PK").format(total)} on {DUE_DATE_LABEL}
            </div>
            <p className="text-body text-neutral-500 mt-1">That's the full amount you'll owe, pulled automatically.</p>
          </div>

          <label className="flex items-start gap-3 p-3 rounded-md border border-divider-strong cursor-pointer">
            <input
              type="checkbox"
              checked={autoDebitConsent}
              onChange={(e) => setAutoDebitConsent(e.target.checked)}
              className="mt-0.5 h-5 w-5 accent-brand shrink-0"
            />
            <span className="text-body text-neutral-700">
              I understand Rs {new Intl.NumberFormat("en-PK").format(total)} will be automatically deducted from my NovaPay balance
              on {DUE_DATE_LABEL}.
            </span>
          </label>

          <Button size="lg" disabled={!autoDebitConsent} loading={accepting} onClick={handleAccept}>
            Accept advance
          </Button>
          {!autoDebitConsent ? (
            <p className="text-caption text-neutral-500 text-center -mt-2">Confirm auto-debit above to continue.</p>
          ) : null}
          <Button variant="secondary" disabled={accepting} onClick={() => setAcceptOpen(false)}>
            Not now
          </Button>
        </div>
      </BottomSheet>

      <BottomSheet open={helpOpen} onClose={() => setHelpOpen(false)} title="About this offer">
        <div className="space-y-3 pb-4">
          <div>
            <div className="text-body font-semibold text-neutral-900">Why is there a fee?</div>
            <p className="text-body text-neutral-700 mt-0.5">
              It's a flat 3% of the amount disbursed, charged once — not monthly interest. It's how NovaPay covers the cost of
              advancing you the cash.
            </p>
          </div>
          <div>
            <div className="text-body font-semibold text-neutral-900">What if I can't repay on {DUE_DATE_LABEL}?</div>
            <p className="text-body text-neutral-700 mt-0.5">
              We'll mark it late and retry automatically. There's no extra fee for the first retry — see the Repayment screen for
              what happens after that.
            </p>
          </div>
          <Button variant="secondary" onClick={() => setHelpOpen(false)}>
            Close
          </Button>
        </div>
      </BottomSheet>
    </>
  );
}

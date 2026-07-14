import { useEffect, useState } from "react";
import { AppBar, Card, Button, Skeleton, StatusBanner } from "../novakit";
import { useAdvanceFlow } from "../state/AdvanceFlowContext.jsx";
import { DECLINE_COPY } from "../data/scenarios.js";

/**
 * Offer / eligibility — spine step 1. Approved and declined are two states
 * of the SAME screen (not separate destinations): a decline here is a real
 * dead end for this application, so there's nowhere further to route to.
 */
export default function Offer() {
  const { scenario, push, pop, resetToHome, notify } = useAdvanceFlow();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 650);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <AppBar title="Your offer" onBack={pop} />
      <main className="p-4 space-y-4 h-[724px] overflow-y-auto">
        {loading ? (
          <Card className="space-y-3" aria-busy="true" aria-live="polite">
            <span className="sr-only">Checking your eligibility…</span>
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-8 w-56" />
            <Skeleton className="h-11 w-full" />
          </Card>
        ) : scenario.decision === "approved" ? (
          <>
            <StatusBanner tone="success" label="Approved" title={`You're approved for up to Rs ${new Intl.NumberFormat("en-PK").format(scenario.limit)}`}>
              Choose how much you need — you can take any amount up to your limit.
            </StatusBanner>
            <Card>
              <p className="text-body text-neutral-700">
                This offer is a short-term salary advance. You'll see the exact cost and repayment date before you accept anything.
              </p>
            </Card>
            <Button size="lg" onClick={() => push("amount")}>
              Choose your amount
            </Button>
          </>
        ) : (
          <DeclinedOffer scenario={scenario} resetToHome={resetToHome} notify={notify} />
        )}
      </main>
    </>
  );
}

function DeclinedOffer({ scenario, resetToHome, notify }) {
  const copy = DECLINE_COPY[scenario.denialReason] || DECLINE_COPY.other;
  return (
    <>
      {/*
        Deliberately NOT full-bleed red / alarm styling. See docs/AI_LOG.md —
        an earlier AI-generated pass used a red full-bleed decline screen and
        hid the reason; that was rejected for violating the humane-decline
        principle. "warning" (calm amber) is used instead of "danger" (red),
        the actual reason is always named, and there's always a real next step.
      */}
      <StatusBanner tone="warning" label={copy.kicker} title={copy.title}>
        {copy.body}
      </StatusBanner>
      <Card>
        <p className="text-body text-neutral-700">
          This doesn't affect your NovaPay account or your ability to send and receive money as normal.
        </p>
      </Card>
      <div className="space-y-2">
        {copy.actionLabel ? (
          <Button
            onClick={() =>
              notify("This is a prototype — income verification would start here.", "info")
            }
          >
            {copy.actionLabel}
          </Button>
        ) : null}
        <Button variant="secondary" onClick={resetToHome}>
          Back to home
        </Button>
      </div>
    </>
  );
}

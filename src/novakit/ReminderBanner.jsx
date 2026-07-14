import StatusBanner from "./StatusBanner.jsx";

/**
 * ReminderBanner — NovaKit Lite (new)
 * Repayment status at a glance: upcoming / due / late / default / on_time.
 * Built on StatusBanner so tone/icon/label conventions stay consistent
 * across the whole kit rather than inventing a parallel visual language.
 */
export default function ReminderBanner({ status, daysLate = 0, dueDateLabel, amount }) {
  const amountLabel = `Rs ${new Intl.NumberFormat("en-PK").format(amount ?? 0)}`;

  if (status === "upcoming") {
    return (
      <StatusBanner tone="info" label="Upcoming" title={`${amountLabel} due on ${dueDateLabel}`}>
        Pulled automatically from your NovaPay balance — no action needed if funds are ready.
      </StatusBanner>
    );
  }
  if (status === "due_today") {
    return (
      <StatusBanner tone="warning" label="Due today" title={`${amountLabel} is due today`}>
        We'll attempt to pull this from your balance today.
      </StatusBanner>
    );
  }
  if (status === "late") {
    return (
      <StatusBanner tone="warning" label="Payment overdue" title={`${amountLabel} — ${daysLate} day${daysLate === 1 ? "" : "s"} late`}>
        Your balance was short on {dueDateLabel}. Add funds any time and we'll retry automatically — no extra fee for a first retry.
      </StatusBanner>
    );
  }
  if (status === "default") {
    return (
      <StatusBanner tone="danger" label="Past due 30+ days" title={`${amountLabel} — ${daysLate} days late`}>
        This advance is significantly overdue. Reach NovaPay support to arrange repayment — we're here to help you get current, not to pile on.
      </StatusBanner>
    );
  }
  return (
    <StatusBanner tone="success" label="Settled" title={`${amountLabel} repaid on time`}>
      Nothing due. Thanks for keeping this on track.
    </StatusBanner>
  );
}

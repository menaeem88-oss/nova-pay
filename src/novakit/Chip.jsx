/**
 * Chip / Tag — NovaKit Lite (new)
 * Small status pill, e.g. "Approved", "Declined", "Late" on a list row.
 */
const TONES = {
  neutral: "bg-neutral-100 text-neutral-700",
  brand: "bg-brand-50 text-brand-700",
  success: "bg-success-50 text-success-700",
  warning: "bg-warning-50 text-warning-700",
  danger: "bg-danger-50 text-danger-700",
  info: "bg-info-50 text-info-700",
};

export default function Chip({ children, tone = "neutral" }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-caption font-semibold ${TONES[tone] || TONES.neutral}`}>
      {children}
    </span>
  );
}

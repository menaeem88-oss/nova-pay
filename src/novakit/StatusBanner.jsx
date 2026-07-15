/**
 * StatusBanner / Callout — NovaKit Lite (new)
 * Tones: info | warning | danger | success
 *
 * The single most-reused new component: decline reason, haircut notice,
 * late/overdue alert, and the freelance-ineligible message all use this.
 * Each tone pairs a color AND an icon AND a text label — meaning is never
 * carried by color alone (WCAG 1.4.1 / NN/g).
 *
 * Radius was `rounded-md` (12px), inconsistent with every other card-like
 * surface (Card, Panel) at `rounded-lg` (20px) — fixed so banners read as
 * the same "shape family" as the surfaces they sit beside.
 */
const TONES = {
  info: { bg: "bg-info-50", border: "border-info-200", text: "text-info-800", icon: "i", iconBg: "bg-info-600" },
  warning: { bg: "bg-warning-50", border: "border-warning-200", text: "text-warning-800", icon: "!", iconBg: "bg-warning-600" },
  danger: { bg: "bg-danger-50", border: "border-danger-200", text: "text-danger-800", icon: "!", iconBg: "bg-danger-600" },
  success: { bg: "bg-success-50", border: "border-success-200", text: "text-success-800", icon: "✓", iconBg: "bg-success-600" },
};

export default function StatusBanner({ tone = "info", label, title, children, action = null, className = "" }) {
  const t = TONES[tone] || TONES.info;
  return (
    <div role={tone === "danger" ? "alert" : "status"} className={`rounded-lg border ${t.bg} ${t.border} p-4 ${className}`}>
      <div className="flex gap-3">
        <span
          aria-hidden="true"
          className={`h-6 w-6 shrink-0 rounded-full ${t.iconBg} text-white text-caption font-bold flex items-center justify-center`}
        >
          {t.icon}
        </span>
        <div className="min-w-0 flex-1">
          {label ? (
            <div className={`text-caption font-semibold uppercase tracking-wide ${t.text} mb-0.5`}>{label}</div>
          ) : null}
          {title ? <div className="text-body font-semibold text-neutral-900">{title}</div> : null}
          {children ? <div className="text-body text-neutral-700 mt-0.5">{children}</div> : null}
          {action ? <div className="mt-3">{action}</div> : null}
        </div>
      </div>
    </div>
  );
}

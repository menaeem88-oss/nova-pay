/**
 * Toast — NovaKit Lite
 * A transient confirmation message.
 * Variants: success | error | info (was success-only, hardcoded bg-success)
 */
const VARIANTS = {
  success: { bg: "bg-success", icon: "✓" },
  error: { bg: "bg-danger", icon: "!" },
  info: { bg: "bg-info", icon: "i" },
};

export default function Toast({ open, message, variant = "success" }) {
  if (!open) return null;
  const { bg, icon } = VARIANTS[variant] || VARIANTS.success;
  return (
    <div className="absolute left-4 right-4 bottom-6 z-30" role="status" aria-live="polite">
      <div className={`flex items-center gap-2 rounded-md ${bg} text-white px-4 py-3 text-body shadow-overlay`}>
        <span
          aria-hidden="true"
          className="h-5 w-5 shrink-0 rounded-full bg-white/20 flex items-center justify-center text-caption font-bold"
        >
          {icon}
        </span>
        <span>{message}</span>
      </div>
    </div>
  );
}

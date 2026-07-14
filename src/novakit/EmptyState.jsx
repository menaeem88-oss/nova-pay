/**
 * EmptyState — NovaKit Lite (new)
 * Centered icon + message + optional action, for empty/edge screens.
 */
export default function EmptyState({ icon = "—", title, description, action = null }) {
  return (
    <div className="flex flex-col items-center text-center py-10 px-4">
      <div
        aria-hidden="true"
        className="h-12 w-12 rounded-full bg-neutral-100 text-neutral-500 flex items-center justify-center text-title mb-3"
      >
        {icon}
      </div>
      <div className="text-title font-semibold text-neutral-900">{title}</div>
      {description ? <p className="text-body text-neutral-500 mt-1 max-w-[280px]">{description}</p> : null}
      {action ? <div className="mt-4 w-full">{action}</div> : null}
    </div>
  );
}

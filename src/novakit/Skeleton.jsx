/**
 * Skeleton — NovaKit Lite (new)
 * Loading placeholder for the Doherty Threshold: async calls (accept,
 * disburse) show a skeleton instead of a blank/frozen screen so perceived
 * response stays under ~400ms even when the real call is slower.
 * Respects prefers-reduced-motion (pulse animation is disabled).
 */
export default function Skeleton({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`bg-neutral-200 rounded-md animate-pulse motion-reduce:animate-none ${className}`}
    />
  );
}

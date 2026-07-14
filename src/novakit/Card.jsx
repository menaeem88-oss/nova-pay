/**
 * Card — NovaKit Lite
 * The elevated surface container: page-level grouping that should stand off
 * the background (shadow-card). For flush, lower-emphasis grouping nested
 * inside another surface (e.g. inside a BottomSheet), use Panel instead —
 * see Panel.jsx for the differentiation rationale.
 *
 * Fix vs. starter: border was a raw off-token hex (#E6E6E6) -> divider token.
 */
export default function Card({ children, className = "" }) {
  return (
    <div
      className={
        "bg-white rounded-lg border border-divider shadow-card p-4 " + className
      }
    >
      {children}
    </div>
  );
}

/**
 * Panel — NovaKit Lite
 * The flush surface container: no shadow, for grouping content inside
 * another surface (a Card, a BottomSheet) where a second elevation would
 * look like a stray floating box. Card and Panel were near-duplicates in
 * the starter (only their border differed); this is now the deliberate
 * split — elevation is the distinguishing feature, not an accident.
 *
 * Fix vs. starter: border was raw `neutral-300` -> divider token.
 */
export default function Panel({ children, className = "" }) {
  return (
    <div
      className={
        "bg-white rounded-lg border border-divider p-4 " + className
      }
    >
      {children}
    </div>
  );
}

import { useEffect, useRef } from "react";

/**
 * BottomSheet — NovaKit Lite
 * A modal sheet anchored to the bottom of the viewport.
 *
 * Fixes vs. starter (this is the highest-trust commit step in the product,
 * so it needed hardening, not just a visual pass):
 * - no `role="dialog"` / `aria-modal` -> added, so screen readers announce
 *   it as a modal rather than page content.
 * - no focus management -> focus moves into the sheet on open, is trapped
 *   with Tab/Shift+Tab, and returns to the trigger element on close.
 * - no ESC-to-close -> added, matching the scrim-click affordance already
 *   present (closing shouldn't be harder than opening, per the ethical
 *   floor: never roach-motel the exit).
 * - no scroll lock -> background no longer scrolls behind an open sheet.
 * - no max-height/scroll for long content -> capped with internal scroll so
 *   long terms text can't push the close/primary action off-screen.
 */
export default function BottomSheet({ open, onClose, title, children }) {
  const sheetRef = useRef(null);
  const previouslyFocused = useRef(null);

  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement;
    const sheet = sheetRef.current;
    const focusable = sheet?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    focusable?.[0]?.focus();

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onClose?.();
        return;
      }
      if (e.key === "Tab" && focusable?.length) {
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
      previouslyFocused.current?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="absolute inset-0 z-20">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-label={title || "Sheet"}
        className="absolute left-0 right-0 bottom-0 max-h-[85%] flex flex-col bg-white rounded-t-sheet shadow-sheet pb-6"
      >
        <div
          aria-hidden="true"
          className="mx-auto mt-3 mb-1 h-1 w-10 shrink-0 rounded-full bg-neutral-300"
        />
        <div className="overflow-y-auto px-4 pt-3">{children}</div>
      </div>
    </div>
  );
}

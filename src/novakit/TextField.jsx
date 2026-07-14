/**
 * TextField — NovaKit Lite
 * States: default, focused, disabled
 *
 * Fix vs. starter: focus ring/border hard-coded `brand` inline -> routed
 * through the shared `focus` token so every focusable control matches.
 */
export default function TextField({
  placeholder = "",
  value,
  onChange,
  disabled = false,
  inputMode,
  type = "text",
  className = "",
}) {
  return (
    <input
      type={type}
      inputMode={inputMode}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={
        "w-full h-12 px-3 rounded-md bg-white text-body text-neutral-900 " +
        "border border-divider-strong placeholder:text-neutral-500 " +
        "focus:outline-none focus:border-focus focus:ring-2 focus:ring-focus/30 " +
        "disabled:bg-neutral-100 disabled:text-neutral-500 " +
        className
      }
    />
  );
}

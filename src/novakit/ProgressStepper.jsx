/**
 * ProgressStepper — NovaKit Lite (new)
 * A short, honest 3-step progress indicator (Amount -> Review -> Confirm).
 * Goal-Gradient + Zeigarnik: shows the borrower how close they are to done
 * without manufacturing urgency (no countdowns, no fake scarcity).
 */
export default function ProgressStepper({ steps, current }) {
  return (
    <ol className="flex items-center" aria-label="Progress">
      {steps.map((step, i) => {
        const state = i < current ? "done" : i === current ? "current" : "upcoming";
        return (
          <li key={step} className="flex-1 flex items-center last:flex-none">
            <div className="flex flex-col items-center gap-1">
              <div
                aria-current={state === "current" ? "step" : undefined}
                className={[
                  "h-7 w-7 rounded-full flex items-center justify-center text-caption font-semibold shrink-0",
                  state === "done" ? "bg-brand text-white" : "",
                  state === "current" ? "bg-brand-50 text-brand-700 border-2 border-brand" : "",
                  state === "upcoming" ? "bg-neutral-100 text-neutral-400" : "",
                ].join(" ")}
              >
                {state === "done" ? "✓" : i + 1}
              </div>
              <span
                className={`text-caption ${
                  state === "upcoming" ? "text-neutral-400" : "text-neutral-700"
                }`}
              >
                {step}
              </span>
            </div>
            {i < steps.length - 1 ? (
              <div
                aria-hidden="true"
                className={`flex-1 h-px mx-2 mb-4 ${i < current ? "bg-brand" : "bg-divider-strong"}`}
              />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}

'use client'

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="w-10 h-10 rounded-full border-2 border-stone-200 border-t-stone-700 animate-spin"
        role="status"
        aria-label="Loading"
      />
      <p className="mt-5 text-sm font-medium text-stone-800">Processing request</p>
      <div className="mt-5 space-y-2 w-52 text-left">
        {[
          { label: 'Fetching historical data', done: true },
          { label: 'Running AI model', done: false, active: true },
          { label: 'Generating predictions', done: false },
        ].map((step) => (
          <div key={step.label} className="flex items-center gap-2.5">
            <span
              className={`w-2 h-2 rounded-full flex-shrink-0 ${
                step.done
                  ? 'bg-emerald-600'
                  : step.active
                    ? 'bg-stone-500 animate-pulse'
                    : 'bg-stone-300'
              }`}
            />
            <span
              className={`text-xs ${
                step.done || step.active ? 'text-stone-600' : 'text-stone-400'
              }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

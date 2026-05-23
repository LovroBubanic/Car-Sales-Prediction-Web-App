type IconProps = { className?: string }

const s = {
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export function IconChart({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" {...s}>
      <path d="M4 19V5M10 19V9M16 19v-6M20 19V3" />
    </svg>
  )
}

export function IconTrend({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" {...s}>
      <path d="M4 16l5-5 4 4 7-9M15 6h5v5" />
    </svg>
  )
}

export function IconShield({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" {...s}>
      <path d="M12 3l7 3v6c0 4.2-2.9 7.4-7 9-4.1-1.6-7-4.8-7-9V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  )
}

export function IconClock({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" {...s}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l3 2" />
    </svg>
  )
}

export function IconCar({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" {...s}>
      <path d="M5 17h2l1-3.5a1.5 1.5 0 011.4-1h7.2a1.5 1.5 0 011.4.9L18 17h2M7 17v1.5M15 17v1.5" />
      <path d="M8 12.5h4.5l1-1.8a1 1 0 01.9-.6h2.6" />
      <circle cx="8" cy="18.5" r="1.5" />
      <circle cx="16" cy="18.5" r="1.5" />
    </svg>
  )
}

export function IconTag({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" {...s}>
      <path d="M4 12V6a2 2 0 012-2h6l8 8-8 8-8-8z" />
      <circle cx="9" cy="9" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function IconAlert({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" {...s}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v4M12 16h.01" />
    </svg>
  )
}

export function IconChevronDown({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" {...s}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

export function IconSpinner({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg className={`${className} animate-spin`} viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )
}

export function IconCheck({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" {...s}>
      <path d="M5 12l4 4L19 6" />
    </svg>
  )
}

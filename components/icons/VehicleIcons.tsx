type IconProps = {
  className?: string
}

const base = 'stroke-current fill-none'
const stroke = { strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }

export function CarTypeIcon({ type, className = 'w-8 h-8' }: IconProps & { type: string }) {
  const props = { className: `${base} ${className}`, ...stroke }
  switch (type) {
    case 'SUV':
      return (
        <svg viewBox="0 0 32 20" {...props}>
          <path d="M3 14h2.5l1.2-4.2a2 2 0 012-1.4h8.6a2 2 0 011.9 1.3l1.4 4.3H27M6 14v1.5M24 14v1.5" />
          <path d="M7 8.4h5.5l1.2-2.1a1 1 0 01.9-.6h4.2a1 1 0 01.9.6l1.3 2.1H23" />
          <circle cx="8" cy="15.5" r="1.8" />
          <circle cx="22" cy="15.5" r="1.8" />
        </svg>
      )
    case 'Sedan':
      return (
        <svg viewBox="0 0 32 20" {...props}>
          <path d="M3 14h2.8l1.4-3.8a1.8 1.8 0 011.7-1.2h9.2a1.8 1.8 0 011.7 1.1l1.5 3.9H27M6.5 14v1.2M23.5 14v1.2" />
          <path d="M8 9h6.5l1.3-2a1 1 0 01.9-.6h3.8a1 1 0 01.9.6l1.2 2H22" />
          <circle cx="8.5" cy="15.2" r="1.7" />
          <circle cx="21.5" cy="15.2" r="1.7" />
        </svg>
      )
    case 'Hatchback':
      return (
        <svg viewBox="0 0 32 20" {...props}>
          <path d="M3 14h2.5l1.3-4a1.8 1.8 0 011.7-1.2h7.5a1.8 1.8 0 011.6.9l2.2 4.3H27M6 14v1.2M23 14v1.2" />
          <path d="M8 8.8h5l1.2-2a1 1 0 01.9-.6h3.5a1 1 0 01.9.6l1.1 2h4.8l-1.8 3.2" />
          <circle cx="8" cy="15.2" r="1.7" />
          <circle cx="21" cy="15.2" r="1.7" />
        </svg>
      )
    case 'Coupe':
      return (
        <svg viewBox="0 0 32 20" {...props}>
          <path d="M3 14h2.6l1.5-3.5a1.6 1.6 0 011.5-1h9.8a1.6 1.6 0 011.5.9l1.6 3.6H27M6.5 14v1M23 14v1" />
          <path d="M8.5 9.5h6l1-1.5a1 1 0 01.9-.5h4a1 1 0 01.9.5l.9 1.5H22" />
          <circle cx="8.5" cy="15" r="1.6" />
          <circle cx="21.5" cy="15" r="1.6" />
        </svg>
      )
    case 'Truck':
      return (
        <svg viewBox="0 0 32 20" {...props}>
          <path d="M3 14h3l1.2-3.5a1.5 1.5 0 011.4-1h5.4v4.5h10V9.5h3.5l1.2 4.5H27M7 14v1.2M23 14v1.2" />
          <path d="M8 10h5.5l1-1.8a1 1 0 01.9-.6h2.6" />
          <path d="M16 9.5h8v4.5" />
          <circle cx="8.5" cy="15.2" r="1.7" />
          <circle cx="22" cy="15.2" r="1.7" />
        </svg>
      )
    case 'Convertible':
      return (
        <svg viewBox="0 0 32 20" {...props}>
          <path d="M3 14h2.5l1.4-3.2a1.6 1.6 0 011.5-1h9.5a1.6 1.6 0 011.5.8l1.6 3.4H27M6 14v1M23 14v1" />
          <path d="M8 10h5.5M14 10h6M8 10l2-2.5M20 10l-2-2.5" />
          <circle cx="8" cy="15" r="1.6" />
          <circle cx="21.5" cy="15" r="1.6" />
        </svg>
      )
    case 'Wagon':
      return (
        <svg viewBox="0 0 32 20" {...props}>
          <path d="M3 14h2.5l1.3-4a1.8 1.8 0 011.7-1.2h8.5a1.8 1.8 0 011.6.9l2.8 4.3H27M6 14v1.2M23 14v1.2" />
          <path d="M8 8.8h5.5l1.2-2a1 1 0 01.9-.6h4a1 1 0 01.9.6l1.2 2h5.5" />
          <circle cx="8" cy="15.2" r="1.7" />
          <circle cx="21" cy="15.2" r="1.7" />
        </svg>
      )
    case 'Van':
      return (
        <svg viewBox="0 0 32 20" {...props}>
          <path d="M3 14h2.5l1-4.5a2 2 0 012-1.5h12a2 2 0 012 1.5l1 4.5H27M6 14v1.5M23 14v1.5" />
          <path d="M7 8h14M10 8V6M18 8V6" />
          <circle cx="8" cy="15.5" r="1.8" />
          <circle cx="22" cy="15.5" r="1.8" />
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 32 20" {...props}>
          <path d="M3 14h2.8l1.4-3.8a1.8 1.8 0 011.7-1.2h9.2a1.8 1.8 0 011.7 1.1l1.5 3.9H27" />
          <circle cx="8.5" cy="15.2" r="1.7" />
          <circle cx="21.5" cy="15.2" r="1.7" />
        </svg>
      )
  }
}

export function BrandIcon({ brand, className = 'w-7 h-7' }: IconProps & { brand: string }) {
  const props = { className: `${base} ${className}`, ...stroke }
  switch (brand) {
    case 'Toyota':
      return (
        <svg viewBox="0 0 32 20" {...props}>
          <path d="M3 14h2.5l1.3-3.6a1.7 1.7 0 011.6-1.1h8.6a1.7 1.7 0 011.6 1l1.4 3.7H27" />
          <path d="M8.5 9.3h5.5l1.1-1.8a1 1 0 01.9-.6h3.5" />
          <circle cx="8" cy="15.2" r="1.6" />
          <circle cx="21" cy="15.2" r="1.6" />
        </svg>
      )
    case 'Honda':
      return (
        <svg viewBox="0 0 32 20" {...props}>
          <path d="M3 14h2.4l1.5-3.8a1.6 1.6 0 011.5-1h9.1a1.6 1.6 0 011.5.9l1.5 3.9H27" />
          <path d="M8 9.2h6l1.4-2.2a1 1 0 01.95-.55h3.2" />
          <circle cx="8" cy="15.2" r="1.6" />
          <circle cx="21.5" cy="15.2" r="1.6" />
        </svg>
      )
    case 'Ford':
      return (
        <svg viewBox="0 0 32 20" {...props}>
          <path d="M3 14h3l1.1-3.2a1.4 1.4 0 011.3-.9h5.2v4.1h9.5V9.9h3.8l1.1 4.1H27" />
          <path d="M8 10h5l1-1.6h2.5" />
          <path d="M15.5 9.8h9v4.2" />
          <circle cx="8.5" cy="15.2" r="1.7" />
          <circle cx="22.5" cy="15.2" r="1.7" />
        </svg>
      )
    case 'BMW':
      return (
        <svg viewBox="0 0 32 20" {...props}>
          <path d="M3 14h2.5l1.6-3.4a1.5 1.5 0 011.4-.95h9.5a1.5 1.5 0 011.4.85l1.7 3.5H27" />
          <path d="M8.5 9.5h5.8l1.2-2a1 1 0 01.9-.55h3.6" />
          <path d="M5.5 11.5v2M6.8 11.5v2" />
          <circle cx="8.5" cy="15" r="1.55" />
          <circle cx="21.5" cy="15" r="1.55" />
        </svg>
      )
    case 'Mercedes-Benz':
      return (
        <svg viewBox="0 0 32 20" {...props}>
          <path d="M3 14h2.4l1.5-3.5a1.5 1.5 0 011.45-.95h9.7a1.5 1.5 0 011.4.85l1.6 3.6H27" />
          <path d="M8 9.4h6.2l1.3-2.1a1 1 0 01.92-.58h3.8" />
          <path d="M6 10.5l2.5 1.5M6 10.5l2.5-1.5" />
          <circle cx="8.5" cy="15.1" r="1.55" />
          <circle cx="21.5" cy="15.1" r="1.55" />
        </svg>
      )
    case 'Tesla':
      return (
        <svg viewBox="0 0 32 20" {...props}>
          <path d="M3 14h2.6l1.4-3.2a1.4 1.4 0 011.35-.9h10.3a1.4 1.4 0 011.35.8l1.5 3.3H27" />
          <path d="M8.5 9.6h7.5l1.1-1.9a1 1 0 01.92-.55h3" />
          <path d="M5 12h3" />
          <circle cx="8.5" cy="15" r="1.55" />
          <circle cx="21.5" cy="15" r="1.55" />
        </svg>
      )
    case 'Nissan':
      return (
        <svg viewBox="0 0 32 20" {...props}>
          <path d="M3 14h2.5l1.35-3.7a1.65 1.65 0 011.6-1.05h9a1.65 1.65 0 011.55.95l1.45 3.8H27" />
          <path d="M8.2 9.2h5.8l1.25-2a1 1 0 01.92-.58h3.4" />
          <path d="M6.5 11h2.5l1-1.5" />
          <circle cx="8" cy="15.2" r="1.6" />
          <circle cx="21" cy="15.2" r="1.6" />
        </svg>
      )
    case 'Chevrolet':
      return (
        <svg viewBox="0 0 32 20" {...props}>
          <path d="M3 14h2.6l1.45-3.6a1.6 1.6 0 011.55-1h9.3a1.6 1.6 0 011.5.9l1.55 3.7H27" />
          <path d="M8 9.3h6.5l1.35-2.1a1 1 0 01.95-.58h3" />
          <path d="M11 12.5h3v-1.5" />
          <circle cx="8.5" cy="15.2" r="1.6" />
          <circle cx="21.5" cy="15.2" r="1.6" />
        </svg>
      )
    case 'Audi':
      return (
        <svg viewBox="0 0 32 20" {...props}>
          <path d="M3 14h2.5l1.5-3.4a1.5 1.5 0 011.45-.95h9.6a1.5 1.5 0 011.4.85l1.65 3.5H27" />
          <path d="M8.5 9.5h6l1.2-2a1 1 0 01.9-.55h3.5" />
          <circle cx="6.2" cy="11.8" r="0.55" fill="currentColor" stroke="none" />
          <circle cx="7.8" cy="11.8" r="0.55" fill="currentColor" stroke="none" />
          <circle cx="9.4" cy="11.8" r="0.55" fill="currentColor" stroke="none" />
          <circle cx="11" cy="11.8" r="0.55" fill="currentColor" stroke="none" />
          <circle cx="8.5" cy="15" r="1.55" />
          <circle cx="21.5" cy="15" r="1.55" />
        </svg>
      )
    case 'Volkswagen':
      return (
        <svg viewBox="0 0 32 20" {...props}>
          <path d="M3 14h2.4l1.2-3.8a1.8 1.8 0 011.75-1.15h7.3a1.8 1.8 0 011.65.95l2 4H27" />
          <path d="M8 8.8h5l1.3-2.2a1 1 0 01.95-.58h3.2l1.5 2.8" />
          <circle cx="8" cy="15.2" r="1.65" />
          <circle cx="21" cy="15.2" r="1.65" />
        </svg>
      )
    case 'Hyundai':
      return (
        <svg viewBox="0 0 32 20" {...props}>
          <path d="M3 14h2.5l1.35-3.65a1.65 1.65 0 011.6-1.05h9.1a1.65 1.65 0 011.55.95l1.45 3.75H27" />
          <path d="M8.2 9.25h6l1.2-1.95a1 1 0 01.92-.58h3.3" />
          <path d="M6.5 10.8h2.8" />
          <circle cx="8" cy="15.2" r="1.6" />
          <circle cx="21" cy="15.2" r="1.6" />
        </svg>
      )
    case 'Kia':
      return (
        <svg viewBox="0 0 32 20" {...props}>
          <path d="M3 14h2.5l1.4-3.6a1.65 1.65 0 011.6-1.05h8.9a1.65 1.65 0 011.55.95l1.5 3.7H27" />
          <path d="M8.3 9.2h5.7l1.25-2a1 1 0 01.93-.58h3.5" />
          <path d="M6 11.2l2.5-1.2" />
          <circle cx="8" cy="15.2" r="1.6" />
          <circle cx="21" cy="15.2" r="1.6" />
        </svg>
      )
    case 'Mazda':
      return (
        <svg viewBox="0 0 32 20" {...props}>
          <path d="M3 14h2.5l1.55-3.3a1.5 1.5 0 011.45-.9h9.4a1.5 1.5 0 011.4.8l1.7 3.4H27" />
          <path d="M8.5 9.4h5.5l1.15-1.85a1 1 0 01.95-.55h3.8" />
          <path d="M7 11.5c1.5-.8 3-.8 4.5 0" />
          <circle cx="8.5" cy="15" r="1.55" />
          <circle cx="21.5" cy="15" r="1.55" />
        </svg>
      )
    case 'Subaru':
      return (
        <svg viewBox="0 0 32 20" {...props}>
          <path d="M3 14h2.5l1.25-4a1.75 1.75 0 011.7-1.15h8.3a1.75 1.75 0 011.6.95l2.5 4.2H27" />
          <path d="M8 8.6h5.5l1.2-2a1 1 0 01.95-.58h4.2" />
          <path d="M6.5 10.5l2 1.2M6.5 10.5l2-1.2" />
          <circle cx="8" cy="15.3" r="1.65" />
          <circle cx="21" cy="15.3" r="1.65" />
        </svg>
      )
    case 'Lexus':
      return (
        <svg viewBox="0 0 32 20" {...props}>
          <path d="M3 14h2.4l1.45-3.45a1.45 1.45 0 011.4-.92h9.8a1.45 1.45 0 01.38.05l1.35 3.32H27" />
          <path d="M8 9.35h6.3l1.35-2.15a1 1 0 01.93-.58h3.6" />
          <path d="M6.5 10.8c1.2.6 2.5.9 3.8.9" />
          <circle cx="8.5" cy="15.1" r="1.55" />
          <circle cx="21.5" cy="15.1" r="1.55" />
        </svg>
      )
    default:
      return <CarTypeIcon type="Sedan" className={className} />
  }
}

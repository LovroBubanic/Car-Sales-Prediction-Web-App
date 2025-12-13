'use client'

import { useState } from 'react'

interface CarInputFormProps {
  onSubmit: (brand: string, carType: string) => void
  isLoading?: boolean
}

const CAR_BRANDS = [
  { name: 'Toyota', icon: '🚗' },
  { name: 'Honda', icon: '🚙' },
  { name: 'Ford', icon: '🛻' },
  { name: 'BMW', icon: '🏎️' },
  { name: 'Mercedes-Benz', icon: '✨' },
  { name: 'Tesla', icon: '⚡' },
  { name: 'Nissan', icon: '🚘' },
  { name: 'Chevrolet', icon: '🚐' },
  { name: 'Audi', icon: '🔷' },
  { name: 'Volkswagen', icon: '🔵' },
  { name: 'Hyundai', icon: '💠' },
  { name: 'Kia', icon: '🔶' },
  { name: 'Mazda', icon: '🔴' },
  { name: 'Subaru', icon: '⭐' },
  { name: 'Lexus', icon: '💎' },
]

const CAR_TYPES = [
  { name: 'SUV', icon: '🚙', desc: 'Sport Utility Vehicle' },
  { name: 'Sedan', icon: '🚗', desc: 'Classic 4-door' },
  { name: 'Hatchback', icon: '🚕', desc: 'Compact & versatile' },
  { name: 'Coupe', icon: '🏎️', desc: 'Sporty 2-door' },
  { name: 'Truck', icon: '🛻', desc: 'Pickup truck' },
  { name: 'Convertible', icon: '🚘', desc: 'Open-top' },
  { name: 'Wagon', icon: '🚐', desc: 'Station wagon' },
  { name: 'Van', icon: '🚐', desc: 'Minivan/Van' },
]

export default function CarInputForm({ onSubmit, isLoading }: CarInputFormProps) {
  const [brand, setBrand] = useState('')
  const [carType, setCarType] = useState('')
  const [errors, setErrors] = useState<{ brand?: string; carType?: string }>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newErrors: { brand?: string; carType?: string } = {}
    if (!brand.trim()) {
      newErrors.brand = 'Please select a car brand'
    }
    if (!carType.trim()) {
      newErrors.carType = 'Please select a car type'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    onSubmit(brand, carType)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Brand Selection */}
      <div>
        <label className="block text-sm font-medium text-white/80 mb-4">
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Select Brand
          </span>
        </label>
        <div className="relative">
          <select
            value={brand}
            onChange={(e) => {
              setBrand(e.target.value)
              setErrors((prev) => ({ ...prev, brand: undefined }))
            }}
            className={`w-full px-5 py-4 rounded-xl input-modern text-white appearance-none cursor-pointer ${
              errors.brand ? 'border-red-500/50' : ''
            } ${brand ? 'text-white' : 'text-white/40'}`}
            disabled={isLoading}
          >
            <option value="" className="bg-[#1a1a2e] text-white/40">Choose a car brand...</option>
            {CAR_BRANDS.map((b) => (
              <option key={b.name} value={b.name} className="bg-[#1a1a2e] text-white">
                {b.icon} {b.name}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {errors.brand && (
          <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {errors.brand}
          </p>
        )}
      </div>

      {/* Car Type Selection */}
      <div>
        <label className="block text-sm font-medium text-white/80 mb-4">
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            Select Type
          </span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {CAR_TYPES.map((type) => (
            <button
              key={type.name}
              type="button"
              onClick={() => {
                setCarType(type.name)
                setErrors((prev) => ({ ...prev, carType: undefined }))
              }}
              disabled={isLoading}
              className={`p-4 rounded-xl text-left transition-all duration-200 ${
                carType === type.name
                  ? 'bg-indigo-500/20 border-indigo-500/50 border-2 ring-2 ring-indigo-500/20'
                  : 'glass border border-white/5 hover:border-white/20'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="text-2xl mb-1">{type.icon}</div>
              <div className={`font-medium ${carType === type.name ? 'text-white' : 'text-white/80'}`}>
                {type.name}
              </div>
              <div className="text-xs text-white/40">{type.desc}</div>
            </button>
          ))}
        </div>
        {errors.carType && (
          <p className="mt-3 text-sm text-red-400 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {errors.carType}
          </p>
        )}
      </div>

      {/* Selected Summary */}
      {(brand || carType) && (
        <div className="flex items-center gap-4 p-4 glass rounded-xl">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <div>
            <div className="text-sm text-white/50">Your Selection</div>
            <div className="font-medium text-white">
              {brand || 'No brand'} · {carType || 'No type'}
            </div>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full btn-primary text-white py-4 px-6 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
      >
        {isLoading ? (
          <>
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Analyzing Market Data...
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Generate Price Prediction
          </>
        )}
      </button>
    </form>
  )
}

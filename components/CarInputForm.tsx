'use client'

import { useState } from 'react'
import { BrandIcon, CarTypeIcon } from '@/components/icons/VehicleIcons'
import { IconCar, IconSpinner, IconTag } from '@/components/icons/UiIcons'

interface CarInputFormProps {
  onSubmit: (brand: string, carType: string) => void
  isLoading?: boolean
}

const CAR_BRANDS = [
  'Toyota',
  'Honda',
  'Ford',
  'BMW',
  'Mercedes-Benz',
  'Tesla',
  'Nissan',
  'Chevrolet',
  'Audi',
  'Volkswagen',
  'Hyundai',
  'Kia',
  'Mazda',
  'Subaru',
  'Lexus',
]

const CAR_TYPES = [
  { name: 'SUV', desc: 'Sport Utility Vehicle' },
  { name: 'Sedan', desc: 'Classic 4-door' },
  { name: 'Hatchback', desc: 'Compact & versatile' },
  { name: 'Coupe', desc: 'Sporty 2-door' },
  { name: 'Truck', desc: 'Pickup truck' },
  { name: 'Convertible', desc: 'Open-top' },
  { name: 'Wagon', desc: 'Station wagon' },
  { name: 'Van', desc: 'Minivan / Van' },
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
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-3">
          <span className="flex items-center gap-2">
            <IconCar className="w-4 h-4 text-stone-500" />
            Select Brand
          </span>
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {CAR_BRANDS.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => {
                setBrand(name)
                setErrors((prev) => ({ ...prev, brand: undefined }))
              }}
              disabled={isLoading}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-lg border text-center transition-colors ${
                brand === name
                  ? 'border-stone-800 bg-stone-50 text-stone-900'
                  : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300 hover:bg-stone-50'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <BrandIcon brand={name} className="w-8 h-5 text-stone-600" />
              <span className="text-xs font-medium leading-tight">{name}</span>
            </button>
          ))}
        </div>
        {errors.brand && (
          <p className="mt-2 text-sm text-red-700">{errors.brand}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-3">
          <span className="flex items-center gap-2">
            <IconTag className="w-4 h-4 text-stone-500" />
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
              className={`p-4 rounded-lg text-left border transition-colors ${
                carType === type.name
                  ? 'border-stone-800 bg-stone-50'
                  : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="mb-2 text-stone-600">
                <CarTypeIcon type={type.name} className="w-9 h-6" />
              </div>
              <div className={`font-medium text-sm ${carType === type.name ? 'text-stone-900' : 'text-stone-800'}`}>
                {type.name}
              </div>
              <div className="text-xs text-stone-500 mt-0.5">{type.desc}</div>
            </button>
          ))}
        </div>
        {errors.carType && (
          <p className="mt-3 text-sm text-red-700">{errors.carType}</p>
        )}
      </div>

      {(brand || carType) && (
        <div className="flex items-center gap-3 p-4 rounded-lg border border-stone-200 bg-stone-50">
          <div className="text-stone-600">
            {brand ? <BrandIcon brand={brand} className="w-10 h-6" /> : <IconCar className="w-6 h-6" />}
          </div>
          <div>
            <div className="text-xs text-stone-500">Your selection</div>
            <div className="font-medium text-stone-900 text-sm">
              {brand || 'No brand'} · {carType || 'No type'}
            </div>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full btn-primary py-3.5 px-6 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <IconSpinner />
            Analyzing market data...
          </>
        ) : (
          'Generate price prediction'
        )}
      </button>
    </form>
  )
}

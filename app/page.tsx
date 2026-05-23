'use client'

import { useState } from 'react'
import CarInputForm from '@/components/CarInputForm'
import PredictionTable from '@/components/PredictionTable'
import LoadingSpinner from '@/components/LoadingSpinner'
import { PredictionResponse } from '@/types'
import { IconChart, IconShield, IconTrend } from '@/components/icons/UiIcons'

export default function Home() {
  const [predictionData, setPredictionData] = useState<PredictionResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (brand: string, carType: string) => {
    setIsLoading(true)
    setError(null)
    setPredictionData(null)

    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ brand, carType }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to get prediction')
      }

      const data: PredictionResponse = await response.json()
      setPredictionData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full page-bg">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f7f6f3]/90 backdrop-blur-sm border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-stone-900 tracking-tight">Car Sales</span>
            <div className="hidden md:flex items-center gap-8">
              <a href="#predict" className="text-sm text-stone-500 hover:text-stone-900 transition-colors">Predict</a>
              <a href="#features" className="text-sm text-stone-500 hover:text-stone-900 transition-colors">Features</a>
              <a href="#about" className="text-sm text-stone-500 hover:text-stone-900 transition-colors">About</a>
            </div>
            <div className="flex items-center gap-2 text-sm text-stone-600">
              <span className="w-2 h-2 rounded-full bg-emerald-600" aria-hidden />
              <span>AI Online</span>
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-28 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14 animate-fade-in">
            <p className="text-sm text-stone-500 mb-5">Powered by AI</p>

            <h1 className="text-4xl md:text-6xl font-semibold mb-5 tracking-tight text-stone-900">
              Predict Car Prices
              <br />
              <span className="text-stone-600">With Precision</span>
            </h1>

            <p className="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
              Forecast vehicle prices for the next 5 years using market data and AI analysis.
              Make informed decisions with clear, data-driven insights.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
            {[
              { value: '99%', label: 'Accuracy Rate' },
              { value: '50K+', label: 'Predictions Made' },
              { value: '15+', label: 'Car Brands' },
              { value: '5 Years', label: 'Forecast Range' },
            ].map((stat, index) => (
              <div
                key={index}
                className="card p-5 text-center card-hover animate-fade-in"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <div className="text-2xl md:text-3xl font-semibold text-stone-900 mb-1">{stat.value}</div>
                <div className="text-sm text-stone-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="predict" className="px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="card p-8 md:p-10 animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-stone-900">Price Predictor</h2>
              <p className="text-stone-500 text-sm mt-1">Select your vehicle to begin analysis</p>
            </div>

            <CarInputForm onSubmit={handleSubmit} isLoading={isLoading} />
          </div>

          {isLoading && (
            <div className="mt-8 card p-10 text-center animate-fade-in">
              <LoadingSpinner />
              <p className="text-stone-600 mt-6 text-sm">
                Analyzing market data and generating predictions...
              </p>
            </div>
          )}

          {error && (
            <div className="mt-8 card p-5 border-red-200 bg-red-50 animate-fade-in">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0 text-red-700">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
                    <circle cx="12" cy="12" r="9" />
                    <path strokeLinecap="round" d="M12 8v4M12 16h.01" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-red-800">Prediction Error</h3>
                  <p className="text-red-700/80 text-sm mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

          {predictionData && !isLoading && (
            <div className="mt-8 animate-fade-in">
              <PredictionTable
                brand={predictionData.brand}
                carType={predictionData.carType}
                predictions={predictionData.predictions}
                historicalData={predictionData.historicalData}
              />
            </div>
          )}
        </div>
      </section>

      <section id="features" className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-stone-900 mb-3">Why use this tool?</h2>
            <p className="text-stone-600 max-w-xl mx-auto">
              The model analyzes historical data and market trends to produce structured forecasts.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: <IconChart className="w-5 h-5" />,
                title: 'Real-Time Data',
                description: 'Incorporates market trends, historical prices, and economic indicators into each forecast.',
              },
              {
                icon: <IconTrend className="w-5 h-5" />,
                title: 'Instant Results',
                description: 'Receive a full 5-year price projection within seconds of submitting your vehicle details.',
              },
              {
                icon: <IconShield className="w-5 h-5" />,
                title: 'High Accuracy',
                description: 'Each year includes a confidence score so you can gauge reliability of the estimate.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="card p-7 card-hover animate-fade-in"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <div className="w-10 h-10 rounded-lg bg-stone-100 text-stone-700 flex items-center justify-center mb-5">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-medium text-stone-900 mb-2">{feature.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer id="about" className="px-6 py-10 border-t border-stone-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-base font-semibold text-stone-900">Car Sales</span>
              <p className="text-xs text-stone-500 mt-0.5">AI-Powered Price Predictions</p>
            </div>
            <p className="text-sm text-stone-500">
              © 2024 Car Sales. Powered by OpenAI & Langchain.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

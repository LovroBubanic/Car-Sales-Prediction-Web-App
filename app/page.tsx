'use client'

import { useState } from 'react'
import CarInputForm from '@/components/CarInputForm'
import PredictionTable from '@/components/PredictionTable'
import LoadingSpinner from '@/components/LoadingSpinner'
import { PredictionResponse } from '@/types'

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
    <div className="min-h-screen w-full gradient-bg">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">Car Sales</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#predict" className="text-white/60 hover:text-white transition-colors">Predict</a>
              <a href="#features" className="text-white/60 hover:text-white transition-colors">Features</a>
              <a href="#about" className="text-white/60 hover:text-white transition-colors">About</a>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 glass rounded-full">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <span className="text-sm text-white/80">AI Online</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-8">
              <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
              <span className="text-sm text-white/70">Powered by Advanced AI</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              <span className="text-white">Predict Car Prices</span>
              <br />
              <span className="text-gradient">With Precision</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
              Harness the power of artificial intelligence to forecast vehicle prices 
              for the next 5 years. Make smarter decisions with data-driven insights.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {[
              { value: '99%', label: 'Accuracy Rate' },
              { value: '50K+', label: 'Predictions Made' },
              { value: '15+', label: 'Car Brands' },
              { value: '5 Years', label: 'Forecast Range' },
            ].map((stat, index) => (
              <div 
                key={index} 
                className="glass rounded-2xl p-6 text-center card-hover animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-2xl md:text-3xl font-bold text-gradient mb-1">{stat.value}</div>
                <div className="text-sm text-white/50">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Prediction Section */}
      <section id="predict" className="px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* AI Interface Card */}
          <div className="glass-strong rounded-3xl p-8 md:p-12 glow animate-fade-in">
            {/* AI Header */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center animate-float">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-400 border-2 border-[#0a0a0f]"></div>
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white">AI Price Predictor</h2>
                <p className="text-white/50 text-sm">Select your vehicle to begin analysis</p>
              </div>
            </div>

            {/* Form */}
            <CarInputForm onSubmit={handleSubmit} isLoading={isLoading} />
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="mt-8 glass-strong rounded-3xl p-12 text-center animate-fade-in">
              <LoadingSpinner />
              <p className="text-white/60 mt-6">
                Analyzing market data and generating predictions...
              </p>
              <div className="flex items-center justify-center gap-2 mt-4">
                <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="mt-8 glass rounded-2xl p-6 border border-red-500/20 animate-fade-in">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-red-400">Prediction Error</h3>
                  <p className="text-white/60 text-sm mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Results */}
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

      {/* Features Section */}
      <section id="features" className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose Our AI?
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              Our advanced machine learning model analyzes millions of data points to deliver accurate predictions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
                title: 'Real-Time Data',
                description: 'Analyzes current market trends, historical prices, and economic indicators for accurate forecasts.',
                gradient: 'from-indigo-500 to-purple-500',
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: 'Instant Results',
                description: 'Get comprehensive 5-year price predictions in seconds, powered by GPT-4 intelligence.',
                gradient: 'from-cyan-500 to-blue-500',
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: 'High Accuracy',
                description: 'Advanced algorithms ensure reliable predictions with confidence scores for each forecast.',
                gradient: 'from-pink-500 to-rose-500',
              },
            ].map((feature, index) => (
              <div 
                key={index} 
                className="glass rounded-2xl p-8 card-hover animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-white/50 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="px-6 py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <span className="text-lg font-bold text-white">Car Sales</span>
                <p className="text-xs text-white/40">AI-Powered Price Predictions</p>
              </div>
            </div>
            
            <p className="text-sm text-white/40">
              © 2024 Car Sales. Powered by OpenAI & Langchain.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

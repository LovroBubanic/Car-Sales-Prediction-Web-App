'use client'

import { YearPrediction } from '@/types'

interface PredictionTableProps {
  brand: string
  carType: string
  predictions: YearPrediction[]
  historicalData?: Array<{ year: number; price: number }>
}

export default function PredictionTable({
  brand,
  carType,
  predictions,
  historicalData = [],
}: PredictionTableProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatPercent = (value: number | null | undefined) => {
    if (value === null || value === undefined) return 'N/A'
    const sign = value >= 0 ? '+' : ''
    return `${sign}${value.toFixed(1)}%`
  }

  const getConfidenceColor = (confidence: number | null | undefined) => {
    if (confidence === null || confidence === undefined) return 'bg-white/10 text-white/60'
    if (confidence >= 80) return 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
    if (confidence >= 60) return 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
    if (confidence >= 40) return 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
    return 'bg-red-500/20 text-red-400 border border-red-500/30'
  }

  const getChangeColor = (value: number | null | undefined) => {
    if (value === null || value === undefined) return 'text-white/60'
    return value >= 0 ? 'text-emerald-400' : 'text-red-400'
  }

  // Find the price range for visualization
  const allPrices = [
    ...historicalData.map(d => d.price),
    ...predictions.map(p => p.predictedPrice)
  ]
  const maxPrice = Math.max(...allPrices)
  const minPrice = Math.min(...allPrices)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="glass-strong rounded-2xl p-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                {brand} {carType}
              </h2>
              <p className="text-white/50">5-Year Price Prediction Analysis</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 glass rounded-full">
            <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
            <span className="text-sm text-white/80">Prediction Complete</span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {predictions.length > 0 && (
          <>
            <div className="glass rounded-xl p-4">
              <div className="text-sm text-white/50 mb-1">Current Year</div>
              <div className="text-xl font-bold text-white">{predictions[0].year}</div>
              <div className="text-lg text-indigo-400 font-semibold">{formatCurrency(predictions[0].predictedPrice)}</div>
            </div>
            <div className="glass rounded-xl p-4">
              <div className="text-sm text-white/50 mb-1">5-Year Forecast</div>
              <div className="text-xl font-bold text-white">{predictions[predictions.length - 1].year}</div>
              <div className="text-lg text-cyan-400 font-semibold">{formatCurrency(predictions[predictions.length - 1].predictedPrice)}</div>
            </div>
            <div className="glass rounded-xl p-4">
              <div className="text-sm text-white/50 mb-1">Total Change</div>
              <div className={`text-xl font-bold ${
                predictions[predictions.length - 1].predictedPrice >= predictions[0].predictedPrice
                  ? 'text-emerald-400' : 'text-red-400'
              }`}>
                {formatCurrency(predictions[predictions.length - 1].predictedPrice - predictions[0].predictedPrice)}
              </div>
              <div className="text-sm text-white/40">
                {(((predictions[predictions.length - 1].predictedPrice - predictions[0].predictedPrice) / predictions[0].predictedPrice) * 100).toFixed(1)}%
              </div>
            </div>
            <div className="glass rounded-xl p-4">
              <div className="text-sm text-white/50 mb-1">Avg. Confidence</div>
              <div className="text-xl font-bold text-white">
                {Math.round(predictions.reduce((sum, p) => sum + (p.confidence || 0), 0) / predictions.length)}%
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full mt-2 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full"
                  style={{ width: `${Math.round(predictions.reduce((sum, p) => sum + (p.confidence || 0), 0) / predictions.length)}%` }}
                ></div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Historical Data */}
      {historicalData.length > 0 && (
        <div className="glass rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Historical Market Data
          </h3>
          <div className="grid gap-3">
            {historicalData.map((data, index) => (
              <div key={data.year} className="flex items-center gap-4 p-3 glass rounded-xl">
                <div className="w-16 text-sm font-medium text-white/80">{data.year}</div>
                <div className="flex-1">
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-500/50 to-indigo-500 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${((data.price - minPrice) / (maxPrice - minPrice)) * 100}%`,
                        animationDelay: `${index * 100}ms`
                      }}
                    ></div>
                  </div>
                </div>
                <div className="w-28 text-right font-semibold text-indigo-400">{formatCurrency(data.price)}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Predictions Table */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/5">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            Detailed Predictions
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full table-modern">
            <thead>
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-white/60 uppercase tracking-wider">
                  Year
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-white/60 uppercase tracking-wider">
                  Predicted Price
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-white/60 uppercase tracking-wider">
                  YoY Change
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-white/60 uppercase tracking-wider">
                  Depreciation
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-white/60 uppercase tracking-wider">
                  Confidence
                </th>
              </tr>
            </thead>
            <tbody>
              {predictions.map((prediction, index) => (
                <tr 
                  key={prediction.year}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                        index === 0 ? 'bg-indigo-500/20 text-indigo-400' : 'bg-white/5 text-white/60'
                      }`}>
                        {index + 1}
                      </div>
                      <span className="font-semibold text-white">{prediction.year}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-gradient">{formatCurrency(prediction.predictedPrice)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <span className={`font-medium ${getChangeColor(prediction.changePercent)}`}>
                      {formatPercent(prediction.changePercent)}
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <span className="text-white/60">
                      {formatPercent(prediction.depreciationRate)}
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    {prediction.confidence !== null && prediction.confidence !== undefined ? (
                      <div className="flex items-center gap-3">
                        <div className="w-20 h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              prediction.confidence >= 80 ? 'bg-emerald-500' :
                              prediction.confidence >= 60 ? 'bg-cyan-500' :
                              prediction.confidence >= 40 ? 'bg-amber-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${prediction.confidence}%` }}
                          ></div>
                        </div>
                        <span className={`px-2 py-1 rounded-md text-xs font-semibold ${getConfidenceColor(prediction.confidence)}`}>
                          {prediction.confidence}%
                        </span>
                      </div>
                    ) : (
                      <span className="text-white/40">N/A</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="flex items-start gap-3 p-4 glass rounded-xl border border-amber-500/20">
        <svg className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-sm text-white/60">
          <span className="text-amber-400 font-medium">Disclaimer:</span> These predictions are generated by AI based on historical data and market trends. 
          Actual prices may vary due to market conditions, economic factors, and vehicle condition. 
          Use these predictions as guidance only.
        </p>
      </div>
    </div>
  )
}

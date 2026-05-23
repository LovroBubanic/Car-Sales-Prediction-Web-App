'use client'

import { YearPrediction } from '@/types'
import { BrandIcon } from '@/components/icons/VehicleIcons'
import { IconAlert, IconClock, IconTrend } from '@/components/icons/UiIcons'

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

  const getConfidenceStyles = (confidence: number | null | undefined) => {
    if (confidence === null || confidence === undefined) return 'bg-stone-100 text-stone-600'
    if (confidence >= 80) return 'bg-emerald-50 text-emerald-800 border border-emerald-200'
    if (confidence >= 60) return 'bg-stone-100 text-stone-700 border border-stone-200'
    if (confidence >= 40) return 'bg-amber-50 text-amber-800 border border-amber-200'
    return 'bg-red-50 text-red-800 border border-red-200'
  }

  const getChangeColor = (value: number | null | undefined) => {
    if (value === null || value === undefined) return 'text-stone-500'
    return value >= 0 ? 'text-emerald-700' : 'text-red-700'
  }

  const getBarColor = (confidence: number) => {
    if (confidence >= 80) return 'bg-emerald-600'
    if (confidence >= 60) return 'bg-stone-500'
    if (confidence >= 40) return 'bg-amber-500'
    return 'bg-red-500'
  }

  const allPrices = [
    ...historicalData.map((d) => d.price),
    ...predictions.map((p) => p.predictedPrice),
  ]
  const maxPrice = Math.max(...allPrices)
  const minPrice = Math.min(...allPrices)

  const avgConfidence =
    predictions.length > 0
      ? Math.round(predictions.reduce((sum, p) => sum + (p.confidence || 0), 0) / predictions.length)
      : 0

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-stone-100 flex items-center justify-center text-stone-600">
              <BrandIcon brand={brand} className="w-9 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-stone-900">
                {brand} {carType}
              </h2>
              <p className="text-stone-500 text-sm">5-year price prediction</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-stone-600">
            <span className="w-2 h-2 rounded-full bg-emerald-600" aria-hidden />
            <span>Prediction complete</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {predictions.length > 0 && (
          <>
            <div className="card p-4">
              <div className="text-xs text-stone-500 mb-1">Current year</div>
              <div className="text-lg font-semibold text-stone-900">{predictions[0].year}</div>
              <div className="text-base font-medium text-stone-800 mt-0.5">
                {formatCurrency(predictions[0].predictedPrice)}
              </div>
            </div>
            <div className="card p-4">
              <div className="text-xs text-stone-500 mb-1">5-year forecast</div>
              <div className="text-lg font-semibold text-stone-900">
                {predictions[predictions.length - 1].year}
              </div>
              <div className="text-base font-medium text-stone-800 mt-0.5">
                {formatCurrency(predictions[predictions.length - 1].predictedPrice)}
              </div>
            </div>
            <div className="card p-4">
              <div className="text-xs text-stone-500 mb-1">Total change</div>
              <div
                className={`text-lg font-semibold ${
                  predictions[predictions.length - 1].predictedPrice >= predictions[0].predictedPrice
                    ? 'text-emerald-700'
                    : 'text-red-700'
                }`}
              >
                {formatCurrency(
                  predictions[predictions.length - 1].predictedPrice - predictions[0].predictedPrice
                )}
              </div>
              <div className="text-xs text-stone-500 mt-0.5">
                {(
                  ((predictions[predictions.length - 1].predictedPrice - predictions[0].predictedPrice) /
                    predictions[0].predictedPrice) *
                  100
                ).toFixed(1)}
                %
              </div>
            </div>
            <div className="card p-4">
              <div className="text-xs text-stone-500 mb-1">Avg. confidence</div>
              <div className="text-lg font-semibold text-stone-900">{avgConfidence}%</div>
              <div className="w-full h-1.5 bg-stone-100 rounded-full mt-2 overflow-hidden">
                <div
                  className="h-full bg-stone-600 rounded-full"
                  style={{ width: `${avgConfidence}%` }}
                />
              </div>
            </div>
          </>
        )}
      </div>

      {historicalData.length > 0 && (
        <div className="card p-6">
          <h3 className="text-base font-medium text-stone-900 mb-4 flex items-center gap-2">
            <IconClock className="w-4 h-4 text-stone-500" />
            Historical market data
          </h3>
          <div className="grid gap-2">
            {historicalData.map((data) => (
              <div key={data.year} className="flex items-center gap-4 p-3 rounded-lg bg-stone-50 border border-stone-100">
                <div className="w-14 text-sm font-medium text-stone-700">{data.year}</div>
                <div className="flex-1">
                  <div className="h-1.5 bg-stone-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-stone-500 rounded-full"
                      style={{
                        width: `${((data.price - minPrice) / (maxPrice - minPrice)) * 100}%`,
                      }}
                    />
                  </div>
                </div>
                <div className="w-28 text-right font-medium text-stone-800 text-sm">
                  {formatCurrency(data.price)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="card overflow-hidden">
        <div className="p-5 border-b border-stone-200">
          <h3 className="text-base font-medium text-stone-900 flex items-center gap-2">
            <IconTrend className="w-4 h-4 text-stone-500" />
            Detailed predictions
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-modern">
            <thead>
              <tr>
                <th className="px-5 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wide">
                  Year
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wide">
                  Predicted price
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wide">
                  YoY change
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wide">
                  Depreciation
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wide">
                  Confidence
                </th>
              </tr>
            </thead>
            <tbody>
              {predictions.map((prediction, index) => (
                <tr key={prediction.year} className="animate-fade-in" style={{ animationDelay: `${index * 80}ms` }}>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-7 h-7 rounded-md flex items-center justify-center text-xs font-medium ${
                          index === 0 ? 'bg-stone-200 text-stone-800' : 'bg-stone-100 text-stone-600'
                        }`}
                      >
                        {index + 1}
                      </span>
                      <span className="font-medium text-stone-900">{prediction.year}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="text-base font-semibold text-stone-900">
                      {formatCurrency(prediction.predictedPrice)}
                    </span>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className={`font-medium text-sm ${getChangeColor(prediction.changePercent)}`}>
                      {formatPercent(prediction.changePercent)}
                    </span>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap text-sm text-stone-600">
                    {formatPercent(prediction.depreciationRate)}
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    {prediction.confidence !== null && prediction.confidence !== undefined ? (
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-1.5 bg-stone-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${getBarColor(prediction.confidence)}`}
                            style={{ width: `${prediction.confidence}%` }}
                          />
                        </div>
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-medium ${getConfidenceStyles(prediction.confidence)}`}
                        >
                          {prediction.confidence}%
                        </span>
                      </div>
                    ) : (
                      <span className="text-stone-400 text-sm">N/A</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-start gap-3 p-4 rounded-lg border border-amber-200 bg-amber-50">
        <IconAlert className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-amber-900/90">
          <span className="font-medium">Disclaimer:</span> These predictions are generated by AI from historical data
          and market trends. Actual prices may vary. Use as guidance only.
        </p>
      </div>
    </div>
  )
}

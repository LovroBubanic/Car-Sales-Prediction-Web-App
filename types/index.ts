export interface YearPrediction {
  year: number;
  predictedPrice: number;
  changePercent?: number | null;
  depreciationRate?: number | null;
  confidence?: number | null;
}

export interface PredictionResponse {
  brand: string;
  carType: string;
  predictions: YearPrediction[];
  historicalData?: {
    year: number;
    price: number;
  }[];
  source?: 'ai' | 'mock';
}


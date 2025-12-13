import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createPredictionChain } from '@/lib/langchain/chains';

const PredictionRequestSchema = z.object({
  brand: z.string().min(1),
  carType: z.string().min(1),
});

// Brand price multipliers
const brandMultipliers: Record<string, number> = {
  'Toyota': 1.0,
  'Honda': 1.0,
  'Ford': 0.9,
  'BMW': 1.5,
  'Mercedes-Benz': 1.6,
  'Tesla': 1.8,
  'Nissan': 0.95,
  'Chevrolet': 0.9,
  'Audi': 1.45,
  'Volkswagen': 1.1,
  'Hyundai': 0.85,
  'Kia': 0.85,
  'Mazda': 0.95,
  'Subaru': 1.05,
  'Lexus': 1.4,
};

// Type base prices
const typeBasePrice: Record<string, number> = {
  'SUV': 38000,
  'Sedan': 30000,
  'Hatchback': 24000,
  'Coupe': 35000,
  'Truck': 45000,
  'Convertible': 42000,
  'Wagon': 32000,
  'Van': 35000,
};

// Generate mock historical data
function generateMockHistoricalData(brand: string, carType: string) {
  const brandMultiplier = brandMultipliers[brand] || 1.0;
  const basePrice = typeBasePrice[carType] || 30000;
  const currentYear = new Date().getFullYear();
  
  const historicalData = [];
  for (let i = 5; i >= 1; i--) {
    const year = currentYear - i;
    const depreciation = i * 0.12;
    const variation = 0.95 + Math.random() * 0.1;
    const price = Math.round(basePrice * brandMultiplier * (1 - depreciation) * variation);
    historicalData.push({ year, price });
  }
  
  return historicalData;
}

// Generate mock predictions when AI is unavailable
function generateMockPredictions(
  historicalData: Array<{ year: number; price: number }>,
  brand: string
) {
  const currentYear = new Date().getFullYear();
  const lastPrice = historicalData.length > 0 
    ? historicalData[historicalData.length - 1].price 
    : 30000;
  
  const premiumBrands = ['BMW', 'Mercedes-Benz', 'Audi', 'Lexus', 'Tesla'];
  const baseDepreciation = premiumBrands.includes(brand) ? 0.08 : 0.12;
  
  const predictions = [];
  let previousPrice = lastPrice;
  
  for (let i = 1; i <= 5; i++) {
    const year = currentYear + i;
    const depreciation = baseDepreciation + (Math.random() * 0.02 - 0.01);
    const predictedPrice = Math.round(previousPrice * (1 - depreciation));
    const changePercent = -depreciation * 100;
    
    predictions.push({
      year,
      predictedPrice,
      changePercent: Math.round(changePercent * 100) / 100,
      depreciationRate: Math.round(depreciation * 10000) / 100,
      confidence: Math.max(50, 90 - i * 8 + Math.round(Math.random() * 10)),
    });
    
    previousPrice = predictedPrice;
  }
  
  return predictions;
}

// Get AI predictions using Langchain/OpenAI
async function getAIPredictions(
  historicalData: Array<{ year: number; price: number }>,
  brand: string,
  carType: string
) {
  if (!process.env.OPENAI_API_KEY) {
    return null;
  }
  
  try {
    const chain = await createPredictionChain(historicalData, brand, carType);
    const result = await chain.invoke({});
    return result.predictions;
  } catch (error) {
    console.error('AI prediction error:', error);
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { brand, carType } = PredictionRequestSchema.parse(body);

    let historicalData: Array<{ year: number; price: number }> = [];
    let usedDatabase = false;

    // Try to use database if configured
    if (process.env.DATABASE_URL) {
      try {
        const { prisma } = await import('@/lib/database/prisma');
        
        let carBrand = await prisma.carBrand.findUnique({
          where: { name: brand },
        });
        if (!carBrand) {
          carBrand = await prisma.carBrand.create({
            data: { name: brand },
          });
        }

        let carTypeRecord = await prisma.carType.findUnique({
          where: { name: carType },
        });
        if (!carTypeRecord) {
          carTypeRecord = await prisma.carType.create({
            data: { name: carType },
          });
        }

        const historicalPrices = await prisma.historicalPrice.findMany({
          where: {
            brandId: carBrand.id,
            typeId: carTypeRecord.id,
          },
          orderBy: {
            year: 'asc',
          },
        });

        historicalData = historicalPrices.map((hp) => ({
          year: hp.year,
          price: hp.price,
        }));
        
        usedDatabase = true;
      } catch (dbError) {
        console.warn('Database not available, using mock data:', dbError);
      }
    }

    // Use mock historical data if database not available or no data found
    if (historicalData.length === 0) {
      historicalData = generateMockHistoricalData(brand, carType);
    }

    const mostRecentYear = historicalData.length > 0
      ? Math.max(...historicalData.map(d => d.year))
      : new Date().getFullYear();

    // Try AI predictions, fall back to mock if unavailable
    const aiPredictions = await getAIPredictions(historicalData, brand, carType);
    
    let predictions;
    if (aiPredictions) {
      predictions = aiPredictions.slice(0, 5).map((pred: {
        year?: number;
        predictedPrice: number;
        changePercent?: number;
        depreciationRate?: number;
        confidence?: number;
      }) => ({
        year: pred.year || mostRecentYear + 1,
        predictedPrice: pred.predictedPrice,
        changePercent: pred.changePercent ?? null,
        depreciationRate: pred.depreciationRate ?? null,
        confidence: pred.confidence ?? null,
      }));
      predictions.sort((a: { year: number }, b: { year: number }) => a.year - b.year);
    } else {
      predictions = generateMockPredictions(historicalData, brand);
    }

    // Store prediction in database if available
    if (usedDatabase && process.env.DATABASE_URL) {
      try {
        const { prisma } = await import('@/lib/database/prisma');
        const carBrand = await prisma.carBrand.findUnique({ where: { name: brand } });
        const carTypeRecord = await prisma.carType.findUnique({ where: { name: carType } });
        
        if (carBrand && carTypeRecord) {
          await prisma.prediction.create({
            data: {
              brandId: carBrand.id,
              typeId: carTypeRecord.id,
              predictions: predictions,
            },
          });
        }
      } catch (storeError) {
        console.warn('Could not store prediction:', storeError);
      }
    }

    return NextResponse.json({
      brand,
      carType,
      predictions,
      historicalData: historicalData.slice(-5),
      source: aiPredictions ? 'ai' : 'mock',
    });
  } catch (error) {
    console.error('Prediction error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Invalid request data',
          details: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: 'Failed to generate prediction',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Car Sales API is running',
    hasOpenAI: !!process.env.OPENAI_API_KEY,
    hasDatabase: !!process.env.DATABASE_URL,
  });
}


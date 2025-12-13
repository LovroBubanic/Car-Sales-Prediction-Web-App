import { ChatOpenAI } from '@langchain/openai';
import { createPredictionPrompt } from './prompts';
import { z } from 'zod';

// Define the schema for structured output
const PredictionSchema = z.object({
  predictions: z.array(
    z.object({
      year: z.number().describe('The year for this prediction'),
      predictedPrice: z.number().describe('Predicted price in USD'),
      changePercent: z.number().optional().describe('Year-over-year change percentage'),
      depreciationRate: z.number().optional().describe('Estimated annual depreciation rate'),
      confidence: z.number().min(0).max(100).optional().describe('Confidence level (0-100)'),
    })
  ),
});

export async function createPredictionChain(
  historicalData: Array<{ year: number; price: number }>,
  brand: string,
  carType: string
) {
  const model = new ChatOpenAI({
    modelName: 'gpt-4o-mini',
    temperature: 0.3,
    openAIApiKey: process.env.OPENAI_API_KEY,
  }).withStructuredOutput(PredictionSchema, {
    name: 'car_price_predictions',
  });

  const prompt = createPredictionPrompt(historicalData, brand, carType);
  
  const chain = prompt.pipe(model);

  return chain;
}


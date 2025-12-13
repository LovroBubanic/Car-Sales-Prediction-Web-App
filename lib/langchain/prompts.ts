import { ChatPromptTemplate } from '@langchain/core/prompts';

export const PRICE_PREDICTION_SYSTEM_PROMPT = `You are an expert automotive market analyst specializing in car price predictions. 
Your role is to analyze historical car price data and predict future prices based on:
- Historical price trends
- Market depreciation rates
- Brand reputation and reliability
- Car type characteristics
- Economic factors affecting the automotive market

You must provide accurate, data-driven predictions for car prices over the next 5 years.`;

export const createPredictionPrompt = (
  historicalData: Array<{ year: number; price: number }>,
  brand: string,
  carType: string
) => {
  const historicalDataText = historicalData.length > 0
    ? historicalData.map(d => `Year ${d.year}: $${d.price.toLocaleString()}`).join('\n')
    : 'Limited historical data available. Use industry averages and brand/type characteristics.';

  const mostRecentYear = historicalData.length > 0
    ? Math.max(...historicalData.map(d => d.year))
    : new Date().getFullYear();

  const startYear = mostRecentYear + 1;

  return ChatPromptTemplate.fromMessages([
    ['system', PRICE_PREDICTION_SYSTEM_PROMPT],
    ['human', `Analyze the following historical price data for a ${brand} ${carType}:

Historical Data:
${historicalDataText}

Most recent year in data: ${mostRecentYear}

Based on this data and your knowledge of automotive market trends, predict the price for this vehicle over the next 5 years starting from year ${startYear}.

Consider:
1. Typical depreciation rates for this brand and car type
2. Market trends and economic factors
3. Brand reliability and resale value
4. Car type characteristics (SUV, Sedan, etc.)

Provide predictions for years ${startYear} through ${startYear + 4} with:
- year: The specific year (${startYear} to ${startYear + 4})
- predictedPrice: Predicted price in USD (number)
- changePercent: Year-over-year change percentage (optional number)
- depreciationRate: Estimated annual depreciation rate (optional number)
- confidence: Confidence level 0-100 (optional number)

Return exactly 5 predictions, one for each year from ${startYear} to ${startYear + 4}.`],
  ]);
};


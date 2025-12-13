# Car Sales - AI-Powered Price Predictions

A modern web application that uses AI to predict car prices for the next 5 years. Built with Next.js 15, React 19, and powered by OpenAI's GPT-4o-mini via Langchain.

Try it yourself: https://car-sales-prediction-web-app-workin.vercel.app/

## Features

- 🤖 **AI-Powered Predictions** - Uses GPT-4o-mini for accurate price forecasting
- 📊 **5-Year Forecasts** - Get detailed predictions for the next 5 years
- 🎨 **Modern Dark UI** - Beautiful, responsive design with glass morphism effects
- ⚡ **Fast & Serverless** - Optimized for Vercel Edge deployment
- 🔒 **Type-Safe** - Built with TypeScript and Zod validation
- 📱 **Responsive** - Works on desktop, tablet, and mobile

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI**: React 19, Tailwind CSS
- **AI**: Langchain, OpenAI GPT-4o-mini
- **Database**: PostgreSQL (optional, via Prisma)
- **Deployment**: Vercel

## Quick Start

### Prerequisites

- Node.js 18+ 
- OpenAI API Key ([Get one here](https://platform.openai.com/api-keys))

### Local Development

1. **Clone and install dependencies**
   ```bash
   git clone <your-repo>
   cd frontend
   npm install
   ```

2. **Set up environment variables**
   
   Create a `.env.local` file:
   ```env
   OPENAI_API_KEY=sk-your-openai-api-key-here
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open the app**
   
   Visit [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel

> 📖 **For detailed step-by-step instructions with real market data, see [VERCEL-SETUP.md](VERCEL-SETUP.md)**

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/car-sales&env=OPENAI_API_KEY&envDescription=OpenAI%20API%20Key%20for%20AI%20predictions&project-name=car-sales&repository-name=car-sales)

### Manual Deployment

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/car-sales.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Select the `frontend` folder as the root directory

3. **Configure Environment Variables**
   
   In Vercel Dashboard → Settings → Environment Variables, add:
   
   | Variable | Value | Required |
   |----------|-------|----------|
   | `OPENAI_API_KEY` | Your OpenAI API key | ✅ Yes |
   | `DATABASE_URL` | PostgreSQL connection string | ❌ Optional |
   | `DIRECT_URL` | Direct PostgreSQL URL | ❌ Optional |

4. **Deploy**
   
   Click "Deploy" and wait for the build to complete!

### Adding a Database (Optional)

For storing historical data and predictions:

1. **Vercel Postgres** (Recommended)
   - Go to your Vercel project → Storage → Create Database → Postgres
   - Environment variables are automatically added

2. **External PostgreSQL** (Supabase, Railway, etc.)
   - Add `DATABASE_URL` and `DIRECT_URL` in Environment Variables
   - Run `npx prisma db push` locally first to create tables

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | OpenAI API key for GPT-4o-mini | Yes |
| `DATABASE_URL` | PostgreSQL connection (pooled) | No |
| `DIRECT_URL` | PostgreSQL direct connection | No |

**Note**: Without a database, the app uses mock historical data but AI predictions still work!

## Project Structure

```
frontend/
├── app/
│   ├── api/
│   │   └── predict/
│   │       └── route.ts      # AI prediction API endpoint
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page
├── components/
│   ├── CarInputForm.tsx      # Brand/type selection form
│   ├── LoadingSpinner.tsx    # Loading animation
│   └── PredictionTable.tsx   # Results display
├── lib/
│   ├── database/
│   │   └── prisma.ts         # Prisma client
│   └── langchain/
│       ├── chains.ts         # Langchain prediction chain
│       └── prompts.ts        # AI prompts
├── prisma/
│   └── schema.prisma         # Database schema
├── types/
│   └── index.ts              # TypeScript types
├── package.json
├── vercel.json               # Vercel configuration
└── README.md
```

## How It Works

1. **User Selection**: User selects a car brand and type
2. **Data Retrieval**: System fetches historical price data (from DB or generates mock data)
3. **AI Analysis**: Langchain sends data to GPT-4o-mini with a specialized prompt
4. **Structured Output**: AI returns predictions in a validated JSON format
5. **Display**: Results shown with confidence scores and depreciation rates

## API Endpoints

### POST `/api/predict`

Generates price predictions for a car.

**Request:**
```json
{
  "brand": "Toyota",
  "carType": "SUV"
}
```

**Response:**
```json
{
  "brand": "Toyota",
  "carType": "SUV",
  "predictions": [
    {
      "year": 2025,
      "predictedPrice": 35000,
      "changePercent": -5.2,
      "depreciationRate": 5.2,
      "confidence": 85
    }
  ],
  "historicalData": [...],
  "source": "ai"
}
```

### GET `/api/predict`

Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "message": "Car Sales API is running",
  "hasOpenAI": true,
  "hasDatabase": false
}
```

## Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:push      # Push Prisma schema to database
npm run db:studio    # Open Prisma Studio
```

## Troubleshooting

### "AI predictions not working"
- Check that `OPENAI_API_KEY` is set correctly
- Ensure your OpenAI account has credits
- Check Vercel function logs for errors

### "Database connection failed"
- Verify `DATABASE_URL` format
- For Vercel Postgres, ensure the integration is properly connected
- Check if tables exist (run `npm run db:push`)

### "Build fails on Vercel"
- Ensure `prisma generate` runs during build (already configured)
- Check that all dependencies are in `package.json`

## License

Lovro Bubanic License - built to showcase my work!

---

Built with ❤️ using Next.js, Langchain, and OpenAI


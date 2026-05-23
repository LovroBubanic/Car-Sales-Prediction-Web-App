# Car Sales — AI-Powered Price Predictions

A full-stack web application that forecasts used and new vehicle prices over a five-year horizon. Users select a brand and body type; the backend combines historical market data with an LLM-driven analysis pipeline to return structured yearly projections, including confidence scores and depreciation rates.

**Live demo:** [car-sales-prediction-web-app-workin.vercel.app](https://car-sales-prediction-web-app-workin.vercel.app/)

---

## Overview

Car Sales is built as a portfolio project demonstrating end-to-end product development: a responsive Next.js frontend, a typed API layer, optional PostgreSQL persistence via Prisma, and AI integration through LangChain and OpenAI. The application is designed for deployment on Vercel and runs without a database when only the prediction API is required.

### Capabilities

- **Five-year forecasts** — Year-by-year predicted prices with year-over-year change and depreciation metrics.
- **AI-assisted analysis** — GPT-4o-mini processes historical context and market trends via LangChain prompts with schema-validated JSON output (Zod).
- **Flexible data layer** — Historical prices from PostgreSQL when configured; otherwise mock seed data for demonstration.
- **Interactive UI** — Brand and body-type selection, loading states, tabular results, and historical price visualization.
- **Production-ready API** — REST endpoints for predictions and health checks, suitable for serverless deployment.

---

## Tech Stack

| Layer | Technologies |
|-------|----------------|
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router) |
| **Frontend** | [React 19](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/), TypeScript |
| **AI** | [LangChain](https://js.langchain.com/), [OpenAI GPT-4o-mini](https://platform.openai.com/) |
| **Validation** | [Zod](https://zod.dev/) |
| **Database** | [PostgreSQL](https://www.postgresql.org/) (optional), [Prisma](https://www.prisma.io/) |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## How It Works

1. The user selects a **brand** (e.g. Toyota) and **body type** (e.g. SUV) in the web interface.
2. The `/api/predict` route loads **historical price data** from the database or generated mock data.
3. A **LangChain chain** formats the context and calls GPT-4o-mini with a structured prompt.
4. The model response is **parsed and validated** against a defined schema.
5. The client displays **predictions**, confidence levels, and optional historical charts.

---

## Getting Started

### Prerequisites

- Node.js 18 or later
- An [OpenAI API key](https://platform.openai.com/api-keys)

### Installation

```bash
git clone <repository-url>
cd car-sales
npm install
```

### Environment variables

Create `.env.local` in the project root:

```env
OPENAI_API_KEY=sk-your-openai-api-key
```

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | OpenAI API key for GPT-4o-mini | Yes |
| `DATABASE_URL` | PostgreSQL connection string (pooled) | No |
| `DIRECT_URL` | PostgreSQL direct connection (migrations) | No |

Without a database, the application uses mock historical data; AI predictions still function.

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Other commands

```bash
npm run build        # Production build (includes Prisma generate)
npm run start        # Start production server
npm run lint         # ESLint
npm run db:push      # Apply Prisma schema to database
npm run db:studio    # Open Prisma Studio
```

---

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── predict/route.ts    # Prediction API
│   │   └── seed/route.ts       # Database seeding (optional)
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── icons/                  # SVG icons (brands, UI)
│   ├── CarInputForm.tsx
│   ├── LoadingSpinner.tsx
│   └── PredictionTable.tsx
├── lib/
│   ├── database/prisma.ts
│   ├── langchain/
│   │   ├── chains.ts
│   │   └── prompts.ts
│   └── seed-data.ts
├── prisma/schema.prisma
├── types/index.ts
├── package.json
└── vercel.json
```

---

## API Reference

### `POST /api/predict`

Generates a five-year price forecast for the given vehicle.

**Request body:**

```json
{
  "brand": "Toyota",
  "carType": "SUV"
}
```

**Response (excerpt):**

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
  "historicalData": [],
  "source": "ai"
}
```

### `GET /api/predict`

Health check for the prediction service.

```json
{
  "status": "ok",
  "message": "Car Sales API is running",
  "hasOpenAI": true,
  "hasDatabase": false
}
```

---

## Deployment

Detailed Vercel setup (environment variables, optional Postgres, seeding) is documented in [VERCEL-SETUP.md](VERCEL-SETUP.md).

**Summary:**

1. Push the repository to GitHub.
2. Import the project in the [Vercel dashboard](https://vercel.com/new) (repository root as the project directory).
3. Set `OPENAI_API_KEY` under **Settings → Environment Variables**.
4. Deploy. Optionally add Vercel Postgres or an external database and configure `DATABASE_URL` / `DIRECT_URL`.

---

## Troubleshooting

| Issue | What to check |
|-------|----------------|
| Predictions fail | `OPENAI_API_KEY` is set; account has available credits; Vercel function logs |
| Database errors | `DATABASE_URL` format; Prisma schema applied (`npm run db:push`) |
| Build fails | Dependencies installed; `prisma generate` runs (included in `npm run build`) |

---

## License

This project is provided for portfolio and demonstration purposes. See repository terms or contact the author for reuse permissions.

---

*Car Sales — Next.js, LangChain, OpenAI*

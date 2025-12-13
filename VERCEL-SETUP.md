# 🚀 Deploying Car Sales to Vercel with Real Data

This guide walks you through deploying the Car Sales app to Vercel with a real PostgreSQL database containing actual market price data.

## Prerequisites

- GitHub account
- Vercel account (free tier works!)
- OpenAI API key

---

## Step 1: Push to GitHub

First, push the frontend folder to GitHub:

```bash
cd frontend

# Initialize git (if not already)
git init
git add .
git commit -m "Initial commit"

# Create a new repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/car-sales.git
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (or `frontend` if you pushed the whole repo)
   - **Build Command**: `prisma generate && next build`
   - **Install Command**: `npm install`

5. Click **"Deploy"** (it will fail initially - that's expected!)

---

## Step 3: Add Vercel Postgres Database

1. In your Vercel project dashboard, go to **"Storage"** tab
2. Click **"Create Database"** → Select **"Postgres"**
3. Choose a name (e.g., `car-sales-db`)
4. Select a region close to your users
5. Click **"Create"**

Vercel will automatically add these environment variables:
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NON_POOLING`

---

## Step 4: Configure Environment Variables

Go to **Settings** → **Environment Variables** and add:

| Name | Value | Required |
|------|-------|----------|
| `DATABASE_URL` | Copy from `POSTGRES_PRISMA_URL` | ✅ Yes |
| `DIRECT_URL` | Copy from `POSTGRES_URL_NON_POOLING` | ✅ Yes |
| `OPENAI_API_KEY` | Your OpenAI API key | ✅ Yes |
| `SEED_SECRET_KEY` | A secret key for seeding (e.g., `my-secret-key-123`) | Optional |

### How to copy the database URLs:

1. Go to **Storage** → Your database
2. Click **".env.local"** tab
3. Copy `POSTGRES_PRISMA_URL` value → Paste as `DATABASE_URL`
4. Copy `POSTGRES_URL_NON_POOLING` value → Paste as `DIRECT_URL`

---

## Step 5: Push Database Schema

After adding environment variables, you need to create the database tables.

### Option A: Using Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Link your project
vercel link

# Pull environment variables
vercel env pull .env.local

# Generate Prisma client and push schema
npx prisma generate
npx prisma db push
```

### Option B: Using GitHub Actions

Add this workflow to `.github/workflows/db-setup.yml`:

```yaml
name: Setup Database
on: workflow_dispatch

jobs:
  setup:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm install
      - run: npx prisma db push
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
          DIRECT_URL: ${{ secrets.DIRECT_URL }}
```

Then run it manually from GitHub Actions tab.

---

## Step 6: Redeploy the App

After setting up environment variables:

1. Go to your Vercel project dashboard
2. Go to **"Deployments"** tab
3. Click the three dots on the latest deployment
4. Click **"Redeploy"**

Wait for the deployment to complete.

---

## Step 7: Seed the Database with Real Data

Now populate your database with real market price data:

1. Open your deployed app URL
2. Navigate to: `https://your-app.vercel.app/api/seed?key=car-sales-seed-2024`
   - Or use your custom `SEED_SECRET_KEY` if you set one

3. You should see:
```json
{
  "success": true,
  "message": "Database seeded successfully!",
  "stats": {
    "brandsCreated": 15,
    "typesCreated": 8,
    "pricesCreated": 150,
    "totalRecords": 150
  }
}
```

---

## Step 8: Verify Everything Works

1. Go to your app: `https://your-app.vercel.app`
2. Select a car brand and type
3. Click "Generate Price Prediction"
4. You should see:
   - **Historical data** from the database (real market prices!)
   - **AI predictions** based on that real data

Check the API response includes `"source": "ai"` to confirm AI is working.

---

## 🎉 Done!

Your Car Sales app is now running on Vercel with:
- ✅ Real market price data (2019-2024)
- ✅ PostgreSQL database (Vercel Postgres)
- ✅ AI predictions (OpenAI GPT-4o-mini)
- ✅ Serverless architecture (auto-scaling)

---

## Troubleshooting

### "Database connection failed"
- Verify `DATABASE_URL` and `DIRECT_URL` are correctly set
- Make sure you copied the values from Vercel Storage, not typed them

### "AI predictions not working"
- Check `OPENAI_API_KEY` is set correctly
- Verify your OpenAI account has credits
- Check function logs in Vercel dashboard

### "Seed endpoint returns 401"
- Make sure you're using the correct `?key=` parameter
- Default key is `car-sales-seed-2024`
- Or check your `SEED_SECRET_KEY` environment variable

### "Tables don't exist"
- Run `npx prisma db push` locally with the Vercel environment variables
- Or use Vercel CLI: `vercel env pull && npx prisma db push`

---

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/predict` | POST | Generate price predictions |
| `/api/predict` | GET | Health check |
| `/api/seed` | GET | Check seed status |
| `/api/seed?key=XXX` | POST | Seed the database |

---

## Cost Estimate (Vercel Free Tier)

| Resource | Free Tier Limit | Typical Usage |
|----------|-----------------|---------------|
| Serverless Functions | 100 GB-hours/month | ~5,000 predictions |
| Database Storage | 256 MB | ~0.5 MB for seed data |
| Database Compute | 60 hours/month | Plenty for hobby use |
| Bandwidth | 100 GB/month | Plenty |

For personal/demo use, you'll likely stay within free limits!


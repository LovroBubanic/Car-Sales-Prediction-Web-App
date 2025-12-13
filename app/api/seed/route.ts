import { NextRequest, NextResponse } from 'next/server';
import { REAL_MARKET_DATA } from '@/lib/seed-data';

/**
 * Seed the database with real market data
 * 
 * This endpoint should be called ONCE after setting up your Vercel Postgres database.
 * It populates the database with historical car price data.
 * 
 * Security: Protected by a secret key to prevent unauthorized seeding
 */

export async function POST(request: NextRequest) {
  try {
    // Check for secret key (set this in Vercel environment variables)
    const { searchParams } = new URL(request.url);
    const secretKey = searchParams.get('key');
    const expectedKey = process.env.SEED_SECRET_KEY || 'car-sales-seed-2024';
    
    if (secretKey !== expectedKey) {
      return NextResponse.json(
        { error: 'Unauthorized. Provide correct ?key= parameter' },
        { status: 401 }
      );
    }

    // Check if database is configured
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: 'DATABASE_URL not configured. Please set up Vercel Postgres first.' },
        { status: 500 }
      );
    }

    const { prisma } = await import('@/lib/database/prisma');

    console.log('Starting database seed...');

    // Track progress
    let brandsCreated = 0;
    let typesCreated = 0;
    let pricesCreated = 0;
    let pricesUpdated = 0;

    // Get unique brands and types
    const brands = [...new Set(REAL_MARKET_DATA.map(d => d.brand))];
    const types = [...new Set(REAL_MARKET_DATA.map(d => d.type))];

    // Create all brands
    for (const brandName of brands) {
      const existing = await prisma.carBrand.findUnique({
        where: { name: brandName },
      });
      
      if (!existing) {
        await prisma.carBrand.create({
          data: { name: brandName },
        });
        brandsCreated++;
      }
    }

    // Create all types
    for (const typeName of types) {
      const existing = await prisma.carType.findUnique({
        where: { name: typeName },
      });
      
      if (!existing) {
        await prisma.carType.create({
          data: { name: typeName },
        });
        typesCreated++;
      }
    }

    // Insert all historical prices
    for (const record of REAL_MARKET_DATA) {
      const brand = await prisma.carBrand.findUnique({
        where: { name: record.brand },
      });
      
      const type = await prisma.carType.findUnique({
        where: { name: record.type },
      });

      if (brand && type) {
        try {
          await prisma.historicalPrice.upsert({
            where: {
              brandId_typeId_year_source: {
                brandId: brand.id,
                typeId: type.id,
                year: record.year,
                source: record.source,
              },
            },
            update: {
              price: record.price,
            },
            create: {
              brandId: brand.id,
              typeId: type.id,
              year: record.year,
              price: record.price,
              source: record.source,
            },
          });
          pricesCreated++;
        } catch (e) {
          pricesUpdated++;
        }
      }
    }

    console.log(`Seed complete! Brands: ${brandsCreated}, Types: ${typesCreated}, Prices: ${pricesCreated}`);

    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully!',
      stats: {
        brandsCreated,
        typesCreated,
        pricesCreated,
        pricesUpdated,
        totalRecords: REAL_MARKET_DATA.length,
      },
    });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json(
      {
        error: 'Failed to seed database',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Health check and info
export async function GET() {
  const hasDatabase = !!process.env.DATABASE_URL;
  
  let dbStats = null;
  if (hasDatabase) {
    try {
      const { prisma } = await import('@/lib/database/prisma');
      const [brandCount, typeCount, priceCount] = await Promise.all([
        prisma.carBrand.count(),
        prisma.carType.count(),
        prisma.historicalPrice.count(),
      ]);
      dbStats = { brands: brandCount, types: typeCount, prices: priceCount };
    } catch (e) {
      dbStats = { error: 'Could not connect to database' };
    }
  }

  return NextResponse.json({
    endpoint: '/api/seed',
    description: 'Seed the database with real market car price data',
    hasDatabase,
    databaseStats: dbStats,
    seedDataRecords: REAL_MARKET_DATA.length,
    usage: {
      method: 'POST',
      url: '/api/seed?key=YOUR_SECRET_KEY',
      note: 'Set SEED_SECRET_KEY in environment variables, or use default: car-sales-seed-2024',
    },
  });
}


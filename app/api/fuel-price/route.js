// app/api/fuel-price/route.js
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import connectDB from '@/lib/mongodb';
import FuelPrice from '@/lib/models/FuelPrice';
import { getUserFromRequest } from '@/lib/auth';
import { fuelPriceSchema, sanitizeInput } from '@/lib/validation';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';

/**
 * GET /api/fuel-price
 * Get current fuel price (public)
 */
export async function GET(request) {
  try {
    // Rate limiting for GET requests
    const ip = getClientIp(request);
    const rateLimitResult = checkRateLimit(`get-price-${ip}`, 30, 60000);
    
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      );
    }

    await connectDB();

    const fuelPrice = await FuelPrice.findOne().sort({ updatedAt: -1 });

    if (!fuelPrice) {
      return NextResponse.json(
        { error: 'Fuel price not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { price: fuelPrice.price },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching fuel price:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/fuel-price
 * Update fuel price (protected - admin only)
 */
export async function PUT(request) {
  try {
    // Check authentication
    const user = await getUserFromRequest(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Rate limiting for updates
    const rateLimitResult = checkRateLimit(`update-price-${user.userId}`, 10, 60000);
    
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many update requests' },
        { status: 429 }
      );
    }

    const body = await request.json();
    
    // Sanitize input
    const sanitizedBody = {
      price: sanitizeInput(body.price),
    };

    // Validate input
    const validationResult = fuelPriceSchema.safeParse(sanitizedBody);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validationResult.error.errors },
        { status: 400 }
      );
    }

    const { price } = validationResult.data;

    await connectDB();

    // Update or create fuel price
    const updatedPrice = await FuelPrice.findOneAndUpdate(
      {},
      { price },
      { new: true, upsert: true }
    );

    // Revalidate homepage to show new price immediately
    revalidatePath('/');

    return NextResponse.json(
      { success: true, price: updatedPrice.price },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating fuel price:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


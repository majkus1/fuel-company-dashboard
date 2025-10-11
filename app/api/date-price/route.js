// app/api/date-price/route.js
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import connectDB from '@/lib/mongodb';
import DatePrice from '@/lib/models/DatePrice';
import { getUserFromRequest } from '@/lib/auth';
import { datePriceSchema, sanitizeInput } from '@/lib/validation';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';

/**
 * GET /api/date-price
 * Get current date price (public)
 */
export async function GET(request) {
  try {
    // Rate limiting
    const ip = getClientIp(request);
    const rateLimitResult = checkRateLimit(`get-date-${ip}`, 30, 60000);
    
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      );
    }

    await connectDB();

    const datePrice = await DatePrice.findOne().sort({ updatedAt: -1 });

    if (!datePrice) {
      return NextResponse.json(
        { error: 'Date price not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { datprice: datePrice.datprice },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching date price:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/date-price
 * Update date price (protected - admin only)
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

    // Rate limiting
    const rateLimitResult = checkRateLimit(`update-date-${user.userId}`, 10, 60000);
    
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many update requests' },
        { status: 429 }
      );
    }

    const body = await request.json();
    
    // Sanitize input
    const sanitizedBody = {
      datprice: sanitizeInput(body.datprice),
    };

    // Validate input
    const validationResult = datePriceSchema.safeParse(sanitizedBody);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validationResult.error.errors },
        { status: 400 }
      );
    }

    const { datprice } = validationResult.data;

    await connectDB();

    // Update or create date price
    const updatedDatePrice = await DatePrice.findOneAndUpdate(
      {},
      { datprice },
      { new: true, upsert: true }
    );

    // Revalidate homepage to show new date immediately
    revalidatePath('/');

    return NextResponse.json(
      { success: true, datprice: updatedDatePrice.datprice },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating date price:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


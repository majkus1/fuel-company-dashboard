// app/api/auth/check/route.js
import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';

/**
 * GET /api/auth/check
 * Check if user is authenticated
 */
export async function GET(request) {
  try {
    const user = await getUserFromRequest(request);
    
    if (!user) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { authenticated: true, userId: user.userId },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { authenticated: false },
      { status: 401 }
    );
  }
}


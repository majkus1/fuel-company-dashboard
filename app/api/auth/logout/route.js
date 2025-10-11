// app/api/auth/logout/route.js
import { NextResponse } from 'next/server';

/**
 * POST /api/auth/logout
 * Clear authentication cookie
 */
export async function POST(request) {
  const response = NextResponse.json(
    { success: true, message: 'Logged out successfully' },
    { status: 200 }
  );

  // Clear the auth cookie
  response.cookies.delete('auth-token');

  return response;
}


// app/api/auth/login/route.js
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';
import { createToken, comparePasswords } from '@/lib/auth';
import { loginSchema, sanitizeInput } from '@/lib/validation';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';

/**
 * POST /api/auth/login
 * Authenticate user and set httpOnly cookie
 */
export async function POST(request) {
  try {
    // Rate limiting - max 5 login attempts per minute
    const ip = getClientIp(request);
    const rateLimitResult = checkRateLimit(`login-${ip}`, 5, 60000);
    
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many login attempts. Please try again later.' },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
          }
        }
      );
    }

    const body = await request.json();
    
    // Sanitize inputs
    const sanitizedBody = {
      username: sanitizeInput(body.username),
      password: body.password, // Don't sanitize password
    };

    // Validate input
    const validationResult = loginSchema.safeParse(sanitizedBody);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validationResult.error.errors },
        { status: 400 }
      );
    }

    const { username, password } = validationResult.data;

    // Connect to database
    await connectDB();

    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    // Compare passwords
    const isPasswordValid = await comparePasswords(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    // Create JWT token
    const token = await createToken(user._id.toString());

    // Create response with httpOnly cookie
    const response = NextResponse.json(
      { success: true, message: 'Login successful' },
      { status: 200 }
    );

    // Set secure httpOnly cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


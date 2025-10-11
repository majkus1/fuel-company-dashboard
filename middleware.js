// middleware.js
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-in-production'
);

/**
 * Middleware to protect admin routes
 * This runs on Edge Runtime for better performance
 */
export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('auth-token')?.value;

    if (!token) {
      // Redirect to login if not authenticated
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      // Verify token
      await jwtVerify(token, JWT_SECRET);
      // Token is valid, allow access
      return NextResponse.next();
    } catch (error) {
      // Invalid token, redirect to login
      const response = NextResponse.redirect(new URL('/login', request.url));
      // Clear invalid cookie
      response.cookies.delete('auth-token');
      return response;
    }
  }

  // Add security headers to all responses
  const response = NextResponse.next();
  
  // Security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()'
  );
  
  return response;
}

// Configure which routes use this middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|img/).*)',
  ],
};


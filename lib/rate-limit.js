// lib/rate-limit.js

/**
 * Simple in-memory rate limiter
 * For production, consider using Redis or similar
 */
const rateLimit = new Map();

/**
 * Rate limiting middleware
 * @param {string} identifier - Usually IP address or user ID
 * @param {number} limit - Maximum number of requests
 * @param {number} windowMs - Time window in milliseconds
 */
export function checkRateLimit(identifier, limit = 10, windowMs = 60000) {
  const now = Date.now();
  const userLimit = rateLimit.get(identifier) || { count: 0, resetTime: now + windowMs };

  // Reset if window has passed
  if (now > userLimit.resetTime) {
    userLimit.count = 0;
    userLimit.resetTime = now + windowMs;
  }

  userLimit.count++;
  rateLimit.set(identifier, userLimit);

  const remaining = Math.max(0, limit - userLimit.count);
  const resetTime = Math.ceil((userLimit.resetTime - now) / 1000);

  return {
    success: userLimit.count <= limit,
    remaining,
    resetTime,
  };
}

/**
 * Get IP address from request
 */
export function getClientIp(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';
  return ip;
}

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimit.entries()) {
    if (now > value.resetTime) {
      rateLimit.delete(key);
    }
  }
}, 5 * 60 * 1000);


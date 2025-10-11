// lib/auth.js
import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-in-production'
);

/**
 * Creates a JWT token for authenticated user
 */
export async function createToken(userId) {
  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(JWT_SECRET);
  
  return token;
}

/**
 * Verifies JWT token and returns payload
 */
export async function verifyToken(token) {
  try {
    const verified = await jwtVerify(token, JWT_SECRET);
    return verified.payload;
  } catch (error) {
    return null;
  }
}

/**
 * Hashes password using bcrypt
 */
export async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

/**
 * Compares password with hashed password
 */
export async function comparePasswords(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

/**
 * Gets user from request cookies
 */
export async function getUserFromRequest(request) {
  const token = request.cookies.get('auth-token')?.value;
  
  if (!token) {
    return null;
  }
  
  const payload = await verifyToken(token);
  return payload;
}


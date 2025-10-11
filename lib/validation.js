// lib/validation.js
import { z } from 'zod';

/**
 * Login validation schema
 */
export const loginSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters').max(50),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

/**
 * Fuel price update validation schema
 */
export const fuelPriceSchema = z.object({
  price: z.string().min(1, 'Price is required').max(20),
});

/**
 * Date price update validation schema
 */
export const datePriceSchema = z.object({
  datprice: z.string().min(1, 'Date is required').max(50),
});

/**
 * Contact form validation schema
 */
export const contactFormSchema = z.object({
  email: z.string().email('Invalid email format'),
  phone: z.string().regex(/^[0-9]{9}$/, 'Phone must be exactly 9 digits'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000),
});

/**
 * Sanitize HTML input to prevent XSS
 */
export function sanitizeInput(input) {
  if (typeof input !== 'string') return input;
  
  // Remove potentially dangerous characters
  return input
    .replace(/[<>]/g, '') // Remove < and >
    .trim();
}


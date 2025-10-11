// tests/unit/validation.test.js
import { describe, it, expect } from 'vitest';
import {
  loginSchema,
  fuelPriceSchema,
  datePriceSchema,
  contactFormSchema,
  sanitizeInput,
} from '@/lib/validation';

describe('Validation Schemas', () => {
  describe('loginSchema', () => {
    it('should validate correct login data', () => {
      const validData = {
        username: 'admin',
        password: 'password123',
      };

      const result = loginSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject username shorter than 3 characters', () => {
      const invalidData = {
        username: 'ab',
        password: 'password123',
      };

      const result = loginSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should reject password shorter than 6 characters', () => {
      const invalidData = {
        username: 'admin',
        password: '12345',
      };

      const result = loginSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe('fuelPriceSchema', () => {
    it('should validate correct fuel price', () => {
      const validData = { price: '5500' };
      const result = fuelPriceSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject empty price', () => {
      const invalidData = { price: '' };
      const result = fuelPriceSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe('contactFormSchema', () => {
    it('should validate correct contact form data', () => {
      const validData = {
        email: 'test@example.com',
        phone: '123456789',
        message: 'This is a test message with more than 10 characters',
      };

      const result = contactFormSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject invalid email format', () => {
      const invalidData = {
        email: 'invalid-email',
        phone: '123456789',
        message: 'Valid message here',
      };

      const result = contactFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should reject phone number with less than 9 digits', () => {
      const invalidData = {
        email: 'test@example.com',
        phone: '12345678',
        message: 'Valid message here',
      };

      const result = contactFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should reject message shorter than 10 characters', () => {
      const invalidData = {
        email: 'test@example.com',
        phone: '123456789',
        message: 'Short',
      };

      const result = contactFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe('sanitizeInput', () => {
    it('should remove dangerous characters', () => {
      const input = '<script>alert("XSS")</script>';
      const result = sanitizeInput(input);
      expect(result).not.toContain('<');
      expect(result).not.toContain('>');
    });

    it('should trim whitespace', () => {
      const input = '  test  ';
      const result = sanitizeInput(input);
      expect(result).toBe('test');
    });

    it('should handle non-string input', () => {
      const input = 123;
      const result = sanitizeInput(input);
      expect(result).toBe(123);
    });
  });
});


// tests/unit/rate-limit.test.js
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { checkRateLimit } from '@/lib/rate-limit';

describe('Rate Limiting', () => {
  beforeEach(() => {
    // Reset rate limit state between tests
    vi.clearAllMocks();
  });

  it('should allow requests within limit', () => {
    const identifier = 'test-user-1';
    const limit = 5;

    for (let i = 0; i < 5; i++) {
      const result = checkRateLimit(identifier, limit, 60000);
      expect(result.success).toBe(true);
      expect(result.remaining).toBeGreaterThanOrEqual(0);
    }
  });

  it('should block requests exceeding limit', () => {
    const identifier = 'test-user-2';
    const limit = 3;

    // Make requests up to limit
    for (let i = 0; i < 3; i++) {
      checkRateLimit(identifier, limit, 60000);
    }

    // Next request should be blocked
    const result = checkRateLimit(identifier, limit, 60000);
    expect(result.success).toBe(false);
  });

  it('should track remaining requests correctly', () => {
    const identifier = 'test-user-3';
    const limit = 5;

    const result1 = checkRateLimit(identifier, limit, 60000);
    expect(result1.remaining).toBe(4);

    const result2 = checkRateLimit(identifier, limit, 60000);
    expect(result2.remaining).toBe(3);

    const result3 = checkRateLimit(identifier, limit, 60000);
    expect(result3.remaining).toBe(2);
  });

  it('should provide reset time', () => {
    const identifier = 'test-user-4';
    const result = checkRateLimit(identifier, 5, 60000);

    expect(result.resetTime).toBeDefined();
    expect(result.resetTime).toBeGreaterThan(0);
  });
});


// tests/integration/api-fuel-price.test.js
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock Next.js modules
vi.mock('next/server', () => ({
  NextResponse: {
    json: (data, options) => ({
      json: async () => data,
      status: options?.status || 200,
      ok: options?.status ? options.status < 400 : true,
    }),
  },
}));

// Mock revalidatePath
vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

// Mock MongoDB connection
vi.mock('@/lib/mongodb', () => ({
  default: vi.fn().mockResolvedValue(true),
}));

// Mock FuelPrice model
const mockFindOne = vi.fn(() => ({
  sort: vi.fn().mockReturnThis(),
}));
const mockFindOneAndUpdate = vi.fn();

vi.mock('@/lib/models/FuelPrice', () => ({
  default: {
    findOne: mockFindOne,
    findOneAndUpdate: mockFindOneAndUpdate,
  },
}));

// Mock auth
vi.mock('@/lib/auth', () => ({
  getUserFromRequest: vi.fn(),
}));

// Mock rate limit
vi.mock('@/lib/rate-limit', () => ({
  checkRateLimit: vi.fn(() => ({ success: true, remaining: 10, resetTime: 60 })),
  getClientIp: vi.fn(() => '127.0.0.1'),
}));

describe('Fuel Price API Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/fuel-price', () => {
    it('should return fuel price successfully', async () => {
      // Mock database response with chaining
      const mockSort = vi.fn().mockResolvedValueOnce({
        price: '5500',
        updatedAt: new Date(),
      });
      mockFindOne.mockReturnValueOnce({ sort: mockSort });

      // Import after mocks are set up
      const { GET } = await import('@/app/api/fuel-price/route');

      const mockRequest = {
        headers: new Map([['x-forwarded-for', '127.0.0.1']]),
      };

      const response = await GET(mockRequest);
      const data = await response.json();

      expect(data).toEqual({ price: '5500' });
      expect(mockFindOne).toHaveBeenCalled();
    });

    it('should return 404 when price not found', async () => {
      const mockSort = vi.fn().mockResolvedValueOnce(null);
      mockFindOne.mockReturnValueOnce({ sort: mockSort });

      const { GET } = await import('@/app/api/fuel-price/route');

      const mockRequest = {
        headers: new Map(),
      };

      const response = await GET(mockRequest);
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.error).toBe('Fuel price not found');
    });
  });

  describe('PUT /api/fuel-price', () => {
    it('should update fuel price when authenticated', async () => {
      // Mock authentication
      const { getUserFromRequest } = await import('@/lib/auth');
      getUserFromRequest.mockResolvedValueOnce({ userId: 'test-user-123' });

      // Mock database update
      mockFindOneAndUpdate.mockResolvedValueOnce({
        price: '5600',
        updatedAt: new Date(),
      });

      const { PUT } = await import('@/app/api/fuel-price/route');

      const mockRequest = {
        headers: new Map(),
        cookies: {
          get: vi.fn(() => ({ value: 'valid-token' })),
        },
        json: async () => ({ price: '5600' }),
      };

      const response = await PUT(mockRequest);
      const data = await response.json();

      expect(data.success).toBe(true);
      expect(data.price).toBe('5600');
    });

    it('should return 401 when not authenticated', async () => {
      // Mock no authentication
      const { getUserFromRequest } = await import('@/lib/auth');
      getUserFromRequest.mockResolvedValueOnce(null);

      const { PUT } = await import('@/app/api/fuel-price/route');

      const mockRequest = {
        headers: new Map(),
        cookies: {
          get: vi.fn(() => null),
        },
        json: async () => ({ price: '5600' }),
      };

      const response = await PUT(mockRequest);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.error).toBe('Unauthorized');
    });
  });
});


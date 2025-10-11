// tests/setup.js
import '@testing-library/jest-dom';
import { expect, afterEach, beforeAll } from 'vitest';
import { cleanup } from '@testing-library/react';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock environment variables for tests
beforeAll(() => {
  process.env.MONGO_URI = 'mongodb://localhost:27017/agmar_paliwa_test';
  process.env.JWT_SECRET = 'test-secret-key-for-testing-purposes-only-must-be-long-enough';
  process.env.GMAIL_USER = 'test@gmail.com';
  process.env.GMAIL_PASS = 'test-password';
  process.env.NODE_ENV = 'test';
});


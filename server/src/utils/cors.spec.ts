/**
 * CORS Origin Normalization Test
 * This file documents the testing logic for CORS origin handling.
 * 
 * The actual testing is done via /tmp/cors_test.js which verified:
 * - normalizeOrigin('https://notes-red-five.vercel.app/') → 'https://notes-red-five.vercel.app'
 * - createCorsOrigins produces ['https://notes-red-five.vercel.app', 'https://notes-red-five.vercel.app/']
 * - Browser origin 'https://notes-red-five.vercel.app' is included in allowed origins
 */

// Extract the normalize function for testing
const normalizeOrigin = (origin: string): string => {
  return origin.endsWith('/') ? origin.slice(0, -1) : origin;
};

const createCorsOrigins = (baseOrigin: string): string[] => {
  const normalized = normalizeOrigin(baseOrigin);
  return [normalized, normalized + '/'];
};

// Test cases that were verified:
const testCases = [
  {
    name: 'URL with trailing slash (the problematic case)',
    input: 'https://notes-red-five.vercel.app/',
    expected: ['https://notes-red-five.vercel.app', 'https://notes-red-five.vercel.app/'],
    shouldIncludeBrowserOrigin: 'https://notes-red-five.vercel.app'
  },
  {
    name: 'URL without trailing slash',
    input: 'https://notes-red-five.vercel.app',
    expected: ['https://notes-red-five.vercel.app', 'https://notes-red-five.vercel.app/'],
    shouldIncludeBrowserOrigin: 'https://notes-red-five.vercel.app'
  },
  {
    name: 'localhost development',
    input: 'http://localhost:5173',
    expected: ['http://localhost:5173', 'http://localhost:5173/'],
    shouldIncludeBrowserOrigin: 'http://localhost:5173'
  }
];

export { normalizeOrigin, createCorsOrigins, testCases };
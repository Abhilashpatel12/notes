import { describe, it, expect } from '@jest/globals';

// Extract the normalize function for testing
const normalizeOrigin = (origin: string): string => {
  return origin.endsWith('/') ? origin.slice(0, -1) : origin;
};

const createCorsOrigins = (baseOrigin: string): string[] => {
  const normalized = normalizeOrigin(baseOrigin);
  return [normalized, normalized + '/'];
};

describe('CORS Origin Normalization', () => {
  it('should remove trailing slash from origin', () => {
    expect(normalizeOrigin('https://example.com/')).toBe('https://example.com');
    expect(normalizeOrigin('http://localhost:3000/')).toBe('http://localhost:3000');
  });

  it('should leave origin without trailing slash unchanged', () => {
    expect(normalizeOrigin('https://example.com')).toBe('https://example.com');
    expect(normalizeOrigin('http://localhost:3000')).toBe('http://localhost:3000');
  });

  it('should create CORS origins array with both variants', () => {
    const origins = createCorsOrigins('https://example.com/');
    expect(origins).toEqual(['https://example.com', 'https://example.com/']);
  });

  it('should handle the specific production URLs', () => {
    const productionUrl = 'https://notes-red-five.vercel.app/';
    const origins = createCorsOrigins(productionUrl);
    expect(origins).toEqual([
      'https://notes-red-five.vercel.app', 
      'https://notes-red-five.vercel.app/'
    ]);
    // The browser sends 'https://notes-red-five.vercel.app' (without slash)
    expect(origins).toContain('https://notes-red-five.vercel.app');
  });
});
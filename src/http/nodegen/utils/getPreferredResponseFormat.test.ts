import { describe, it, expect } from 'vitest';
import getPreferredResponseFormat from './getPreferredResponseFormat.js';

describe('getPreferredResponseFormat', () => {
  it('should return the best matching MIME type', () => {
    const accept = 'application/json, text/html;q=0.8, */*;q=0.5';
    const mimes = ['text/html', 'application/json', 'application/xml'];
    expect(getPreferredResponseFormat(accept, mimes)).toBe('application/json');
  });

  it('should return undefined if no match is found', () => {
    const accept = 'image/png, image/jpeg';
    const mimes = ['application/json', 'text/html'];
    expect(getPreferredResponseFormat(accept, mimes)).toBeUndefined();
  });

  it('should prioritize higher q values', () => {
    const accept = 'text/html;q=0.9, application/json;q=0.8';
    const mimes = ['application/json', 'text/html'];
    expect(getPreferredResponseFormat(accept, mimes)).toBe('text/html');
  });

  it('should handle wildcard types', () => {
    const accept = 'text/*;q=0.9, application/json;q=0.8';
    const mimes = ['text/html', 'application/json'];
    expect(getPreferredResponseFormat(accept, mimes)).toBe('text/html');
  });

  it('should handle */* wildcard', () => {
    const accept = '*/*';
    const mimes = ['application/json', 'text/html'];
    expect(getPreferredResponseFormat(accept, mimes)).toBe('application/json');
  });

  it('should return undefined if accept header is empty', () => {
    const accept = '';
    const mimes = ['application/json', 'text/html'];
    expect(getPreferredResponseFormat(accept, mimes)).toBeUndefined();
  });

  it('should return undefined if mimes array is empty', () => {
    const accept = 'application/json, text/html';
    expect(getPreferredResponseFormat(accept, [])).toBeUndefined();
  });
});

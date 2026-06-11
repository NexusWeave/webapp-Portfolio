import { describe, it, expect } from 'vitest';
import { validateSemanticHTML } from './semanticValidator';

describe('Semantic HTML Validation Tests', () => {
  it('Should fail if an image is missing an alt attribute', () => {
    const badHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head><title>Test</title></head>
      <body>
        <main>
          <h1>Main Title</h1>
          <img src="test.png"> <!-- Missing alt -->
        </main>
      </body>
      </html>
    `;
    const results = validateSemanticHTML(badHtml);
    const altRule = results.find(r => r.rule === 'Images have alt attributes');
    expect(altRule?.passed).toBe(false);
  });

  it('Should pass a fully semantic HTML structure', () => {
    const goodHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head><title>Test</title></head>
      <body>
        <main>
          <h1>Main Title</h1>
          <img src="test.png" alt="A test image">
        </main>
      </body>
      </html>
    `;
    const results = validateSemanticHTML(goodHtml);
    const failures = results.filter(r => !r.passed);
    expect(failures.length).toBe(0);
  });
});

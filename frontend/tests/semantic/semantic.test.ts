import { describe, it, expect } from 'vitest';
import { validateSemanticHTML } from './semanticValidator';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function assertSemantic(html: string, testName: string) {
  const results = validateSemanticHTML(html);
  const failures = results.filter(r => !r.passed);

  if (failures.length > 0) {
    const reportPath = path.join(__dirname, '../../semantic-report.md');
    let markdown = `# Semantic HTML Validation Report - Failures\n\n`;
    markdown += `**Test Name:** ${testName}\n`;
    markdown += `**Date:** ${new Date().toISOString()}\n\n`;
    markdown += `## Failed Rules\n\n`;

    failures.forEach((failure, index) => {
      markdown += `### ${index + 1}. Rule: ${failure.rule}\n`;
      markdown += `- **Status:** Failed\n`;
      if (failure.message) {
        markdown += `- **Message:** ${failure.message}\n`;
      }
      if (failure.elements && failure.elements.length > 0) {
        markdown += `- **Violating Elements:**\n`;
        failure.elements.forEach(el => {
          markdown += `  \`\`\`html\n  ${el.trim()}\n  \`\`\`\n`;
        });
      }
      markdown += `\n`;
    });

    fs.writeFileSync(reportPath, markdown, 'utf-8');
  }

  expect(failures.length).toBe(0);
}

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
    assertSemantic(goodHtml, 'Should pass a fully semantic HTML structure');
  });
});

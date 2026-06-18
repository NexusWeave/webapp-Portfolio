// @vitest-environment node
import { describe, it, expect } from 'vitest';
import { validateSemanticHTML } from './semanticValidator';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { JSDOM } from 'jsdom';

// Polyfill DOMParser in the Node environment using JSDOM
const { window } = new JSDOM('');
global.DOMParser = window.DOMParser;
global.document = window.document;
global.window = window as unknown as Window & typeof globalThis;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PAGES_DIR = path.join(__dirname, '../../pages');

function runSemanticCheckOnPage(pagePath: string) {
  const content = fs.readFileSync(pagePath, 'utf-8');
  const isVueFile = pagePath.endsWith('.vue');
  const results = validateSemanticHTML(content, isVueFile);
  const failures = results.filter(r => !r.passed);
  const pageName = path.basename(pagePath);

  if (failures.length > 0) {
    console.log(`❌ ${pageName} failed semantic validation.`);
    failures.forEach(f => console.log(`   ⚠️ Rule: ${f.rule} - ${f.message || 'Failed'}`));
  } else {
    console.log(`✅ ${pageName} passed semantic validation.`);
  }

  return failures.length;
}

describe('Semantic HTML Validation Tests', () => {
  it('Should validate all pages in frontend/pages/', () => {
    const files = fs.readdirSync(PAGES_DIR);
    let totalFailures = 0;

    files.forEach(file => {
      const filePath = path.join(PAGES_DIR, file);
      if (fs.statSync(filePath).isFile() && (file.endsWith('.vue') || file.endsWith('.html'))) {
        totalFailures += runSemanticCheckOnPage(filePath);
      }
    });

    expect(totalFailures).toBe(0);
  });
});

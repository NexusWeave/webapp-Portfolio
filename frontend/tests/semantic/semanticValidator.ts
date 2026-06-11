import type { ValidationResult } from '../../types/test';

export function validateSemanticHTML(html: string): ValidationResult[] {
  // Use DOMParser to parse the HTML string in the jsdom environment
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const results: ValidationResult[] = [];

  // Rule 1: Page should have exactly one <h1>
  const h1s = doc.querySelectorAll('h1');
  results.push({
    rule: 'Exactly one <h1>',
    passed: h1s.length === 1,
    message: h1s.length === 0 ? 'No <h1> found.' : h1s.length > 1 ? `Found ${h1s.length} <h1> elements.` : undefined
  });

  // Rule 2: Page should have a <main> landmark
  const mains = doc.querySelectorAll('main');
  results.push({
    rule: 'Contains <main> landmark',
    passed: mains.length > 0,
    message: mains.length === 0 ? 'No <main> element found. Every page should have a <main> landmark.' : undefined
  });

  // Rule 3: All <img> tags must have an alt attribute
  const images = doc.querySelectorAll('img');
  const imagesWithoutAlt: string[] = [];
  images.forEach(img => {
    if (!img.hasAttribute('alt')) {
      imagesWithoutAlt.push(img.outerHTML);
    }
  });
  results.push({
    rule: 'Images have alt attributes',
    passed: imagesWithoutAlt.length === 0,
    message: imagesWithoutAlt.length > 0 ? `Found ${imagesWithoutAlt.length} image(s) missing alt attribute.` : undefined,
    elements: imagesWithoutAlt.length > 0 ? imagesWithoutAlt : undefined
  });

  // Rule 4: Headings should not skip levels
  const headings = Array.from(doc.querySelectorAll('h1, h2, h3, h4, h5, h6'));
  let previousLevel = 0; // 0 means no heading found yet
  let skippedLevels = false;
  const skippedDetails: string[] = [];

  headings.forEach(heading => {
    const currentLevel = parseInt(heading.tagName.substring(1), 10);
    // If it's the first heading, it should ideally be h1, but we mainly check for skipping.
    // A jump from h1 to h3 is skipping. h2 to h4 is skipping.
    if (previousLevel > 0 && currentLevel - previousLevel > 1) {
      skippedLevels = true;
      skippedDetails.push(`Skipped from h${previousLevel} to h${currentLevel}: ${heading.outerHTML}`);
    }
    previousLevel = currentLevel;
  });

  results.push({
    rule: 'Heading levels are not skipped',
    passed: !skippedLevels,
    message: skippedLevels ? 'Found skipped heading levels.' : undefined,
    elements: skippedLevels ? skippedDetails : undefined
  });

  return results;
}

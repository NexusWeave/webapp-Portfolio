import { HtmlValidate } from 'html-validate';

const htmlValidate = new HtmlValidate({
  rules: {
    // Vue components rendered as snippets without DOCTYPE/html/head/body
    'doctype-html': 'off',
    'require-sri': 'off',
    // In component testing, custom elements and stubs are common
    'unrecognized-char-ref': 'error',
    'element-permitted-content': 'off', // Individual components like <legend> or partial forms may render without surrounding <fieldset>
    'element-permitted-parent': 'off',
    'no-dup-id': 'error',
    'void-content': 'error',
    'no-deprecated-attr': 'warn',
    'element-required-attributes': 'off', // stubs/snippets might not have all context
    'close-order': 'error'
  }
});

export async function assertValidHtml(html: string): Promise<void> {
  if (!html || html.trim() === '') return;
  // Wrap in container if snippet has multiple root nodes to avoid fragment validation errors
  const wrapped = `<div>${html}</div>`;
  const report = await htmlValidate.validateString(wrapped);

  if (!report.valid) {
    const formattedErrors = report.results
      .flatMap(r => r.messages)
      .map(m => `[Line ${m.line}:${m.column}] ${m.message} (${m.ruleId})`)
      .join('\n');
    throw new Error(`HTML validation errors found:\n${formattedErrors}\n\nHTML:\n${html}`);
  }
}

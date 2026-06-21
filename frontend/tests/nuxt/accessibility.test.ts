import { describe, it, expect } from 'vitest';
import { axe, toHaveNoViolations } from 'vitest-axe';
import { mountSuspended } from '@nuxt/test-utils/runtime';

// Import the matchers and extend expect
import * as axeMatchers from 'vitest-axe/matchers';
expect.extend(axeMatchers);

// Import pages to test
import DevPage from '../../pages/dev.vue';
import IndexPage from '../../pages/index.vue';
import LogsPage from '../../pages/logs/index.vue';
import PersonalPage from '../../pages/personal.vue';

describe('Accessibility (A11y) Audits', () => {
  it('Index page has no accessibility violations', async () => {
    const wrapper = await mountSuspended(IndexPage);
    const container = document.createElement('main');
    container.appendChild(wrapper.element);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Dev page has no accessibility violations', async () => {
    const wrapper = await mountSuspended(DevPage);
    const container = document.createElement('main');
    container.appendChild(wrapper.element);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Personal page has no accessibility violations', async () => {
    const wrapper = await mountSuspended(PersonalPage);
    const container = document.createElement('main');
    container.appendChild(wrapper.element);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Logs page has no accessibility violations', async () => {
    const wrapper = await mountSuspended(LogsPage);
    const container = document.createElement('main');
    container.appendChild(wrapper.element);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

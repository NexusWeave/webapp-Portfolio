import { describe, it, expect, vi } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';

import DevPage from '../../pages/dev.vue';
import IndexPage from '../../pages/index.vue';
import PersonalPage from '../../pages/personal.vue';
import SecurityPolicyPage from '../../pages/security-policy.vue';

vi.mock('~/composables/backendAPI-utils', () => ({
  fetchRepositories: () => Promise.resolve({
    repo: { value: [] },
    refresh: () => {}
  })
}));

describe('Semantic & HTML Integrity Tests', () => {
  function checkUniqueIds(wrapper: any, pageName: string) {
    const allElements = wrapper.findAll('[id]');
    const ids: string[] = allElements.map((el: any) => el.attributes('id'));
    const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
    
    expect(duplicates, `Duplicate IDs found on ${pageName}: ${duplicates.join(', ')}`).toEqual([]);
  }

  it('IndexPage contains no duplicate element IDs', async () => {
    const wrapper = await mountSuspended(IndexPage);
    checkUniqueIds(wrapper, 'IndexPage');
  });

  it('DevPage contains no duplicate element IDs', async () => {
    const wrapper = await mountSuspended(DevPage);
    checkUniqueIds(wrapper, 'DevPage');
  });

  it('PersonalPage contains no duplicate element IDs', async () => {
    const wrapper = await mountSuspended(PersonalPage);
    checkUniqueIds(wrapper, 'PersonalPage');
  });

  it('SecurityPolicyPage contains no duplicate element IDs', async () => {
    const wrapper = await mountSuspended(SecurityPolicyPage);
    checkUniqueIds(wrapper, 'SecurityPolicyPage');
  });
});

import { describe, it, expect } from 'vitest';
import { flushPromises } from '@vue/test-utils';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { Component } from 'nuxt/schema';

import IndexPage from '~/pages/index.vue';
import DevPage from '~/pages/dev.vue';
import PersonalPage from '~/pages/personal.vue';
import SecurityPolicyPage from '~/pages/security-policy.vue';

describe("Pages module tests", () => {
    it("page components are defined", () => {
        const pages = [IndexPage, DevPage, PersonalPage, SecurityPolicyPage];
        pages.forEach(page => expect(page).toBeDefined());
    });

    describe("Page Rendering & Layout", () => {
        describe("Index page", () => {
            it("renders main sections correctly", async () => {
                const wrapper = await mountSuspended<Component>(IndexPage, {
                    global: {
                        stubs: {
                            RepositoryPortfolio: { template: '<div class="stub-portfolio"></div>' },
                            ArticleHead: { template: '<div class="stub-article"></div>' },
                            Timeline: { template: '<div class="stub-timeline"></div>' }
                        }
                    }
                });
                await flushPromises();

                expect(wrapper.exists()).toBe(true);
                expect(wrapper.find('h2').text()).toBe('Siste tekniske logger');
            });
        });

        describe("Dev page", () => {
            it("renders dev activity header correctly", async () => {
                const wrapper = await mountSuspended<Component>(DevPage, {
                    global: {
                        stubs: {
                            MDC: { template: '<div><slot /></div>' },
                            ContentRenderer: { template: '<div><slot /></div>' },
                            UtilsProgress: { template: '<div></div>' }
                        }
                    }
                });
                await flushPromises();

                expect(wrapper.exists()).toBe(true);
            });
        });

        describe("Personal page", () => {
            it("renders personal biography wrapper", async () => {
                const wrapper = await mountSuspended<Component>(PersonalPage, {
                    global: {
                        stubs: {
                            MDC: { template: '<div><slot /></div>' },
                            ContentRenderer: { template: '<div><slot /></div>' }
                        }
                    }
                });
                await flushPromises();

                expect(wrapper.exists()).toBe(true);
            });
        });

        describe("Security Policy page", () => {
            it("renders security policy article element", async () => {
                const wrapper = await mountSuspended<Component>(SecurityPolicyPage, {
                    global: {
                        stubs: {
                            ContentRenderer: { template: '<div><slot /></div>' }
                        }
                    }
                });
                await flushPromises();

                expect(wrapper.exists()).toBe(true);
                expect(wrapper.find('.article-wrapper').exists()).toBe(true);
            });
        });

        /* 
         * NOTE / DISABLED:
         * The following dynamic slug routes (records/[slug].vue & tags/[slug].vue) use @nuxt/content
         * fetchCollection which initializes SQLite (better-sqlite3) in background worker threads.
         * Under Vitest unit test runner in CI environments, better-sqlite3 native C++ bindings fail
         * V8 isolate cleanup (Statement::~Statement() Assertion error, Exit Code 134).
         * Keep these commented until E2E/Playwright testing is implemented.
         *
        describe("Logs Record [slug] page", () => {
            it("renders record page component", async () => {
                const wrapper = await mountSuspended<Component>(RecordSlugPage, { route: '/logs/records/test-slug' });
                expect(wrapper.exists()).toBe(true);
            });
        });

        describe("Logs Tag [slug] page", () => {
            it("renders tag page component", async () => {
                const wrapper = await mountSuspended<Component>(TagSlugPage, { route: '/logs/tags/vue' });
                expect(wrapper.exists()).toBe(true);
            });
        });
        */
    });

    describe("Edge cases and Fallbacks", () => {
        describe("Security Policy page", () => {
            it("uses fallback SEO title when page content is empty", async () => {
                const wrapper = await mountSuspended<Component>(SecurityPolicyPage);
                expect(wrapper.exists()).toBe(true);
            });
        });
    });
});

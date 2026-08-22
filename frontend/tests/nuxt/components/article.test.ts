
import { describe, it, expect } from 'vitest';
import { flushPromises } from '@vue/test-utils';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { dummyPostItem, dummyHeaderData, dummyBodyData, dummyPageData } from '@/tests/data/articleData';

import Head from '@/components/article/Head.vue';
import Body from '@/components/article/Body.vue';
import Page from '@/components/article/Page.vue';

describe("Article module tests", () => {
    it("components are defined", () => {
        const components = [Head, Body, Page];
        components.forEach(comp => expect(comp).toBeDefined());
    });

    describe("Renders HTML & CSS correctly", () => {
        
        describe("Head component", () => {
            it("Renders suspense correctly with HTML & classes not as post", async () => {
                const wrapper = await mountSuspended<Component>(Head, { 
                    props: { isPost: false, article: dummyPostItem }, 
                    global: { stubs: { MDC: { props: ['value'], template: '<div class="ingress-content"><slot /></div>' }, NavigationNavMenu: true } } 
                });
                await flushPromises();

                const tags: string[] = ['h2', 'p', 'time', 'section'];
                const classes: string[] = ['flex-column-align-items-center', 'blog-header', 'flex-wrap-row-align-items-center-justify-center', 'article-metadata', 'meta-date', 'ingress-content', 'nav-bar', 'read-more', 'button', 'tag-btn'];
                
                expect(wrapper.exists()).toBe(true);
                tags.forEach(tag => { const tagExists = wrapper.find(tag).exists(); expect(tagExists).toBe(true) });
                classes.forEach(cls => { const selector = `.${cls}`; const clsExists = wrapper.find(selector).exists(); expect(clsExists).toBe(true) });
            });

            it("Renders suspense correctly with classes as post", async () => {
                const wrapper = await mountSuspended<Component>(Head, { 
                    props: { isPost: true, article: dummyHeaderData }, 
                    global: { stubs: { MDC: { props: ['value'], template: '<div class="ingress-content"><slot /></div>' }, NavigationNavMenu: true } } 
                });
                await flushPromises();

                const classes: string[] = ['ingress-header', 'article-section'];
                const components: string[] = ['NavigationNavMenu', 'NavigationAnchor'];

                expect(wrapper.exists()).toBe(true);
                classes.forEach(cls => { const selector = `.${cls}`; const clsExists = wrapper.find(selector).exists(); expect(clsExists).toBe(true) });
                components.forEach(comp => { const componentExists = wrapper.findComponent({ name: comp }).exists(); if (comp != 'NavigationNavMenu') expect(componentExists).toBe(true); else expect(componentExists).toBe(false) });
            });

            it("Renders Fallback correctly with HTML & CSS", async () => {
                const wrapper = await mountSuspended<Component>(Head, { props: { isPost: false, article: dummyHeaderData } });

                const tags: string[] = ['section', 'p'];
                const classes: string[] = ['alert-info'];

                expect(wrapper.exists()).toBe(true);
                expect(wrapper.text()).toContain('Laster innlegg til logger...');
                tags.forEach(tag => { const tagExists = wrapper.find(tag).exists(); expect(tagExists).toBe(true); });
                classes.forEach(cls => { const selector = `.${cls}`; const clas = wrapper.find(selector).exists(); expect(clas).toBe(true); });
            });

            it("Truncates ingress with ellipsis (...) when !isPost and length > 350", async () => {
                const longIngress = 'A'.repeat(400);
                const articleWithLongIngress = { ...dummyPostItem, ingress: longIngress };
                let passedMdcValue = '';

                const wrapper = await mountSuspended<Component>(Head, {
                    props: { isPost: false, article: articleWithLongIngress },
                    global: {
                        stubs: {
                            MDC: {
                                props: ['value'],
                                setup(props) {
                                    passedMdcValue = props.value;
                                },
                                template: '<div class="ingress-content">{{ value }}</div>'
                            },
                            NavigationNavMenu: true
                        }
                    }
                });
                await flushPromises();

                expect(passedMdcValue.length).toBe(353);
                expect(passedMdcValue.endsWith('...')).toBe(true);
                expect(passedMdcValue).toBe('A'.repeat(350) + '...');
            });

            it("Does not truncate ingress when !isPost and length <= 350", async () => {
                const shortIngress = 'Dette er en kort ingress under 350 tegn.';
                const articleWithShortIngress = { ...dummyPostItem, ingress: shortIngress };
                let passedMdcValue = '';

                const wrapper = await mountSuspended<Component>(Head, {
                    props: { isPost: false, article: articleWithShortIngress },
                    global: {
                        stubs: {
                            MDC: {
                                props: ['value'],
                                setup(props) {
                                    passedMdcValue = props.value;
                                },
                                template: '<div class="ingress-content">{{ value }}</div>'
                            },
                            NavigationNavMenu: true
                        }
                    }
                });
                await flushPromises();

                expect(passedMdcValue).toBe(shortIngress);
                expect(passedMdcValue.endsWith('...')).toBe(false);
            });

            it("Does not truncate long ingress when isPost is true", async () => {
                const longIngress = 'A'.repeat(400);
                const articleWithLongIngress = { ...dummyHeaderData, ingress: longIngress };
                let passedMdcValue = '';

                const wrapper = await mountSuspended<Component>(Head, {
                    props: { isPost: true, article: articleWithLongIngress },
                    global: {
                        stubs: {
                            MDC: {
                                props: ['value'],
                                setup(props) {
                                    passedMdcValue = props.value;
                                },
                                template: '<div class="ingress-content">{{ value }}</div>'
                            },
                            NavigationNavMenu: true
                        }
                    }
                });
                await flushPromises();

                expect(passedMdcValue).toBe(longIngress);
                expect(passedMdcValue.length).toBe(400);
            });
        });

        describe("Body component", () => {
            it("Renders Suspense correctly with HTML & CSS", async () => {
                const wrapper = await mountSuspended<Component>(Body, { 
                    props: { data: dummyBodyData[0] }, 
                    global: { stubs: { MDC: { props: ['value'], template: '<div><slot /></div>' }, ContentRenderer: { props: ['value'], template: '<div><slot /></div>' } } } 
                });
                await flushPromises();

                const tags: string[] = ['section', 'h4'];
                const classes: string[] = ['article-section', 'flex-column', 'article-content', 'flex-column', 'article-content'];

                expect(wrapper.exists()).toBe(true);
                tags.forEach(tag => { const tagExists = wrapper.find(tag).exists(); expect(tagExists).toBe(true); });
                classes.forEach(cls => { const selector = `.${cls}`; const clas = wrapper.find(selector).exists(); expect(clas).toBe(true); });
            });

            it("Renders Suspense correctly with CTA only", async () => {
                const wrapper = await mountSuspended<Component>(Body, { 
                    props: { data: dummyBodyData[1] }, 
                    global: { stubs: { MDC: { props: ['value'], template: '<div><slot /></div>' }, ContentRenderer: { props: ['value'], template: '<div><slot /></div>' } } } 
                });
                await flushPromises();

                const classes: string[] = ['grid-container-cta'];

                expect(wrapper.exists()).toBe(true);
                classes.forEach(cls => { const selector = `.${cls}`; const clas = wrapper.find(selector).exists(); expect(clas).toBe(true); });
            });

            it("Renders Suspense correctly with media only", async () => {
                const wrapper = await mountSuspended<Component>(Body, { 
                    props: { data: dummyBodyData[2] }, 
                    global: { stubs: { MDC: { props: ['value'], template: '<div><slot /></div>' }, ContentRenderer: { props: ['value'], template: '<div><slot /></div>' } } } 
                });
                await flushPromises();

                const classes: string[] = ['grid-container-image', 'article-section'];

                expect(wrapper.exists()).toBe(true);
                classes.forEach(cls => { const selector = `.${cls}`; const clas = wrapper.find(selector).exists(); expect(clas).toBe(true); });
            });

            it("Renders Suspense correctly with minimal version only", async () => {
                const wrapper = await mountSuspended<Component>(Body, { 
                    props: { data: dummyBodyData[3] }, 
                    global: { stubs: { MDC: { props: ['value'], template: '<div><slot /></div>' }, ContentRenderer: { props: ['value'], template: '<div><slot /></div>' } } } 
                });
                await flushPromises();

                const classes: string[] = ['grid-container-content', 'article-section'];

                expect(wrapper.exists()).toBe(true);
                classes.forEach(cls => { const selector = `.${cls}`; const clas = wrapper.find(selector).exists(); expect(clas).toBe(true); });
            });

            it("Renders Fallback correctly with HTML & CSS", async () => {
                const wrapper = await mountSuspended(Body, { props: { data: dummyBodyData[0] } });

                const tags: string[] = ['section', 'p'];
                const classes: string[] = ['alert-info'];
                const text: string = "Laster innhold i loggen...";

                expect(wrapper.exists()).toBe(true);
                expect(wrapper.text()).toContain(text);
                tags.forEach(tag => { const tagExists = wrapper.find(tag).exists(); expect(tagExists).toBe(true); });
                classes.forEach(cls => { const selector = `.${cls}`; const clas = wrapper.find(selector).exists(); expect(clas).toBe(true); });
            });
        });

        describe("Page component", () => {
            it("Renders standard post correctly with HTML & CSS", async () => {
                const wrapper = await mountSuspended<Component>(Page, { 
                    props: { data: dummyPageData[0] },
                    route: { name: 'logs-records-slug', params: { slug: 'test-article' } },
                    global: { stubs: { ArticleHead: true, ArticleBody: true, NavigationButton: { template: '<button class="primary-btn"><slot /></button>' } } } 
                });
                await flushPromises();

                const components: string[] = ['ArticleHead', 'ArticleBody'];
                const classes: string[] = ['article-wrapper', 'flex-column'];
                const tags: string[] = ['article', 'header', 'section', 'button'];

                expect(wrapper.exists()).toBe(true);
                components.forEach(comp => expect(wrapper.findComponent({ name: comp }).exists()).toBe(true));
                tags.forEach(tag => { const tagExists = wrapper.find(tag).exists(); expect(tagExists).toBe(true); });
                classes.forEach(cls => { const selector = `.${cls}`; const clas = wrapper.find(selector).exists(); expect(clas).toBe(true); });
            });

            it("Renders Specialized theme page with custom tags", async () => {
                const wrapper = await mountSuspended<Component>(Page, { 
                    props: { data: dummyPageData[1] },
                    route: { name: 'logs-records-slug', params: { slug: 'test-article' } },
                    global: { stubs: { ArticleHead: true, ArticleBody: true, NavigationButton: { template: '<button class="primary-btn"><slot /></button>' } } } 
                });
                await flushPromises();

                const classes: string[] = ['custom-tag-theme'];
                const components: string[] = ['ArticleHead', 'ArticleBody'];

                expect(wrapper.exists()).toBe(true);
                components.forEach(comp => expect(wrapper.findComponent({ name: comp }).exists()).toBe(true));
                classes.forEach(cls => { const selector = `.${cls}`; const clas = wrapper.find(selector).exists(); expect(clas).toBe(true); });
            });

            it("Renders tag page correctly with classes", async () => {
                const wrapper = await mountSuspended<Component>(Page, { 
                    props: { data: dummyPageData[2] }, 
                    route: { name: 'logs-tags-slug', params: { slug: 'vue' } }, 
                    global: { stubs: { ArticleHead: true, ArticleBody: true, NavigationButton: { template: '<button class="primary-btn"><slot /></button>' } } } 
                });
                await flushPromises();

                const tags: string[] = ['button'];
                const classes: string[] = ['primary-btn'];
                const components: string[] = ['ArticleHead', 'ArticleBody'];
                
                expect(wrapper.exists()).toBe(true);
                tags.forEach(tag => { const tagExists = wrapper.find(tag).exists(); expect(tagExists).toBe(true); });
                classes.forEach(cls => { const selector = `.${cls}`; const clas = wrapper.find(selector).exists(); expect(clas).toBe(true); });
                components.forEach(comp => { if (comp != 'ArticleBody') expect(wrapper.findComponent({ name: comp }).exists()).toBe(true); else expect(wrapper.findComponent({ name: comp }).exists()).toBe(false); });
            });
        });
    });
});

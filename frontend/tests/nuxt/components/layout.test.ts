import { ref } from "vue";
import { describe, it, expect, vi } from "vitest";
import { flushPromises } from "@vue/test-utils";
import { dummyReferences } from "@/tests/data/layoutData";
import { mountSuspended, mockNuxtImport } from "@nuxt/test-utils/runtime";

import Header from "@/components/layout/Header.vue";
import Footer from "@/components/layout/Footer.vue";

mockNuxtImport('fetchCollection', () => { return vi.fn().mockResolvedValue(ref(dummyReferences)); });

describe("Layout module tests", () => {
    it("components are defined", () => {
        const components = [Header, Footer];
        components.forEach(comp => expect(comp).toBeDefined());
    });

    describe("Renders HTML & CSS correctly", () => {
        
        describe("Header component", () => {
            const tags: string[] = ['img', 'span', 'p', 'a', 'h3'];
            const text: string[] = [
                'Kristoffer Gjøsund', 
                'Forener min akademiske reise fra bygg, helse og IT. Til å skape løsninger gjennom samarbeid. For meg er utfordringer en felles reise'
            ];
            const links: string[] = [
                '/dev', '/personal', '/media/docs/CV-Kristoffer-Gjøsund.pdf', 
                'mailto:krigjo25@outlook.com', 'https://www.github.com/krigjo25', 
                'https://www.facebook.com/krigjo25', 'https://www.instagram.com/krigjo25', 
                'https://www.youtube.com/@krigjo25', 'https://www.linkedin.com/in/krigjo25'
            ];

            it("renders Header layout elements, profile info and navigation links", async () => {
                const wrapper = await mountSuspended(Header, { 
                    props: {},
                    global: {
                        stubs: {
                            ContentRenderer: { props: ['value'], template: '<div><slot /></div>' }
                        }
                    }
                });
                await flushPromises();

                expect(wrapper.exists()).toBe(true);
                tags.forEach(tag => expect(wrapper.find(tag).exists()).toBe(true));
                
                links.forEach(link => {
                    const findLink: boolean = wrapper.find(`a[href*="${link}"]`).exists();
                    expect(findLink).toBe(true);
                });

                text.forEach(txt => expect(wrapper.text()).toContain(txt));
            });
        });

        describe("Footer component", () => {
            it("renders Footer metadata, copyrights and links", async () => {
                const wrapper = await mountSuspended(Footer, { props: {} });
                const tags: string[] = ['section', 'a', 'span', 'p'];

                expect(wrapper.exists()).toBe(true);
                expect(wrapper.find('a[href*="/"]').exists()).toBe(true);
                tags.forEach(tag => expect(wrapper.find(tag).exists()).toBe(true));
                expect(wrapper.text()).toContain('All rights reserved. By');
            });
        });
    });

    describe("Environment specific behaviors", () => {
        
        describe("Footer component", () => {
            it("renders W3C HTML validator forms when NODE_ENV is development", async () => {
                vi.resetModules();
                process.env.NODE_ENV = 'development';
                vi.stubEnv('NODE_ENV', 'development');
                
                const FooterComponent = (await import("@/components/layout/Footer.vue")).default;
                const wrapper = await mountSuspended(FooterComponent, { props: {} });
                const form = wrapper.find('form[action="https://validator.w3.org/check"]');
                const inputs = [ ['name', 'fragment'], ['name', 'doctype'], ['type', 'image']];

                expect(form.exists()).toBe(true);
                inputs.forEach(([attr, val]) => { const findInput: boolean = wrapper.find(`input[${attr}='${val}']`).exists(); expect(findInput).toBe(true);});
            });
        });
    });
});
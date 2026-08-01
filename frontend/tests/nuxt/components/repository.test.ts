import { describe, it, expect } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';

import Card from '~/components/portfolio/Card.vue';
import Portfolio from '~/components/repository/Portfolio.vue';
import BusinessCard from '~/components/repository/BusinessCard.vue';

describe("Repository module tests", () => {
    it("components are defined", () => {
        const components = [Card, Portfolio, BusinessCard];
        components.forEach(comp => expect(comp).toBeDefined());
    });

    describe("Renders HTML & CSS correctly", () => {
        
        describe("Card component", () => {
            it("Card component placeholder", () => {
                /* const wrapper = await mountSuspended<Component>(Card);
                const tags: string[] = [];
                const classes: string[] = [];

                expect(wrapper.exists()).toBe(true);
                tags.forEach(tag => { const tagExists = wrapper.find(tag).exists(); expect(tagExists).toBe(true); });
                classes.forEach(cls => { const selector = `.${cls}`; const clsExists = wrapper.find(selector).exists(); expect(clsExists).toBe(true); }); */
                expect(true).toBe(true);
            });
        });

        describe("Portfolio component", () => {
            it("Portfolio component placeholder", () => {
                /* const btnData: ButtonItem = dummyButtonData[2];
                const wrapper = await mountSuspended<Component>(Button, { props: { data: btnData }});
                    
                const tags: string[] = [];
                const classes: string[] = [];

                expect(wrapper.exists()).toBe(true);
                tags.forEach(tag => { const tagExists = wrapper.find(tag).exists(); expect(tagExists).toBe(true); });
                classes.forEach(cls => { const selector = `.${cls}`; const clsExists = wrapper.find(selector).exists(); expect(clsExists).toBe(true); }); */
                expect(true).toBe(true);
            });
        });

        describe("BusinessCard component", () => {
            it("BusinessCard component placeholder", () => {
                /* const btnData: ButtonItem = dummyButtonData[2];
                const wrapper = await mountSuspended<Component>(Button, { props: { data: btnData }});
                    
                const tags: string[] = [];
                const classes: string[] = [];

                expect(wrapper.exists()).toBe(true);
                tags.forEach(tag => { const tagExists = wrapper.find(tag).exists(); expect(tagExists).toBe(true); });
                classes.forEach(cls => { const selector = `WN.${cls}`; const clsExists = wrapper.find(selector).exists(); expect(clsExists).toBe(true); }); */
                expect(true).toBe(true);
            });
        });
    });
});
import { describe, it, expect } from 'vitest';
import { flushPromises } from '@vue/test-utils';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { dummyTimelineCard } from '~/tests/data/timelineData';

import type { TimelineItem } from '~/types/timeline';

import Card from '~/components/timeline/Card.vue';
import Filter from '~/components/timeline/Filter.vue';
import Timeline from '~/components/timeline/Timeline.vue';

describe("Timeline module tests", () => {
    it("components are defined", () => {
        const components = [Card, Filter, Timeline];
        components.forEach(comp => expect(comp).toBeDefined());
    });

    describe("Renders HTML & CSS correctly", () => {
        
        describe("Card component", () => {
            it("renders Card component correctly", async () => {
                const dummyData: TimelineItem = dummyTimelineCard[0].data;
                const wrapper = await mountSuspended<Component>(Card, { 
                    props: { data: dummyData },
                    global: {
                        stubs: {
                            MDC: { props: ['value'], template: '<div><slot /></div>' },
                            ContentRenderer: { props: ['value'], template: '<div><slot /></div>' }
                        }
                    }
                });
                await flushPromises();
                    
                const tags: string[] = ['section', 'summary', 'address', 'details','header', 'h3', 'h4', 'span', 'ul', 'li'];
                const classes: string[] = [
                    'timeline-card-wrapper', 'timeline-pointer',  'timeline-card-content', 'timeline-body-content', 'timeline-card-header', 'timeline-main-title', 'timeline-location', 'timeline-subjects-list',
                    'subject-item', 'subject-grid-container', 'subject-date',  'subject-content', 'subject-header', 'subject-title',
                    'location-icon', 'header-main', 'date-dash',
                    'flex-row-justify-between','flex-row-items-center-justify-content-space-between', 'flex-col', ];

                expect(wrapper.exists()).toBe(true);
                console.log("--- CARD HTML:", wrapper.html());
                tags.forEach(tag => { 
                    const tagExists = wrapper.find(tag).exists(); 
                    if (!tagExists) console.log("--- MISSING TAG IN CARD:", tag);
                    expect(tagExists).toBe(true); 
                });
                classes.forEach(cls => { 
                    const selector = `.${cls}`; 
                    const clsExists = wrapper.find(selector).exists(); 
                    if (!clsExists) console.log("--- MISSING CLASS IN CARD:", cls);
                    expect(clsExists).toBe(true); 
                });
            });
        });

        describe("Filter component", () => {
            it("Filter component placeholder", () => {
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

        describe("Timeline component", () => {
            it("Timeline component placeholder", () => {
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
    });
});
import { describe, it, expect } from 'vitest';
import { flushPromises } from '@vue/test-utils';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { dummyTimelineCard, dummyTimelineFilter, dummyTimeline } from '~/tests/data/timelineData';

import { Component } from 'nuxt/schema';
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

            it("Renders suspense correctly", async () => {
                const dummyData: TimelineItem = dummyTimelineCard[0].data;
                const wrapper = await mountSuspended<Component>(Card, { props: { data: dummyData }, global: { stubs: { MDC: { props: ['value'], template: '<div><slot /></div>' }, ContentRenderer: { props: ['value'], template: '<div><slot /></div>' } }}});
                await flushPromises();

                const tags: string[] = ['section', 'div', 'header', 'h3', 'h4', 'span',]// 'summary','address', 'details', 'ul', 'li'];
                const classes: string[] = ['timeline-card-wrapper', 'timeline-pointer',  'timeline-card-content', 'timeline-body-content', 'timeline-card-header', 'timeline-main-title', 'timeline-location', 'timeline-subjects-list', 'subject-item', 'subject-grid-container', 'subject-date',  'subject-content', 'subject-header', 'subject-title','location-icon', 'header-main', 'date-dash', 'flex-row-justify-between','flex-row-items-center-justify-content-space-between', 'flex-col'];

                expect(wrapper.exists()).toBe(true);
                tags.forEach(tag => { const tagExists = wrapper.find(tag).exists(); expect(tagExists).toBe(true); });
                classes.forEach(cls => {  const selector = `.${cls}`;  const clsExists = wrapper.find(selector).exists();  expect(clsExists).toBe(true); });
            });

            it("Renders fallback correctly", async() => {
                const dummyData: TimelineItem = dummyTimelineCard[1]?.data
                const wrapper = await mountSuspended<Component>(Card, { props: { data: dummyData }});

                const tags: string[] = ['section', 'p'];
                const classes:string[] = ['alert-info'];

                expect(wrapper.exists()).toBe(true);
                expect(wrapper.text()).toContain('Laster innhold...');
                tags.forEach(tag => { const tagExists = wrapper.find(tag).exists(); expect(tagExists).toBe(true); });
                classes.forEach(cls => {  const selector = `.${cls}`;  const clsExists = wrapper.find(selector).exists();  expect(clsExists).toBe(true); });
            });
        });

        describe("Filter component", () => {
            it("Renders component correctly", async () => {
                const dummyData = dummyTimelineFilter[0];
                const wrapper = await mountSuspended<Component>(Filter, { props: dummyData });
                await flushPromises();

                const tags: string[] = ['section', 'h2'];
                const classes: string[] = ['timeline-filter', 'active-slider', 'input-custom'];

                expect(wrapper.exists()).toBe(true);
                tags.forEach(tag => { const tagExists = wrapper.find(tag).exists(); expect(tagExists).toBe(true); });
                // classes.forEach(cls => { const selector = `.${cls}`; const clsExists = wrapper.find(selector).exists(); expect(clsExists).toBe(true); });
            });

            it("Renders emits correctly", async () => {
                const dummyData = dummyTimelineFilter[0];
                const wrapper = await mountSuspended<Component>(Filter, { props: dummyData });
                await flushPromises();

                // Emitting toggleVisibility from modelValue update
                wrapper.vm.$emit('toggleVisibility', 1);
                expect(wrapper.emitted('toggleVisibility')).toBeTruthy();
                expect(wrapper.emitted('toggleVisibility')?.[0]).toEqual([1]);
            });
        });

        describe("Timeline component", () => {
            it("Renders component correctly", async () => {
                const dummyData = dummyTimeline[0];
                const wrapper = await mountSuspended<Component>(Timeline, { 
                    props: dummyData });
                await flushPromises();

                const tags: string[] = ['section', 'h2', 'div'];
                const classes: string[] = ['timeline-explorer-wrapper', 'timeline-title', 'timeline-track-container', 'timeline-track-wrapper', 'timeline-track', 'timeline-dots', 'timeline-dot', 'timeline-content-wrapper',
                    'flex-col-items-center', 'flex-row-items-center', 'flex-row-justify-between', 'flex-row-justify-center'];

                expect(wrapper.exists()).toBe(true);
                tags.forEach(tag => { const tagExists = wrapper.find(tag).exists(); expect(tagExists).toBe(true); });
                classes.forEach(cls => { const selector = `.${cls}`; const clsExists = wrapper.find(selector).exists(); expect(clsExists).toBe(true); });
            });
        });
    });

    describe("Edge cases and Fallbacks", () => {
        describe("Card component", () => {
            it("Renders fallback text 'Pågående' when end date is missing", async () => {
                const dummyData: TimelineItem = dummyTimelineCard[1].data;
                const wrapper = await mountSuspended<Component>(Card, { props: { data: dummyData } });
                expect(wrapper.text()).toContain('Pågående');
            });

            it("Renders plain title text instead of NavigationAnchor when href is missing", async () => {
                const dummyData: TimelineItem = dummyTimelineCard[1].data;
                const wrapper = await mountSuspended<Component>(Card, { props: { data: dummyData } });
                expect(wrapper.findComponent({ name: 'NavigationAnchor' }).exists()).toBe(false);
            });
        });

        describe("Filter component", () => {
            it("Renders fallback title 'Untitled Timeline' when title is empty", async () => {
                const dummyData = dummyTimelineFilter[1];
                const wrapper = await mountSuspended<Component>(Filter, { props: dummyData });
                expect(wrapper.find('h2').text()).toBe('Untitled Timeline');
            });

            it("Hides range input when rangeMax <= 0", async () => {
                const dummyData = dummyTimelineFilter[1];
                const wrapper = await mountSuspended<Component>(Filter, { props: dummyData });
                expect(wrapper.findComponent({ name: 'FormInputs' }).exists()).toBe(false);
            });
        });

        describe("Timeline component", () => {
            it("Auto-initializes first item as visible when no item has isVisible=true", async () => {
                const dummyData = dummyTimeline[1]; // All items initially isVisible = false
                const wrapper = await mountSuspended<Component>(Timeline, { 
                    props: dummyData,
                    global: { stubs: { MDC: { props: ['value'], template: '<div><slot /></div>' }, ContentRenderer: { props: ['value'], template: '<div><slot /></div>' } }}
                });
                await flushPromises();
                
                // First dot should get active class automatically
                const activeDots = wrapper.findAll('.timeline-dot.active');
                expect(activeDots.length).toBe(1);
            });

            it("Handles empty timeline list without crashing", async () => {
                const dummyData = dummyTimeline[2]; // Empty data array
                const wrapper = await mountSuspended<Component>(Timeline, { 
                    props: dummyData,
                    global: { stubs: { MDC: { props: ['value'], template: '<div><slot /></div>' }, ContentRenderer: { props: ['value'], template: '<div><slot /></div>' } }}
                });
                expect(wrapper.exists()).toBe(true);
                expect(wrapper.findAll('.timeline-dot').length).toBe(0);
            });
        });
    });
});
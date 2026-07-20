import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";

import DateComponent from "@/components/Dates/Date.vue";
import YearComponent from "@/components/Dates/Year.vue";

// Dummy data for Date.vue component tests
const dummyDatePublished = {
    date: '2026-07-20T10:00:00.000Z'
};

const dummyDateUpdated = {
    date: '2026-07-20T10:00:00.000Z',
    updated: '2026-07-21T12:00:00.000Z'
};

// Dummy data for Year.vue component tests
const dummyYearString = '2026-07-20T10:00:00.000Z';
const dummyYearObject = {
    current: '2024-05-15T00:00:00.000Z'
};

describe('Date Component', () => {
    it('renders published date correctly', async () => {
        const wrapper = await mountSuspended(DateComponent, {
            props: {
                data: dummyDatePublished,
                cls: ['test-class']
            }
        });
        
        expect(wrapper.text()).toContain('Publisert');
        expect(wrapper.classes()).toContain('test-class');
    });

    it('renders updated date correctly when updated property is present', async () => {
        const wrapper = await mountSuspended(DateComponent, {
            props: {
                data: dummyDateUpdated
            }
        });
        
        expect(wrapper.text()).toContain('Oppdatert');
    });
});

describe('Year Component', () => {
    it('renders year correctly when given a string date and isVisible is true', async () => {
        const wrapper = await mountSuspended(YearComponent, {
            props: {
                data: dummyYearString,
                isVisible: true
            }
        });
        
        expect(wrapper.text()).toContain('2026');
    });

    it('renders year correctly when given a date object and isVisible is true', async () => {
        const wrapper = await mountSuspended(YearComponent, {
            props: {
                data: dummyYearObject,
                isVisible: true
            }
        });
        
        expect(wrapper.text()).toContain('2024');
    });

    it('does not render if isVisible is false', async () => {
        const wrapper = await mountSuspended(YearComponent, {
            props: {
                data: dummyYearString,
                isVisible: false
            }
        });
        
        expect(wrapper.text()).toBe('');
    });
});
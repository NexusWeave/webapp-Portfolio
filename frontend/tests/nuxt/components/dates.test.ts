import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { DateItem } from "@/types/date";

import DateComponent from "@/components/Dates/Date.vue";
import YearComponent from "@/components/Dates/Year.vue";

import { dummyDatePublished, dummyDateUpdated, dummyYearString, dummyYearObject } from "@/tests/data/dateData";

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
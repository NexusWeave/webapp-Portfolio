import { describe, it, expect } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import Announcements from '~/components/utils/Announcements.vue';
import Progress from '~/components/utils/Progress.vue';

describe("Utils Components tests", () => {
    describe("Announcements component", () => {
        it("renders default announcement message when data is null", async () => {
            const wrapper = await mountSuspended(Announcements);
            expect(wrapper.exists()).toBe(true);
            expect(wrapper.find('h2.msg').exists()).toBe(true);
            expect(wrapper.find('h2.msg').text()).toBe("Certified Specializations / Diplomas");
        });
    });

    describe("Progress component", () => {
        it("renders progress label, bytes, and progress bar with default max", async () => {
            const propsData = {
                data: {
                    label: 'TypeScript',
                    bytes: 5000,
                    type: 'bytes'
                },
                cls: ['ts-progress']
            };

            const wrapper = await mountSuspended(Progress, { props: propsData });
            expect(wrapper.exists()).toBe(true);
            expect(wrapper.find('h3').text()).toBe('TypeScript');
            expect(wrapper.find('span').text()).toContain('5000 bytes');
            
            const progress = wrapper.find('progress');
            expect(progress.exists()).toBe(true);
            expect(progress.attributes('max')).toBe('10240'); // Default max 1024 * 10
            expect(progress.classes()).toContain('ts-progress');
        });

        it("renders progress bar with custom max and original value", async () => {
            const propsData = {
                data: {
                    label: 'Python',
                    bytes: 2000,
                    type: 'KB',
                    original: 8000
                },
                max: 20000
            };

            const wrapper = await mountSuspended(Progress, { props: propsData });
            const progress = wrapper.find('progress');
            expect(progress.attributes('max')).toBe('20000');
        });
    });
});
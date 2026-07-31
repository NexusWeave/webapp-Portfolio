import { describe, it, expect } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import type { Component } from 'vue';
import type { InputField, FormItem } from '@/types/forms';

import { dummyFormData, dummyInputsData } from '@/tests/data/formData';

import Form from '@/components/form/Form.vue';
import Inputs from '@/components/form/inputs.vue';

describe('Webpage forms', () => {
    it("component form should be defined", () => {
        expect(Form).toBeDefined();
        expect(Inputs).toBeDefined();
    });

    it("Renders full form correctly with HTML & CSS", async () => {
        const formData: FormItem = dummyFormData[0];
        const wrapper = await mountSuspended<Component>(Form, { props: { data: formData } });

        const tags: string[] = ['form', 'legend', 'section', 'label', 'input', 'select', 'option', 'textarea', 'datalist', 'output'];
        const classes: string[] = ['section-title'];

        expect(wrapper.exists()).toBe(true);
        tags.forEach(tag => {
            const tagExists = wrapper.find(tag).exists();
            expect(tagExists).toBe(true);
        });
        classes.forEach(cls => {
            const selector = `.${cls}`;
            const clsExists = wrapper.find(selector).exists();
            expect(clsExists).toBe(true);
        });
    });

    it("Renders input component with type definitions and attributes", async () => {
        const inputData: InputField = dummyInputsData[0];
        const wrapper = await mountSuspended<Component>(Inputs, { props: { data: inputData } });

        expect(wrapper.exists()).toBe(true);
        expect(wrapper.find('label').exists()).toBe(true);
        expect(wrapper.find('input').exists()).toBe(true);
    });
});
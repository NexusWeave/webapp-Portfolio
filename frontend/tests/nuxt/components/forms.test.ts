import { describe, it, expect } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { 
    dummyFormData, 
    dummyInputsData, 
    dummyDatalistData, 
    dummyOutputData, 
    dummySelectionData, 
    dummySelectOptions, 
    dummyTextareaData 
} from '@/tests/data/formData';

import type { Component } from 'vue';
import type { InputField, FormItem } from '@/types/form';

import Form from '@/components/form/Form.vue';
import Inputs from '@/components/form/inputs.vue';
import FormLabel from '@/components/form/label.vue';
import FormDatalist from '@/components/form/datalist.vue';
import FormOutput from '@/components/form/output.vue';
import FormSelection from '@/components/form/selection.vue';
import FormTextarea from '@/components/form/textarea.vue';

describe("Form tests", () => {
    it("component form should be defined", () => {
        expect(Form).toBeDefined();
        expect(Inputs).toBeDefined();
        expect(FormLabel).toBeDefined();
        expect(FormDatalist).toBeDefined();
        expect(FormOutput).toBeDefined();
        expect(FormSelection).toBeDefined();
        expect(FormTextarea).toBeDefined();
    });

    it("Renders full form correctly with HTML & CSS", async () => {
        const formData: FormItem = dummyFormData[0];
        const wrapper = await mountSuspended<Component>(Form, { props: { data: formData } });

        const classes: string[] = ['section-title'];
        const tags: string[] = ['form', 'legend', 'section', 'label', 'input', 'select', 'option', 'textarea', 'datalist', 'output'];

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
});

describe("Inputs tests", () => {
    it("Renders input component with type definitions and attributes", async () => {
        const inputData: InputField = dummyInputsData[0];
        const wrapper = await mountSuspended<Component>(Inputs, { props: { data: inputData } });

        expect(wrapper.exists()).toBe(true);
        expect(wrapper.find('label').exists()).toBe(true);
        expect(wrapper.find('input').exists()).toBe(true);

        // Test v-model emission
        await wrapper.find('input').setValue('New Name');
        expect(wrapper.emitted('update:modelValue')).toBeTruthy();
        expect(wrapper.emitted('update:modelValue')![0]).toEqual(['New Name']);
    });
});

describe("FormLabel tests", () => {
    it("Renders label component correctly", async () => {
        const wrapper = await mountSuspended<Component>(FormLabel, {
            props: { data: { name: 'test-name', label: 'Test Label' } }
        });
        expect(wrapper.exists()).toBe(true);
        expect(wrapper.find('label').exists()).toBe(true);
        expect(wrapper.find('label').attributes('for')).toBe('test-name');
        expect(wrapper.text()).toContain('Test Label');
    });
});

describe("FormDatalist tests", () => {
    it("Renders datalist component correctly", async () => {
        const wrapper = await mountSuspended<Component>(FormDatalist, {
            props: { data: dummyDatalistData, modelValue: 'val-1' }
        });
        expect(wrapper.exists()).toBe(true);
        expect(wrapper.find('label').exists()).toBe(true);
        expect(wrapper.find('input').exists()).toBe(true);
        expect(wrapper.find('input').attributes('list')).toBe('options-list');
        expect(wrapper.find('datalist').exists()).toBe(true);
        expect(wrapper.find('datalist').attributes('id')).toBe('options-list');
        expect(wrapper.findAll('option').length).toBe(2);

        // Test v-model emission
        await wrapper.find('input').setValue('val-2');
        expect(wrapper.emitted('update:modelValue')).toBeTruthy();
        expect(wrapper.emitted('update:modelValue')![0]).toEqual(['val-2']);
    });
});

describe("FormOutput tests", () => {
    it("Renders output component correctly", async () => {
        const wrapper = await mountSuspended<Component>(FormOutput, {
            props: { data: dummyOutputData, value: 'Result Value' }
        });
        expect(wrapper.exists()).toBe(true);
        expect(wrapper.find('label').exists()).toBe(true);
        expect(wrapper.find('output').exists()).toBe(true);
        expect(wrapper.find('output').attributes('for')).toBe('field-id');
        expect(wrapper.find('output').text()).toBe('Result Value');
    });
});

describe("FormSelection tests", () => {
    it("Renders selection component correctly", async () => {
        const wrapper = await mountSuspended<Component>(FormSelection, {
            props: { data: dummySelectionData, options: dummySelectOptions, modelValue: 'opt-2' }
        });
        expect(wrapper.exists()).toBe(true);
        expect(wrapper.find('label').exists()).toBe(true);
        expect(wrapper.find('select').exists()).toBe(true);
        expect(wrapper.findAll('option').length).toBe(2);
        expect((wrapper.find('select').element as HTMLSelectElement).value).toBe('opt-2');

        // Test v-model emission
        await wrapper.find('select').setValue('opt-1');
        expect(wrapper.emitted('update:modelValue')).toBeTruthy();
        expect(wrapper.emitted('update:modelValue')![0]).toEqual(['opt-1']);
    });
});

describe("FormTextarea tests", () => {
    it("Renders textarea component correctly", async () => {
        const wrapper = await mountSuspended<Component>(FormTextarea, {
            props: { data: dummyTextareaData, modelValue: 'Initial Content' }
        });
        expect(wrapper.exists()).toBe(true);
        expect(wrapper.find('label').exists()).toBe(true);
        expect(wrapper.find('textarea').exists()).toBe(true);
        expect(wrapper.find('textarea').attributes('placeholder')).toBe('Type here...');
        expect((wrapper.find('textarea').element as HTMLTextAreaElement).value).toBe('Initial Content');

        await wrapper.find('textarea').setValue('Updated Content');
        expect(wrapper.emitted('update:modelValue')).toBeTruthy();
        expect(wrapper.emitted('update:modelValue')![0]).toEqual(['Updated Content']);
    });
});

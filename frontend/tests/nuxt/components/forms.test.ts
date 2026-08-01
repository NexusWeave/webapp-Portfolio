import { describe, it, expect } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { dummyFormData, dummyInputsData, dummyDatalistData, dummyOutputData, dummySelectionData, dummySelectOptions, dummyTextareaData } from '@/tests/data/formData';

import type { Component } from 'vue';
import type { InputField, FormItem } from '@/types/form';

import Form from '@/components/form/Form.vue';
import Inputs from '@/components/form/inputs.vue';
import FormLabel from '@/components/form/label.vue';
import FormOutput from '@/components/form/output.vue';
import FormDatalist from '@/components/form/datalist.vue';
import FormTextarea from '@/components/form/textarea.vue';
import FormSelection from '@/components/form/selection.vue';


describe("Form module tests", () => {
    it("components are defined", () => {
        const components = [Form, Inputs, FormLabel, FormDatalist, FormOutput, FormSelection, FormTextarea];
        components.forEach(comp => expect(comp).toBeDefined());
    });

    describe("Renders HTML & CSS correctly", () => {
        
        describe("Form component", () => {
            it("renders full form layout with all controls", async () => {
                const formData: FormItem = dummyFormData[0];
                const wrapper = await mountSuspended<Component>(Form, { props: { data: formData } });
                const tags:string [] = ['form', 'legend', 'section', '.section-title']

                expect(wrapper.exists()).toBe(true);
                tags.forEach(tag => { const tagExists = wrapper.find(tag).exists(); expect(tagExists).toBe(true) })
            });
        });

        describe("Inputs component", () => {
            it("renders label and input fields", async () => {
                const inputData: InputField = dummyInputsData[0];
                const wrapper = await mountSuspended<Component>(Inputs, { props: { data: inputData } });

                expect(wrapper.exists()).toBe(true);
                expect(wrapper.find('label').exists()).toBe(true);
                expect(wrapper.find('input').exists()).toBe(true);
            });
        });

        describe("FormLabel component", () => {
            it("renders label correctly with attributes", async () => {
                const wrapper = await mountSuspended<Component>(FormLabel, {
                    props: { data: { name: 'test-name', label: 'Test Label' } }
                });
                expect(wrapper.exists()).toBe(true);
                expect(wrapper.find('label').exists()).toBe(true);
                expect(wrapper.find('label').attributes('for')).toBe('test-name');
                expect(wrapper.text()).toContain('Test Label');
            });
        });

        describe("FormDatalist component", () => {
            it("renders datalist controls and list elements", async () => {
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
            });
        });

        describe("FormOutput component", () => {
            it("renders output container and text", async () => {
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

        describe("FormSelection component", () => {
            it("renders select dropdown and option lists", async () => {
                const wrapper = await mountSuspended<Component>(FormSelection, {
                    props: { data: dummySelectionData, options: dummySelectOptions, modelValue: 'opt-2' }
                });
                expect(wrapper.exists()).toBe(true);
                expect(wrapper.find('label').exists()).toBe(true);
                expect(wrapper.find('select').exists()).toBe(true);
                expect(wrapper.findAll('option').length).toBe(2);
                expect((wrapper.find('select').element as HTMLSelectElement).value).toBe('opt-2');
            });
        });

        describe("FormTextarea component", () => {
            it("renders textarea input with placeholder", async () => {
                const wrapper = await mountSuspended<Component>(FormTextarea, {
                    props: { data: dummyTextareaData, modelValue: 'Initial Content' }
                });
                expect(wrapper.exists()).toBe(true);
                expect(wrapper.find('label').exists()).toBe(true);
                expect(wrapper.find('textarea').exists()).toBe(true);
                expect(wrapper.find('textarea').attributes('placeholder')).toBe('Type here...');
                expect((wrapper.find('textarea').element as HTMLTextAreaElement).value).toBe('Initial Content');
            });
        });
    });

    describe("User interactions and state logic", () => {
        
        describe("Inputs component", () => {
            it("emits update:modelValue on text entry", async () => {
                const inputData: InputField = dummyInputsData[0];
                const wrapper = await mountSuspended<Component>(Inputs, { props: { data: inputData } });

                await wrapper.find('input').setValue('New Name');
                expect(wrapper.emitted('update:modelValue')).toBeTruthy();
                expect(wrapper.emitted('update:modelValue')![0]).toEqual(['New Name']);
            });
        });

        describe("FormDatalist component", () => {
            it("emits update:modelValue on list selection", async () => {
                const wrapper = await mountSuspended<Component>(FormDatalist, {
                    props: { data: dummyDatalistData, modelValue: 'val-1' }
                });

                await wrapper.find('input').setValue('val-2');
                expect(wrapper.emitted('update:modelValue')).toBeTruthy();
                expect(wrapper.emitted('update:modelValue')![0]).toEqual(['val-2']);
            });
        });

        describe("FormSelection component", () => {
            it("emits update:modelValue on dropdown change", async () => {
                const wrapper = await mountSuspended<Component>(FormSelection, {
                    props: { data: dummySelectionData, options: dummySelectOptions, modelValue: 'opt-2' }
                });

                await wrapper.find('select').setValue('opt-1');
                expect(wrapper.emitted('update:modelValue')).toBeTruthy();
                expect(wrapper.emitted('update:modelValue')![0]).toEqual(['opt-1']);
            });
        });

        describe("FormTextarea component", () => {
            it("emits update:modelValue on textarea entry", async () => {
                const wrapper = await mountSuspended<Component>(FormTextarea, {
                    props: { data: dummyTextareaData, modelValue: 'Initial Content' }
                });

                await wrapper.find('textarea').setValue('Updated Content');
                expect(wrapper.emitted('update:modelValue')).toBeTruthy();
                expect(wrapper.emitted('update:modelValue')![0]).toEqual(['Updated Content']);
            });
        });
    });
});

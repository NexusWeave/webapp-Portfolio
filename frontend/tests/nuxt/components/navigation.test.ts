import { describe, it, expect } from "vitest";
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { dummyButtonData, dummyAnchorData } from "@/tests/data/navigationData";

import type { FormItem as ButtonItem } from "~/types/form";
import Button from "@/components/navigation/Button.vue";
import Anchor from "@/components/navigation/Anchor.vue";
import NavMenu from "~/components/navigation/NavMenu.vue";

describe("Navigation module tests", () => {
    it("components are defined", () => {
        const components = [Button, Anchor, NavMenu];
        components.forEach(comp => expect(comp).toBeDefined());
    });

    describe("Renders HTML & CSS correctly", () => {
        
        describe("Button component", () => {
            it("renders standard button", async () => {
                const btnData: ButtonItem = dummyButtonData[0];
                const wrapper = await mountSuspended<Component>(Button, { props: { data: btnData } });
        
                expect(wrapper.exists()).toBe(true);
                expect(wrapper.find('button').exists()).toBe(true);
                expect(wrapper.find('.inline-items-justify-center').exists()).toBe(true);
            });

            it("renders button with Icon", async () => {
                const btnData: ButtonItem = dummyButtonData[1];
                const wrapper = await mountSuspended<Component>(Button, { props: { data: btnData } });
        
                expect(wrapper.exists()).toBe(true);
                expect(wrapper.find('button').exists()).toBe(true);
                expect(wrapper.find('span').exists()).toBe(true);
            });

            it("renders button with Anchor", async () => {
                const btnData: ButtonItem = dummyButtonData[2];
                const wrapper = await mountSuspended<Component>(Button, { props: { data: btnData } });
        
                expect(wrapper.exists()).toBe(true);
                expect(wrapper.find('button').exists()).toBe(true);
                expect(wrapper.find('a').exists()).toBe(true);
            });

            it("renders full button", async () => {
                const btnData: ButtonItem = dummyButtonData[3];
                const wrapper = await mountSuspended<Component>(Button, { props: { data: btnData } });
        
                expect(wrapper.exists()).toBe(true);
                expect(wrapper.find('button').exists()).toBe(true);
                expect(wrapper.find('span').exists()).toBe(true);
                expect(wrapper.find('a').exists()).toBe(true);
            });
        });

        describe("Anchor component", () => {
            it("renders anchor link correctly", async () => {
                const wrapper = await mountSuspended<Component>(Anchor, { props: { data: dummyAnchorData } });
                expect(wrapper.exists()).toBe(true);
            });
        });
    });
});
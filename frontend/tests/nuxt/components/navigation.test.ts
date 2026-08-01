import {describe, it, expect} from "vitest";
import { mountSuspended } from '@nuxt/test-utils/runtime';


import Button from "@/components/navigation/Button.vue";
import Anchor from "@/components/navigation/Anchor.vue";
import NavMenu from "~/components/navigation/NavMenu.vue";

describe("Navigation tests", async() => {
    it("Defined components", () => {
        expect(Button).toBeDefined();
        expect(Anchor).toBeDefined();
        expect(NavMenu).toBeDefined();
    });

    it("Button component renders correctly", async() => {
        const wrapper = await mountSuspended(Button, { props: { data: { label: 'Click me' } } });
        expect(wrapper.exists()).toBe(true);
    });
});
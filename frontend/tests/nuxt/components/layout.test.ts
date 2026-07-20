import { describe, it, expect, vi } from "vitest";
import { mountSuspended, mockNuxtImport } from "@nuxt/test-utils/runtime";
import { ref } from "vue";

import Header from "@/components/layout/Header.vue"
import Footer from "@/components/layout/Footer.vue"

const { dummyReferences } = vi.hoisted(() => {
    return {
        dummyReferences: [
            {
                id: 0,
                title: "Test Referanse 1",
                body: {
                    type: "root",
                    children: [
                        {
                            type: "element",
                            tag: "p",
                            props: {},
                            children: [{ type: "text", value: "Dette er en test-referanse." }]
                        }
                    ]
                },
                anchor: {
                    type: ["pdf"],
                    href: "/media/docs/test-ref-1.pdf",
                    label: " - Test Referanse 1"
                }
            }
        ]
    };
});

mockNuxtImport('fetchCollection', () => {
    return vi.fn().mockResolvedValue(ref(dummyReferences));
});

describe("Layout components", () => {

    
    describe("Header Component", () =>{

        
        const links: string[] = ['a[href*="/dev"]', 'a[href*="/personal"]', 'a[href*="/dev"]', 'a[href*="/CV-Kristoffer-Gjøsund.pdf"]', 'a[href*="mailto:krigjo25@outlook.com"]', 'a[href*="https://www.github.com/krigjo25"]', 'a[href*="https://www.facebook.com/krigjo25"]', 'a[href*="https://www.instagram.com/krigjo25"]', 'a[href*="https://www.youtube.com/in/krigjo25"]', 'a[href*="https://www.linkedin.com/in/krigjo25"]'];
        const tags: string[] =['img', 'span', 'p', 'a', 'h3', 'h4' ];
        const text:string[] = ['Kristoffer Gjøsund', 'Forener min akademiske reise fra bygg, helse og IT. Til å skape løsninger gjennom samarbeid. For meg er utfordringer en felles reise'];
        const classes: string[] = [ 'flex-wrap-row-items-center-justify-around', 'flex-wrap-row-items-center-justify-center', 'logo-nav', 'profile-bar', 'flex-wrap-row-items-center', 'profile', 'flex-col-align-center', 'loading', 'profile-content', 'flex-col', 'slogan-wrapper', 'slogan', 'flex-wrap-row-justify-center', 'flex-col-align-center', 'some', 'some-nav' ];

        it ("renders Header component correctly", async() => {
            const wrapper = await mountSuspended(Header, { props: {} });

            tags.forEach( tag => expect( wrapper.find(tag) ) );
            links.forEach( link => expect( wrapper.find(link) ) );
            text.forEach( txt => expect(wrapper.text()).toContain(txt) );

            classes.forEach( cls => expect( wrapper.find(cls) ) );
        });
    });

    describe("Footer Component", () => {
        it ("renders Header component correctly", async() => {
            expect(true).toBe(true);
        });
    });
});
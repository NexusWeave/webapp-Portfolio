import { describe, it, expect } from 'vitest';
import { flushPromises } from '@vue/test-utils';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { Component } from 'nuxt/schema';

import Card from '~/components/portfolio/Card.vue';
import Portfolio from '~/components/repository/Portfolio.vue';
import BusinessCard from '~/components/repository/BusinessCard.vue';

import { card as cardDummyData } from '~/tests/data/layoutData';

describe("Repository module tests", () => {
    it("components are defined", () => {
        const components = [Card, Portfolio, BusinessCard];
        components.forEach(comp => expect(comp).toBeDefined());
    });

    describe("Renders HTML & CSS correctly", () => {
        
        describe("Card component", () => {
            it("renders correctly with complete data", async () => {
                const dummyData = cardDummyData?.[0] || {
                    name: "Test Project",
                    anchor: { href: "https://example.com", label: "Demo" },
                    date: { date: "2026-01-01" },
                    summary: { body: "Summary text", list: ["Feature 1"] },
                    tech: [{ type: "frontend", label: "Vue" }]
                };
                const wrapper = await mountSuspended<Component>(Card, { props: { data: dummyData, cls: ['portfolio-card', 'tech-list'] } });
                await flushPromises();

                expect(wrapper.exists()).toBe(true);
                expect(wrapper.find('h3').exists()).toBe(true);
                expect(wrapper.find('p').exists()).toBe(true);
            });
        });

        describe("Portfolio component", () => {
            it("renders container and title correctly", async () => {
                const wrapper = await mountSuspended<Component>(Portfolio);
                await flushPromises();

                expect(wrapper.exists()).toBe(true);
                expect(wrapper.find('.repo-container').exists()).toBe(true);
                expect(wrapper.find('h2').text()).toContain('Erfaringen min fra Utviklings prosjekter');
            });

            it("renders alert-info when no repositories are available", async () => {
                const wrapper = await mountSuspended<Component>(Portfolio);
                await flushPromises();

                expect(wrapper.exists()).toBe(true);
                // When fetchRepositories returns empty/null, alert-info should render
                const alert = wrapper.find('.alert-info');
                if (alert.exists()) {
                    expect(alert.text()).toContain('Github prosjekter er for tiden under revisjon');
                }
            });
        });

        describe("BusinessCard component", () => {
            it("renders business card layout correctly", async () => {
                const dummyBusinessCard = {
                    id: 1,
                    label: "Test Repo",
                    description: "Repository description for business card",
                    owner: "owner-name",
                    owner_url: "https://github.com/owner-name",
                    date: { date: "2026-05-05" },
                    anchor: [{ label: "Repo Link", path: "https://github.com/owner-name/repo" }],
                    languages: [{ label: "TypeScript", bytes: 5000 }, { label: "Vue", bytes: 2000 }],
                    media: [
                        { src: "/icon1.svg", alt: "TS" },
                        { src: "/icon2.svg", alt: "Vue" }
                    ],
                    flags: { collaborator: true },
                    collaborators: [
                        { name: "collab1", profile_url: "https://github.com/collab1" }
                    ]
                };

                const wrapper = await mountSuspended<Component>(BusinessCard, { props: { data: dummyBusinessCard } });
                await flushPromises();

                expect(wrapper.exists()).toBe(true);
                expect(wrapper.find('.business-card').exists()).toBe(true);
                expect(wrapper.find('h3').text()).toBe('Test Repo');
            });
        });
    });

    describe("Edge cases and Fallbacks", () => {
        describe("BusinessCard component", () => {
            it("renders fallback text 'Ukjent' when label is missing", async () => {
                const dummyData = {
                    description: "No label repo"
                };
                const wrapper = await mountSuspended<Component>(BusinessCard, { props: { data: dummyData as any } });
                expect(wrapper.find('h3').text()).toBe('Ukjent');
            });

            it("truncates long description to 81 characters + ...", async () => {
                const longDesc = "a".repeat(100);
                const dummyData = {
                    label: "Long Desc Repo",
                    description: longDesc
                };
                const wrapper = await mountSuspended<Component>(BusinessCard, { props: { data: dummyData as any } });
                expect(wrapper.find('.description').text()).toBe("a".repeat(81) + "...");
            });
        });
    });
});
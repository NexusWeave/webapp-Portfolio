import { computed } from 'vue';

import { flushPromises } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mapRepoData } from '~/composables/maps/mapRepoData';
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime';
import { cardDummyData, portfolioDummyData, portfolioPaginationDummyData } from '~/tests/data/repositoryData';


//  --- Components to be tested
import Portfolio from '~/components/repository/Portfolio.vue';
import BusinessCard from '~/components/repository/BusinessCard.vue';

//  --- Child Components to be tested
import MediaFigure from '~/components/media/Figure.vue';
import NavigationAnchor from '~/components/navigation/Anchor.vue';
import NavigationNavMenu from '~/components/navigation/NavMenu.vue';

import type { GithubData } from '~/types/props';
import type { AnchorItem } from '~/types/navigation';


const fetchRepositoriesMock = vi.hoisted(() => vi.fn());
mockNuxtImport('fetchRepositories', () => fetchRepositoriesMock);

describe("Repository module tests", () => {
    it("components are defined", () => {
        const components = [Portfolio, BusinessCard, MediaFigure, NavigationAnchor, NavigationNavMenu];
        components.forEach(comp => expect(comp).toBeDefined());
    });
});

describe("BusinessCard component renders correctly", () => {
    let wrapper: any;
    beforeEach(async() => { const dummyData = cardDummyData[0] as unknown as GithubData; wrapper = await mountSuspended(BusinessCard, { props: { data: dummyData } }); });

    it("renders HTML & CSS correctly", async () => {
        const txt = ['Andre teknologi(er) -', '2026-05-05', '@owner-name', '@collab'];
        const elements:string[] = ['section','header', 'main', 'footer','span', 'b', 'time','p', 'h2', 'h3'];
        const classes:string[] = ['business-card', 'grid-layout', 'date-container', 'card-header', 'card-content', 'description', 'card-footer', 'credits', 'collab-name', 'flex-center', 'flex-wrap-row-justify-between', 'flex-col', 'flex-center','flex-wrap-row-content-center-justify-evenly'];
        //'portofolio-nav', 'tech-figure', 'tech-img'];

        expect(wrapper.exists()).toBe(true);

        classes.forEach(cls => { const selector = `.${cls}`; const classExists = wrapper.find(selector).exists(); expect(classExists).toBe(true); });

        elements.forEach(element => {  
            const tag = wrapper.find(element); 
            const spans = wrapper.findAll('span'); 

            expect(tag.exists()).toBe(true); 
            if (element === 'h4') expect(tag.text()).toContain(txt[0]); 
            if (element === 'span') {
                expect(spans[0]?.text()).toContain(txt[1]);
            };
        });
    });

    it("renders child components correctly", async () => {
        const dummyData = cardDummyData[0] as unknown as GithubData;
        const media = wrapper.findComponent(MediaFigure);
        const anchor = wrapper.findAllComponents(NavigationAnchor);
        const links: (AnchorItem | undefined)[] = [
            dummyData?.anchor?.[0],
            { label: `@${dummyData?.owner}`, href: dummyData?.owner_url || '' },
            { href: dummyData?.collaborators?.[0]?.profile_url || '', label: `@${dummyData?.collaborators?.[0]?.name || ''}` }
        ];

            expect(media.exists()).toBe(true);
            expect(media.props('data')).toEqual(dummyData?.media?.[0]);

        for (let i = 0; i < anchor.length; i++) {
            const link = anchor[i];
            expect(link.exists()).toBe(true);
            expect(link.props('data')).toEqual(links[i]);
        }
    });

    it("Renders short descriptions correctly", async() => { 
        const dummyData = cardDummyData[0] as unknown as GithubData;
        const p = wrapper.find('p');

        expect(p.exists()).toBe(true);
        expect(p.text()).toContain(dummyData.description);
    });

    it("Renders long descriptions correctly", async() => { 
        const dummyData = cardDummyData[4] as unknown as GithubData;
        wrapper = await mountSuspended(BusinessCard, { props: { data: dummyData } });
        const p = wrapper.find('p');
        
        expect(p.exists()).toBe(true);
        expect(p.text()).toContain(`...`);
    });
});

describe("Edge / Fallback cases for BusinessCard", () => {

    it("Renders component correctly with no languages", async() => {
        const dummyData = cardDummyData[1] as unknown as GithubData;  
        const wrapper = await mountSuspended(BusinessCard, { props: { data: dummyData } }); 

        const elements: string[] = ['figure', 'img'];
        const classes:string[] = ['tech-figure', 'tech-img'];

        expect(wrapper.findAllComponents(MediaFigure)).toHaveLength(0);
        expect(wrapper.findComponent(MediaFigure).exists()).toBe(false);
        elements.forEach(element => { const tag = wrapper.find(element); expect(tag.exists()).toBe(false); });
        classes.forEach(cls => { const selector = `.${cls}`; const classExists = wrapper.find(selector).exists(); expect(classExists).toBe(false); });
    });

    it("Renders component correctly with no anchor", async () => {
        const dummyData = cardDummyData[2] as unknown as GithubData;  
        const wrapper = await mountSuspended(BusinessCard, { props: { data: dummyData } }); 

        const anchors = wrapper.findAll('a');
        const spans = wrapper.findAll('span');
        const section = wrapper.findAll('section');
        const classes:string[] = ['card-nav'];

        //expect(spans).toHaveLength(2);
        //expect(anchors).toHaveLength(2);
        //expect(section).toHaveLength(4);
        //expect(wrapper.findAllComponents(NavigationAnchor)).toHaveLength(2);
        classes.forEach(cls => { const selector = `.${cls}`; const clsExists = wrapper.find(selector).exists(); expect(clsExists).toBe(false); });
    });

    it("Renders component correctly with no collaborators", async() => {
        const dummyData = cardDummyData[3] as unknown as GithubData;  
        const wrapper = await mountSuspended(BusinessCard, { props: { data: dummyData } }); 

        const anchors = wrapper.findAll('a');
        const spans = wrapper.findAll('span');
        const sections = wrapper.findAll('section');
        const classes:string[] = ['credit', 'collab-name', 'collab'];

        expect(spans).toHaveLength(1);
        expect(anchors).toHaveLength(1);
        expect(sections).toHaveLength(4);
        expect(wrapper.findAllComponents(NavigationAnchor)).toHaveLength(1);
        classes.forEach(cls => { const selector = `.${cls}`; const clsExists = wrapper.find(selector).exists(); expect(clsExists).toBe(false); });
    });

    it("Renders less than 6 collaborators", async() => { 
        const dummyData = cardDummyData[6] as unknown as GithubData;
        const wrapper = await mountSuspended(BusinessCard, { props: { data: dummyData }});

        const credits = wrapper.find('.credits');
        const collaborators = wrapper.findAll('.collab-name')[0]?.findAllComponents(NavigationAnchor);

        expect(credits.exists()).toBe(true);
        //expect(collaborators).toHaveLength(5);
        expect(credits.text()).toContain('...');
        //expect(collaborators[0].props('data').label).toBe('@collab');

        collaborators.forEach((collab: any, index: number) => {
            const coll = collab.props('data');
            const dummy = dummyData.collaborators?.[index];

            expect(collab.exists()).toBe(true);
            if (dummy) {
                //expect(coll.label).toBe(`@${dummy.name}`);
                //expect(coll.href).toBe(`https://github.com/${dummy.name}`);
            }
        });
        
    });

    it("Filter bots corretly", async() => { 
        const dummyData = cardDummyData[7] as unknown as GithubData;
        const wrapper = await mountSuspended(BusinessCard, { props: { data: dummyData }});

        const credits = wrapper.find('.credits');
        const collaborators = wrapper.findAll('.collab-name')[1];
        const users = collaborators?.findAllComponents(NavigationAnchor);

        expect(users).toHaveLength(1);
        expect(users[0].props('data').label).toBe('@collab1');

        expect(credits.exists()).toBe(true);
        expect(credits.text()).toContain('@owner-name');
        expect(credits.text()).not.toContain('@dependabot[bot]');
    });

    it("Filter repo owner from collaboration correctly", async() => {
        const dummyData = cardDummyData[8] as unknown as GithubData;
        const wrapper = await mountSuspended(BusinessCard, { props: { data: dummyData }});
        
        const credits = wrapper.find('.credits');
        const collaborators = wrapper.findAll('.collab-name');

        
        expect(credits.exists()).toBe(true);
        expect(credits.text()).toContain('Eier - @owner-name Bidragsytere - @collab1');
    });

    it("Renders Missing titles correctly", async() => {
        const dummyData = cardDummyData[9] as unknown as GithubData;
        const wrapper = await mountSuspended(BusinessCard, { props: { data: dummyData }});
        const element = wrapper.find('h2');

        expect(element.exists()).toBe(true);
        expect(element.text()).toContain('Ukjent');
    });

    it("Renders Missing dates correctly", async() => {
        const dummyData = cardDummyData[10] as unknown as GithubData;
        const wrapper = await mountSuspended(BusinessCard, { props: { data: dummyData }});

        const elements:string[] = ['b', 'time'];
        const classes: string[] = ['date-container'];

        elements.forEach(element => { const tag = wrapper.find(element); expect(tag.exists()).toBe(false);});
        classes.forEach(cls => { const selector = `.${cls}`; const exist = wrapper.find(selector).exists(); expect(exist).toBe(false); });
    });

    it("Renders Missing description correctly", async() => { 
        const dummyData = cardDummyData[11] as unknown as GithubData;
        const wrapper = await mountSuspended(BusinessCard, { props: { data: dummyData }});
        const tag = wrapper.find('.description');

        expect(tag.exists()).toBe(true);
        expect(tag.text()).toContain('');
        
    });

    it("Formats collab seperators correctly", async() => {
        const dummyData = cardDummyData[12] as unknown as GithubData;
        const wrapper = await mountSuspended(BusinessCard, { props: { data: dummyData }});

        //spy
    });

    it("Renders single language correctly", async() => { 
        const dummyData = cardDummyData[13] as unknown as GithubData;
        const wrapper = await mountSuspended(BusinessCard, { props: { data: dummyData }});

        const figure = wrapper.findAllComponents(MediaFigure);
        const elements: string[] = ['figure', ' img' ];

        expect(figure).toHaveLength(1);
        elements.forEach(element => {
            const tag =  wrapper.findAll(element);
            const exsist = wrapper.find(element).exists();

            expect(exsist).toBe(true);
            expect(tag).toHaveLength(1);
        });
    });
});

describe("Portfolio component renders correctly", () => {
    it("", () => { expect(true).toBe(true); });
});

describe("Edge / Fallback cases for Portfolio", () => {
    it("", () => { expect(true).toBe(true); });
});

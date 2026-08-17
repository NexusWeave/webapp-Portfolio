import { computed } from 'vue';

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime';
import { cardDummyData, portfolioDummyData, portfolioPaginationDummyData } from '~/tests/data/repositoryData';


//  --- Components to be tested
import Portfolio from '~/components/repository/Portfolio.vue';
import BusinessCard from '~/components/repository/BusinessCard.vue';

//  --- Child Components to be tested
import MediaFigure from '~/components/media/Figure.vue';
import NavigationAnchor from '~/components/navigation/Anchor.vue';
import NavigationButton from '~/components/navigation/Button.vue';
import NavigationNavMenu from '~/components/navigation/NavMenu.vue';


import type { GithubData } from '~/types/props';
import type { AnchorItem } from '~/types/navigation';


const fetchRepositoriesMock = vi.hoisted(() => vi.fn());
mockNuxtImport('fetchRepositories', () => fetchRepositoriesMock);

describe("Repository module tests", () => {
    it("components are defined", () => {
        const components = [Portfolio, BusinessCard, MediaFigure, NavigationButton, NavigationAnchor, NavigationNavMenu];
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

        expect(spans).toHaveLength(1);
        expect(anchors).toHaveLength(2);
        expect(section).toHaveLength(4);
        expect(wrapper.findAllComponents(NavigationAnchor)).toHaveLength(2);
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
        expect(collaborators).toHaveLength(1);
        expect(credits.text()).toContain('...');

        collaborators.forEach((collab: any, index: number) => { expect(collab.exists()).toBe(true); });
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
    beforeEach(async () => {
        fetchRepositoriesMock.mockResolvedValue({
            repo: ref(portfolioDummyData),
            refresh: vi.fn()
        });
    });

    it("Renders HTML & CSS correctly", async () => { 
        const wrapper = await mountSuspended(Portfolio);

        const cards = wrapper.findAllComponents(BusinessCard);
        const elements = ['section', 'h2', 'p', 'button'];
        const buttons = wrapper.findAllComponents(NavigationButton);
        const classes = ['repo-container', 'project-wrapper', 'flex-col', 'flex-wrap-row-items-center-justify-center', 'flex-wrap-row-items-center-justify-around'];

        expect(wrapper.exists()).toBe(true);
        expect(cards).toHaveLength(portfolioDummyData.length);
        expect(buttons).toHaveLength(6); // 6 filter-knapper ('Diverse', 'Backend', 'Frontend', 'Fullstack', 'Samarbeidsprosjekt', 'reset')
        elements.forEach(element => { const tag = wrapper.find(element); expect(tag.exists()).toBe(true); });
        classes.forEach(cls => { const selector = `.${cls}`; const classExits = wrapper.find(selector).exists(); expect(classExits).toBe(true); });
    });

    it("filters repositories correctly when clicking category buttons", async () => {
        const wrapper = await mountSuspended(Portfolio);
        const buttons = wrapper.findAllComponents(NavigationButton);

        // Finn Backend-knappen
        const backendBtn = buttons.find(b => b.text().includes('Backend'));
        expect(backendBtn?.exists()).toBe(true);

        // Klikk på Backend-filter
        await backendBtn?.trigger('click');

        // Sjekk at kun Backend-prosjekter vises (ID 0 & 4 har backend: true)
        const cards = wrapper.findAllComponents(BusinessCard);
        expect(cards).toHaveLength(2);

        // Klikk på reset-knappen for å vise alle igjen
        const resetBtn = buttons.find(b => b.text().includes('reset'));
        await resetBtn?.trigger('click');
        expect(wrapper.findAllComponents(BusinessCard)).toHaveLength(portfolioDummyData.length);
    });

    it("Renders Pagination logic correctly", async () => {
        // Sett opp mock til 10 elementer for å utløse 2 sider
        fetchRepositoriesMock.mockResolvedValue({
            repo: ref(portfolioPaginationDummyData),
            refresh: vi.fn()
        });

        const wrapper = await mountSuspended(Portfolio);

        // Side 1: Skal vise 9 elementer
        expect(wrapper.findAllComponents(BusinessCard)).toHaveLength(9);
        expect(wrapper.text()).toContain('Side 1 / 2');

        // Finn 'Neste'-knappen (pagineringsknapp)
        const pagButtons = wrapper.findAllComponents(NavigationButton);
        const nextBtn = pagButtons.find(b => b.text().includes('Neste'));
        expect(nextBtn?.exists()).toBe(true);

        // Klikk på 'Neste'
        await nextBtn?.trigger('click');

        // Side 2: Skal vise 1 element
        expect(wrapper.findAllComponents(BusinessCard)).toHaveLength(1);
        expect(wrapper.text()).toContain('Side 2 / 2');
    });
});

describe("Edge / Fallback cases for Portfolio", () => {
    it("Triggers fallback when repository list is empty", async () => { 
        fetchRepositoriesMock.mockResolvedValue({ 
            repo: ref([]), 
            refresh: vi.fn() 
        });

        const wrapper = await mountSuspended(Portfolio);

        const elements = ['section', 'p', 'a'];
        const classes = ['repo-container', 'alert-info', 'flex-col'];
        const cards = wrapper.findAllComponents(BusinessCard);
        const anchor = wrapper.findAllComponents(NavigationAnchor);

        expect(anchor).toHaveLength(1);
        expect(wrapper.exists()).toBe(true);
        expect(cards).toHaveLength(0);
        expect(wrapper.find('.project-wrapper').exists()).toBe(false);
        elements.forEach(element => { const tag = wrapper.find(element); expect(tag.exists()).toBe(true); });
        classes.forEach(cls => { const selector = `.${cls}`; const classExits = wrapper.find(selector).exists(); expect(classExits).toBe(true); });
    });

    it("hides filter header when there are not multiple active categories", async () => {
        // Kun 1 backend prosjekt uten samarbeidspartnere
        const singleRepo = {
            id: 0,
            repo_id: 1000,
            label: 'Single Repo',
            owner: 'krigjo25',
            flags: { backend: true },
            collaborators: []
        };

        fetchRepositoriesMock.mockResolvedValue({
            repo: ref([singleRepo]),
            refresh: vi.fn()
        });

        const wrapper = await mountSuspended(Portfolio);

        // hasMultipleCategories blir false, så overskriften 'Filtrer prosjekter etter type:' skal ikke vises
        expect(wrapper.text()).not.toContain("Filtrer prosjekter etter type:");
    });

    it("navigates back to page 1 using 'Forrige' button", async () => {
        fetchRepositoriesMock.mockResolvedValue({
            repo: ref(portfolioPaginationDummyData),
            refresh: vi.fn()
        });

        const wrapper = await mountSuspended(Portfolio);
        
        // Gå til side 2
        const nextBtn = wrapper.findAllComponents(NavigationButton).find(b => b.text().includes('Neste'));
        await nextBtn?.trigger('click');
        expect(wrapper.text()).toContain('Side 2 / 2');

        // Klikk på 'Forrige'
        const prevBtn = wrapper.findAllComponents(NavigationButton).find(b => b.text().includes('Forrige'));
        expect(prevBtn?.exists()).toBe(true);
        await prevBtn?.trigger('click');

        // Skal være tilbake på side 1
        expect(wrapper.text()).toContain('Side 1 / 2');
    });

    it("resets current page to 1 when filter changes while on page 2", async () => {
        fetchRepositoriesMock.mockResolvedValue({
            repo: ref(portfolioPaginationDummyData),
            refresh: vi.fn()
        });

        const wrapper = await mountSuspended(Portfolio);

        // Gå til side 2
        const nextBtn = wrapper.findAllComponents(NavigationButton).find(b => b.text().includes('Neste'));
        await nextBtn?.trigger('click');
        expect(wrapper.text()).toContain('Side 2 / 2');

        // Velg 'Backend'-filteret
        const backendBtn = wrapper.findAllComponents(NavigationButton).find(b => b.text().includes('Backend'));
        await backendBtn?.trigger('click');

        // Tilbakestilling skjer automatisk, og totalPages blir 1
        expect(wrapper.vm.currentPage).toBe(1);
    });
});

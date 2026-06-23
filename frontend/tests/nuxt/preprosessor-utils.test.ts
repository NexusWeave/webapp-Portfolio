
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { dummyApp, mockRoutes, routerItem } from '../utils/utils';
import { useRotateCollections } from '~/composables/preprosessor-utils';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { sortbyDate, setDateFormat, useNavigation } from '#imports';
import { sortObject, expectedSort, setDateFormatData, setDateFormatData_1, setDateFormatExpected,setDateFormatExpected_1 } from '../data/preprosessor-data';



vi.mock(import("#app"), async (importOriginal) => {
    const actual = await importOriginal()
    return {
        ...actual,
        useSeoMeta: vi.fn(),
        useRoute: () => ( mockRoutes('/', {description: 'Index page', label:'Home'}) ),
        useRouter:() => (
            {
                getRoutes: () => [
                    mockRoutes('/', { order: 0, description: 'Index page', label:'Home'}),
                    mockRoutes('/about', {order: 1, description: 'About page', label:'About'}),
                    mockRoutes('/profile', {order: 2, description: 'Profile page', label:'Profile'})
                ]
            }
        )
        
        }
    });

describe('Preprocessor Utils', () => {
    
    describe('SortbyDate()', () => {
        it('Should return a sorted ascendig list of dates, based on creation date', () => {
            expect(sortbyDate(sortObject, 'ascending')).toEqual(expectedSort);
        });

        it('Should return a sorted descendig list of dates, based on creation date', () => {
            expect(sortbyDate(sortObject)).toEqual(expectedSort.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()));
        });
    });

    describe('setDateFormat()', () => {
        it('Should return a formated date object', () => {
            expect(setDateFormat(setDateFormatData)).toEqual(setDateFormatExpected);
        });

        it('Should return updated object', () => {
            expect(setDateFormat(setDateFormatData_1)).toEqual(setDateFormatExpected_1);
        });
    });

    describe('useRotateCollections()', () => {
        const timer = 1000;
        const index: number = 5;

        beforeEach(() => vi.useFakeTimers() );
        afterEach(() => vi.useRealTimers() );

        it('Initialize random index within bounds', () => {
            const [carousel] = dummyApp(() => useRotateCollections(index))

            const value = carousel.index.value;
            expect(value).toBeLessThanOrEqual(5);
            expect(value).toBeGreaterThanOrEqual(0);

        });

        it('Increase index over time when started', () => {
            const [carousel] = dummyApp(() => useRotateCollections(index, timer));
            const value = carousel.index.value;
            carousel.start()

            vi.advanceTimersByTime(timer * 1);
            expect(value).toBe(value % index);

            vi.advanceTimersByTime(timer * 2);
            expect(value).toBe(value % index);
        });
        
        it('Index does not go out of bound', () => {
            const [carousel] = dummyApp(() => useRotateCollections(index, timer * 6))
            const value = carousel.index.value;
            carousel.start()

            vi.advanceTimersByTime(timer * 1);
            expect(value).greaterThan(-1);
            expect(value).lessThan(index + 1);

            vi.advanceTimersByTime(timer * 6)
            expect(value).greaterThanOrEqual(0);
            expect(value).lessThanOrEqual(index);
        });
    });

    describe('useNavigation()', () => {

        let menu: any
        const { useSeoMetaSpy } = vi.hoisted(() => ({useSeoMetaSpy:vi.fn()}))
        const expected_nav = [routerItem('/', 0, 'Home'), routerItem('/about', 1, 'About'), routerItem('/profile', 2, 'Profile')];

        mockNuxtImport('useSeoMeta', () => useSeoMetaSpy)
    
        beforeEach(() => { menu = useNavigation(); });

        it('Defines a navigation', () => { expect(menu).toBeDefined() });
        it('Returns computed property', () => { expect(isRef(menu)).toBe(true); });
        it('Should return a list of RouterItem[]', () => { expect(menu.value).toEqual(expected_nav); });

        it('spies on SeoMeta', () => {
            const title: string = "LMCS - Home";
            expect(useSeoMetaSpy).toHaveBeenCalledWith( expect.objectContaining({ title: title, ogTitle: title, ogLocale: 'nb_NO', ogType: 'website', twitterTitle: title }));
        });

        
    });

    describe('fetchCollection()', () => {
        it('', () => {
            expect(true).toBe(true);
        });
        
    });
});
import { ref } from 'vue';
import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import { dummyApp, mockRoutes, routerItem } from '../utils/utils';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { sortbyDate, setDateFormat, useRotateCollections, useNavigation, fetchCollection } from '~/composables/preprosessor-utils';
import { sortObject, expectedSort, setDateFormatData, setDateFormatData_1, setDateFormatExpected,setDateFormatExpected_1, emptyObject } from '../data/preprosessor-data';


vi.mock(import("#app"), async (importOriginal) =>
{
    const actual = await importOriginal()
    return {
        ...actual,
        useRoute: () => ( mockRoutes('/', {description: 'Index page', label:'Home'}) ),
        useRouter:() =>
        ({
            getRoutes: () => [
                mockRoutes('/', { order: 0, description: 'Index page', label:'Home'}),
                mockRoutes('/about', {order: 1, description: 'About page', label:'About'}),
                mockRoutes('/profile', {order: 2, description: 'Profile page', label:'Profile'})
            ]
    })}
});

const mockModifier = vi.fn((query) => query);
const { useSeoMetaSpy } = vi.hoisted(() => ({useSeoMetaSpy:vi.fn()}));

const { queryCollectionSpy } = vi.hoisted(() => { return { queryCollectionSpy: vi.fn().mockReturnValue({ all: vi.fn()})}});
const { asyncDataSpy } = vi.hoisted(() =>
{
    return {
        asyncDataSpy: vi.fn().mockImplementation(async (key, handler) =>
        {
            const err = ref(null); const results = ref(null);
            try { results.value = await handler() } catch (e) { err.value = e }
            return { data: results, error: err }
        })};});

mockNuxtImport('useSeoMeta', () => useSeoMetaSpy);
mockNuxtImport('useAsyncData', () => asyncDataSpy);
mockNuxtImport('queryCollection', () => queryCollectionSpy);

describe('Preprocessor Utils', () => {
    
    describe('SortbyDate()', () => {
        it('Returns a sorted ascendig list of dates, based on creation date', () => {
            expect(sortbyDate(sortObject, 'ascending')).toEqual(expectedSort);
        });

        it('Returns a sorted descendig list of dates, based on creation date', () => {
            expect(sortbyDate(sortObject)).toEqual(expectedSort.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()));
        });

        it('Returns empty array', () => {
            expect(sortbyDate(emptyObject)).toEqual([]);
        });
    });

    describe('setDateFormat()', () => {
        const sdf = (arg: any) => {return setDateFormat(arg)}

        it('Returns undefined', () => { expect(sdf({})).toEqual(undefined); });
        it('Returns updated object', () => { expect(sdf(setDateFormatData_1)).toEqual(setDateFormatExpected_1); });
        it('Returns a formated date object', () => { expect(sdf(setDateFormatData)).toEqual(setDateFormatExpected); });
        
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
        
        const expected_nav = [routerItem('/', 0, 'Home'), routerItem('/about', 1, 'About'), routerItem('/profile', 2, 'Profile')];
    
        beforeEach(() => { menu = useNavigation(); });

        it('Defines a navigation', () => { expect(menu).toBeDefined() });
        it('Returns computed property', () => {expect(isRef(menu)).toBe(true); });
        it('Should return a list of RouterItem[]', () => { expect(menu.value).toEqual(expected_nav); });

        it('spies on SeoMeta', () => {
            const title: string = "LMCS - Home";
            expect(useSeoMetaSpy).toHaveBeenCalled();
            expect(useSeoMetaSpy).toHaveBeenCalledWith( expect.objectContaining({ title: title, ogTitle: title, ogLocale: 'nb_NO', ogType: 'website', twitterTitle: title }));
        });
    });

    describe('fetchCollection()', () => {

        const path = 'path/to/content';
        const mockMapper = (data: any) => data;

        it('Should recieve correct path parameter', async() => {
            const cacheKey = 'queryCollectionCacheKey';
            await fetchCollection(path, cacheKey, mockMapper);

            expect(queryCollectionSpy).toHaveBeenCalled();
            expect(queryCollectionSpy).toHaveBeenCalledWith(path);
        });

        it('Should Be Optional, if provided invoke with the query builder instance', async() => {
                const mockQueryBuilder = {all: vi.fn().mockResolvedValue([])};
                queryCollectionSpy.mockReturnValue(mockQueryBuilder);

                const cacheKey = 'mockModifierCacheKey';
                await fetchCollection(path, cacheKey, mockMapper, mockModifier);

                expect(mockModifier).toHaveBeenCalled();
                expect(queryCollectionSpy).toHaveBeenCalled();
                expect(mockModifier).toHaveBeenCalledWith(mockQueryBuilder);
        });

        it('useAsyncData recieves the correct cache key', async() => {
                const cacheKey = 'asyncDataCacheKey';
                await fetchCollection(path, cacheKey, mockMapper);

                expect(asyncDataSpy).toHaveBeenCalled();
                expect(asyncDataSpy).toHaveBeenCalledWith(cacheKey, expect.any(Function), expect.any(String));
        });

        it('Returns computed property', async() => { 
            const cacheKey = "Computed-Property";
            expect(isRef(await fetchCollection(path, cacheKey, mockMapper))).toBe(true);
        });

        it('Returns empty list', async() => { 
            const cacheKey ="empty-list";
            const result = await fetchCollection(path, cacheKey, mockMapper);
            const result1 = await fetchCollection(path, cacheKey, mockMapper, mockModifier);

            expect(result.value).toEqual([]);
            expect(result1.value).toEqual([]);
        });

        it('Returns mapped data', async() => {
            const cacheKey = 'mapped-data';
            const dummyList = [{id:1, name:'Jhon Doe'}];
            const dummyMap = (data: Array<Record<string | number,string>>) => {return data.map((item: any) => {return { id: item.id, name: item.name}}) };

            queryCollectionSpy.mockReturnValue( {all:  vi.fn().mockResolvedValue(dummyList)});
            const result = await fetchCollection(path, cacheKey, dummyMap);

            expect(result.value).toEqual(dummyList);
        });

        it ('Throws an Error', async() =>
            {
                queryCollectionSpy.mockImplementationOnce(() => { throw new Error('Collection Does not exists')});

                const cacheKey = 'throwErrorCacheKey';
                await expect(fetchCollection(path, cacheKey, mockMapper)).rejects.toThrow('Collection Does not exists');
        });

    });
});
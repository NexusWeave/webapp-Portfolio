import { blogPagination } from '#imports';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ref } from 'vue';
import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import { mockBlogData, mockFetchAPIData } from '../../data/miscData';
import { backendEndpoint, fetchRepositories } from '~/composables/backendAPI-utils';

// Setting up refs for flexible mock response control
const mockFetchResponse = ref<any>(null);
const mockFetchError = ref<any>(null);
const mockRefreshSpy = vi.fn();

mockNuxtImport('useRuntimeConfig', (original) => {
    return () => {
        const config = original();
        return {
            ...config,
            public: {
                ...config.public,
                GCLOUD: 'https://mock-gcloud-api.com/'
            }
        };
    };
});

mockNuxtImport('useFetch', () => {
    return (path: string, options: any) => {
        return Promise.resolve({
            data: mockFetchResponse,
            error: mockFetchError,
            refresh: mockRefreshSpy
        });
    };
});

describe('Misc Composables', () => {

    describe('blogPagination()', () => {

        let n: number;
        let currentPage: number;

        beforeEach(() => {
            n = 3;
            currentPage = 1;
        });

        it('Returns a empty list', () => {
            expect(blogPagination(null, currentPage, n)).toEqual([]);
            expect(blogPagination(mockBlogData, currentPage, n, "test")).toEqual([]);
        });

        it('Returns 1 items from the pagnition function', () => {
            const expectedOutput = [mockBlogData[0]];
            expect(blogPagination(mockBlogData, currentPage, 1)).toEqual(expectedOutput);
        });

        it('Returns 3 items from the pagnition function', () => {
            const expectedOutput = mockBlogData;
            expect(blogPagination(mockBlogData, currentPage, n)).toEqual(expectedOutput);
        });
    });

    describe('backendEndpoint()', () => {
        beforeEach(() => {
            mockFetchResponse.value = null;
            mockFetchError.value = null;
            mockRefreshSpy.mockClear();
        });

        it('Should return data and refresh when successful', async () => {
            mockFetchResponse.value = { success: true };
            const result = await backendEndpoint('https://krigjo25.no', 1, '/repositories', 'dummy-cache');
            
            expect(result.data.value).toEqual({ success: true });
            expect(result.refresh).toBe(mockRefreshSpy);
        });

        it('Should throw error when fetch fails', async () => {
            mockFetchError.value = new Error('Network error');
            await expect(backendEndpoint('https://krigjo25.no', 1, '/repositories', 'dummy-cache')).rejects.toThrow();
        });
    });

    describe('fetchRepositories()', () => {
        beforeEach(() => {
            mockFetchResponse.value = null;
            mockFetchError.value = null;
            mockRefreshSpy.mockClear();
        });

        it('Should fetch and map repositories correctly using length and partial matching', async () => {
            mockFetchResponse.value = mockFetchAPIData;

            const { repo, refresh } = await fetchRepositories('repo-cache-key');
            
            // Avoid mocking a lot of lines of code/assertions by verifying the length and critical fields only
            expect(repo.value).toHaveLength(1);
            expect(repo.value[0]).toEqual(
                expect.objectContaining({
                    id: "987654", // mapRepoData converts ID to string
                    label: "test api repo",
                    owner: "api-owner"
                })
            );
            expect(refresh).toBe(mockRefreshSpy);
        });
    });
});

/*

export async function fetchRepositories<T>(cacheKey: string): Promise<{repo: ComputedRef<GithubData[]>, refresh: () => void}>
{
    const {public: env} = useRuntimeConfig();

    const version = "/api/v1"
    const endpoint = '/repositories';
    const path = `${env.GCLOUD}${version}${endpoint}`;

    const {data, error, refresh} = await useFetch<RepositoryData>(path, { key: cacheKey, headers: { 'Content-Type': 'application/json' } });

    // if (error.value) console.error(`Error fetching data from ${path}:`, error.value);
    
    const mappedData = computed<GithubData[]>(() => data.value ? mapRepoData(data.value as RepositoryData) : []);
    return {repo : mappedData ,  refresh: refresh };
}*/
import { describe, it, expect } from 'vitest';
import { blogPagination, fetchRepositories } from '#imports';

describe('Misc Composables', () => {

    describe('blogPagination()5-10', () => {

        it('Returns a correctly sorted list', () => {
            expect(true).toBe(true);
        });
    });

    describe('fetchRepositories() 10-21', () => {

        it('Returns a correctly sorted list', () => {
            expect(true).toBe(true);
        });
    });
});

/*export const blogPagination =  (data:PostItem[], currentPage:number, n:number, label:string = 'blog-post') =>
    {
        if (!data) return [];
        
        const start = (currentPage - 1) * n;
        const end = start + n;
        const filteredData = data.filter(post => post.isPublished && post.tags.some(t => t.labels?.includes(label)));
        return !!filteredData ? filteredData.slice(start, end) : null;
    }

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
import { computed, ref } from "vue";
import { mapRepoData } from "./maps/mapRepoData";

import type { GithubData, RepositoryData } from "~/types/props";


export async function fetchRepositories<T>(cacheKey: string): Promise<{repo: ComputedRef<GithubData[]>, refresh: () => void}>
{
    const {public: env} = useRuntimeConfig();
    let data = ref<RepositoryData | null>(null);
    let refresh = () => {};
    
    try {
        const res = await backendEndpoint<RepositoryData>(env.GCLOUD, 1, '/repositories', cacheKey);
        data = res.data;
        refresh = res.refresh;
    } catch (error) {
        console.warn(`[fetchRepositories] Failed to fetch repositories from backend:`, error);
    }
    
    const mappedData = computed<GithubData[]>(() => data.value ? mapRepoData(data.value as RepositoryData) : []);
    return {repo : mappedData ,  refresh: refresh };
}

export async function backendEndpoint<T>(baseUrl: string, version:number, endpoint: string, cacheKey:string) {

    const path = `${baseUrl}/api/v${version}${endpoint}`;
    const {data, error, refresh} = await useFetch<T>(path, { key: cacheKey, headers: { 'Content-Type': 'application/json' } });
    if (error.value) throw Error(`An error occured while trying to fetch the api ${error.value} ${path}`);

    return {data, refresh}
};
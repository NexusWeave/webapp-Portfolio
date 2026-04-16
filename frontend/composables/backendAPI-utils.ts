// Configure the backend API base URL

import { computed } from "vue";
import { mapRepoData } from "./maps/mapRepoData";

import type { GithubData, RepositoryData } from "~/types/props";


export async function fetchRepositories<T>(cacheKey: string): Promise<{repo: ComputedRef<GithubData[]>, refresh: () => void}>
{
    const {public: env} = useRuntimeConfig();

    const version = "/api/v1"
    const endpoint = '/repository';
    const path = `${env.GCLOUD}${version}${endpoint}`;

    const {data, error, refresh} = await useFetch<RepositoryData>(path, { key: cacheKey, headers: { 'Content-Type': 'application/json' } });

    if (error.value) console.error(`Error fetching data from ${path}:`, error.value);
    
    const mappedData = computed<GithubData[]>(() => data.value ? mapRepoData(data.value as RepositoryData) : []);
    return {repo : mappedData ,  refresh: refresh };
}


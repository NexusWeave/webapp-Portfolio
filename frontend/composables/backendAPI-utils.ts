// Configure the backend API base URL

import type { RepositoryData } from "~/types/props";

export async function fetchRepositories<T>(cacheKey: string): Promise<RepositoryData>
{
    const {public: env} = useRuntimeConfig();

    const version = "/api/v1"
    const endpoint = '/repository';
    const path = `${env.GCLOUD}${version}${endpoint}`;

    const {data, error} = await useFetch<T>(path, { key: cacheKey, headers: { 'Content-Type': 'application/json' } });

    if (error.value) console.error(`Error fetching data from ${path}:`, error.value);

    return { data, error }; 
}


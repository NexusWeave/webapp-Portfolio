
// Configure the backend API base URL
import type { GithubRepo } from '@/types/props';

export async function fetchRestApi<GithubRepo>(endpoint: string, cacheKey: string): Promise<Ref<GithubRepo[] | null>>
{
    const {public: RESTurl} = useRuntimeConfig();
    const api = `${RESTurl.apiBase}${endpoint}`;

    const {data, error} = await useFetch<GithubRepo[]>(api, 
        {
            key: cacheKey,
            headers: {
                'Content-Type': 'application/json',
            }
    });

    if (error.value)
    {
        console.error(`Error fetching data from ${api}:`, error.value);
        return { data: ref(0), error };
    }

    return { data, error }; 
}

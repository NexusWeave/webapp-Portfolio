
// Configure the backend API base URL
//import type { GithubRepo } from '@/types/props';

export async function fetchRepositories<GithubRepo>(cacheKey: string): Promise<Ref<GithubRepo[]>>
{
    const {public: backend} = useRuntimeConfig();

    const version = "api/v1"
    const endpoint = 'repository';
    const api = `${backend.gcloud_api}${version}/${endpoint}`;

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
        return {data: ref(null), error };
    }
    console.log(api, data.value)
    return { data, error }; 
}


// Configure the backend API base URL
//import type { GithubRepo } from '@/types/props';

export async function fetchRepositories<GithubRepo>(cacheKey: string): Promise<Ref<GithubRepo[]>>
{
    const {public: env} = useRuntimeConfig();

    const version = "api/v1"
    const endpoint = 'repository';
    const path = `${env.gcloud_api}${version}/${endpoint}`;

    const {data, error} = await useFetch<GithubRepo[]>(path, 
        {
            key: cacheKey,
            headers: {
                'Content-Type': 'application/json'
            }
    });

    if (error.value)
    {
        console.error(`Error fetching data from ${path}:`, error.value);
        return {data: ref(null), error };
    }
    //console.log(path, data.value)
    return { data, error }; 
}

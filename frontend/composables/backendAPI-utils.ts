// Configure the backend API base URL

import { computed } from "vue";

export async function collectInformation<T, R>(cacheKey: string, endpoint: string, mapper?: (data:T[]) => R, headers: Record<string, string> = { 'Content-Type': 'application/json' }): Promise<{data: ComputedRef<R>, refresh: () => void}>
{
    const {public: env} = useRuntimeConfig();
    const version = "/api/v1"
    const path:string = `${env.GCLOUD}${version}${endpoint}`; 

    const {data, error, refresh} = await useFetch<T>(path, { key: cacheKey, headers: headers });

    if (error.value) console.error(`Error fetching data from ${path}:`, error.value);
    
    return {data: (data.value ? computed(() => mapper ? mapper(data.value) : (data.value as unknown as R)) : computed(() =>[])) as ComputedRef<R>, refresh: refresh};
}


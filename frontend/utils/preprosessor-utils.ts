
//  --- Import & types logic
import type { AcademicCollectionItem } from '@nuxt/content';


//  --- Data Fetching Logic
export async function fetchCollection(path:any, cacheKey:string): Promise<AcademicCollectionItem[]>
{
    const {data: document_info} = await useAsyncData(cacheKey, () => 
    {return queryCollection(path).all();});
    
    // --- Debugging
    // console.log("FetchCollection - Path:", path);
    // console.log("FetchCollection - Data:", document_info.value);
    
    if(document_info.value) return document_info.value; else return [];
}
export function sortCollection(data: AcademicCollectionItem[]): AcademicCollectionItem[]
{
    return data.sort((a, b) =>
        {
            const A = new Date(a.created).getTime();
            const B = new Date(b.created).getTime();
            return A - B; // Sort descending
        });
}

//  --- Import & types logic
import type { DateItem } from '~/types/date';
import type { AcademicCollectionItem, AchievementsCollectionItem } from '@nuxt/content';


type CMSArticleCollectionItem = AcademicCollectionItem | AchievementsCollectionItem;

//  --- Data Fetching Logic
export async function fetchCollection<T, R>(path:any, cacheKey:string, mapper: (data:T[]) => R): Promise<Ref<R>>
{
    const {data, error} = await useAsyncData(cacheKey, () =>  {return queryCollection(path).all();});
    
    // --- Debugging
    // console.log("FetchCollection - Path:", path);
    // console.log("FetchCollection - Data:", data.value);
    if (error.value) console.log("FetchCollection - Error:", error.value);
    return (data.value ? ref(mapper(data.value)) : ref([])) as Ref<R>;
}

//  --- Data Processing Logic
export function sortbyDate<T extends CMSArticleCollectionItem>(data: T[], sort: string =''): T[]
{
    return data.sort((a, b) =>
        {
            const A = new Date(a.created).getTime();
            const B = new Date(b.created).getTime();

            switch(sort)
            {
                case 'ascending': return A - B; // Sort ascending
                default: return B - A; // Default to descending
            }
        });
}

export function setDateFormat(data:DateItem) : DateItem | undefined
{
    const time = new Intl.DateTimeFormat('nb-NO', { hour: '2-digit', minute: '2-digit' });
    const date = new Intl.DateTimeFormat('nb-NO', { month: 'short', day: 'numeric', year: 'numeric', weekday: 'short' });
    if (!data.date) return undefined;
    const dateData:DateItem = { delimiter : 'dot', date: data.date ?? ' ' ? date.format(new Date(data.date)) : null,
        time: data.date ? time.format(new Date(data.date)) : null, text : data.updated ? `Oppdatert` : `Publisert`, 
        updated: data.updated ? date.format(new Date(data.updated)) : null };
    return dateData;
}

export const useCarousel = (length:number, interval: number = 5000) => {
    const index = ref(Math.floor(Math.random() * length));

    let timer: ReturnType<typeof setInterval> | null = null;
    const stop = () => { if (timer) { clearInterval(timer); timer = null; } };
    const start = () => { if (length <= 1) return; timer = setInterval(() => { index.value = (index.value + 1) % length }, interval) };
    onUnmounted(() => stop());
    return { index, start};
    };

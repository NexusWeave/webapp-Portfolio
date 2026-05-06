
//  --- Import & types logic
import { computed } from 'vue';
import { useRouter } from '#app';
import type { RouterItem } from '~/types/navigation';

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

export const useNavigation = () => {
    const route = useRoute();
    const router = useRouter();
        

    watch(() => route.path, () => {
        const name = "LMCS";
        const image = 'https://krigjo25.no/media/images/carousel/20240903_165612.jpg';
        const description = (route.meta.description as string) || '';
        
        let label = route.meta.label ? route.meta.label as string : String(route.params.slug).replace(/-/g, ' ');
        label = label.charAt(0).toUpperCase() + label.slice(1).toLowerCase()
        
        const title = label ? `${name} - ${label}` : name;

        useSeoMeta({

            title: title, description: description,
            ogTitle: title, ogImage: image, ogLocale: 'nb_NO', ogType: 'website', ogDescription: description,
            twitterImage: image, twitterTitle: title, twitterDescription: description, twitterCard: 'summary_large_image', themeColor: '#ffffff'
        }); }, { immediate: true });
        return computed<RouterItem[]>(() => {
        const routes = router.getRoutes();

        const navItems: RouterItem[] = routes
            .map(route => { return { type: ['router'], path: route.path, order: route.meta.order as number || 0, label: route.meta.label as string }; })
            .filter(route => !route.path.includes(':') && route.label)
            .sort((a, b) => a.order - b.order);

        return navItems;
    });
};
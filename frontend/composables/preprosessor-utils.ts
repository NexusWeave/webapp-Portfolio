
//  --- Import & types logic
import type { TimelineItem } from '~/types/timeline';
import type { ReferenceItem } from '~/types/references';
import type { AcademicCollectionItem, ReferenceCollectionItem, AchievementsCollectionItem } from '@nuxt/content';

type CMSArticleCollectionItem = AcademicCollectionItem | AchievementsCollectionItem;

//  --- Data Fetching Logic
export async function fetchCollection<T>(path:any, cacheKey:string): Promise<Ref<T[]>>
{
    const {data} = await useAsyncData(cacheKey, () => 
    {return queryCollection(path).all() as Promise<T[]>;});
    
    // --- Debugging
    // console.log("FetchCollection - Path:", path);
    // console.log("FetchCollection - Data:", data.value);

    if(data) return data as Ref<T[]>; else return ref([]);
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

export function mapTimeline(data: Ref<AcademicCollectionItem[]>): TimelineItem[]
{
    if (!data.value) return [];

    let AUTOINCREMENT:number = 0;

    const timeline = sortbyDate<AcademicCollectionItem>(data.value);

    return timeline.map((doc:AcademicCollectionItem) => {
        return {
            id: AUTOINCREMENT++,
            body: doc.body || undefined, name: doc.tag + "-Timeline",
            title: doc.title || undefined, isVisible: AUTOINCREMENT - 1 == 0,
            techStack: fetchTechType(doc.techStack), description: doc.description || undefined,

            date:
            {
                created: doc.created,
                updated: doc.updated,
                end: doc.end,
            },

            organization: 
            {
                name: doc.organization,
                anchor: 
                {
                    label: doc.organization,
                    href: doc.org_link,
                    type: doc.org_link ? ['external'] : []
                }
            },

            location:
            {
                name: doc.location,
                anchor:
                {
                    label: doc.location,
                    href: doc.loc_link || undefined,
                    type: doc.loc_link ? ['external'] : []
                }
            },

            reference:
                {
                    name: doc.references,
                    anchor:
                    {
                        label: doc.references,
                        href: doc.ref_link || undefined,
                        type: doc.ref_link ? ['external'] : []
                    }
            },
            } as TimelineItem;
        }
    );
};
export function mapReference(data: Ref<ReferenceCollectionItem[]>): ReferenceItem[]
{
    let AUTOINCREMENT:number = 0;
    const randomID = Math.floor(Math.random() * data.value.length);
    return data.value.map((doc:ReferenceCollectionItem) => {
        return {
            id: AUTOINCREMENT++,
            quote: doc.quote,
            anchor: 
            {
                href: doc.link,
                label: doc.title,
                type: ['external']
            },
            isVisible: AUTOINCREMENT - 1 === randomID,
        } as ReferenceItem;
    });
}
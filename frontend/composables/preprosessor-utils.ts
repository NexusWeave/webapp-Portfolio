
//  --- Import & types logic
import type { TimelineItem } from '@/types/timeline';
import type { AcademicCollectionItem } from '@nuxt/content';


//  --- Data Fetching Logic
export async function fetchCollection(path:any, cacheKey:string): Promise<Ref<AcademicCollectionItem[]>>
{
    const {data} = await useAsyncData(cacheKey, () => 
    {return queryCollection(path).all() as Promise<AcademicCollectionItem[]>;});
    
    // --- Debugging
    // console.log("FetchCollection - Path:", path);
    // console.log("FetchCollection - Data:", data.value);

    if(data) return data as Ref<AcademicCollectionItem[]>; else return ref([]);
}

//  --- Data Processing Logic
export function sortCollection(data: AcademicCollectionItem[]): AcademicCollectionItem[]
{
    return data.sort((a, b) =>
        {
            const A = new Date(a.created).getTime();
            const B = new Date(b.created).getTime();
            return A - B; // Sort descending
        });
}

export function mapTimeline(data: Ref<AcademicCollectionItem[]>): TimelineItem[]
{
    if (!data.value) return [];

    let AUTOINCREMENT:number = 0;

    const timeline = sortCollection(data.value);

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
                    href: doc.org_link || undefined,
                    type: doc.org_link ? 'external' : undefined
                }
            },

            location:
            {
                name: doc.location,
                anchor:
                {
                    label: doc.location,
                    href: doc.loc_link || undefined,
                    type: doc.loc_link ? 'external' : undefined
                }
            },

            reference:
                {
                    name: doc.reference,
                    anchor:
                    {
                        label: doc.reference,
                        href: doc.ref_link || undefined,
                        type: doc.ref_link ?'external': undefined
                    }
            },
            } as TimelineItem;
        }
    );
};
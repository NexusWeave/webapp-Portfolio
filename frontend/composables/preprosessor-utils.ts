
//  --- Import & types logic
import type { TimelineItem } from '~/types/timeline';
import type { ReferenceItem } from '~/types/references';
import type { DateItem, FigureItem } from '~/types/props';
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

export function setDateFormat(data:DateItem) : DateItem
{
    const time = new Intl.DateTimeFormat('nb-NO', { hour: '2-digit', minute: '2-digit' });
    const date = new Intl.DateTimeFormat('nb-NO', { month: 'short', day: 'numeric', year: 'numeric', weekday: 'short' });

    const dateData =
    {
        delimiter : 'dot',
        date: data.date ? date.format(new Date(data.date)) : null,
        time: data.date ? time.format(new Date(data.date)) : null,
        text : data.updated ? `Oppdatert` : `Publisert`,
        updated: data.updated ? date.format(new Date(data.updated)) : null,
    };
    return dateData;
}

export function mapTimeline(data: Ref<AcademicCollectionItem[]>): TimelineItem[] {
    if (!data.value) return [];

    let AUTOINCREMENT: number = 0;
    const timeline = sortbyDate<AcademicCollectionItem>(data.value);

    return timeline.map((doc: AcademicCollectionItem): TimelineItem => {
        const techStack = fetchTechType(doc.techStack);
        let tech: FigureItem[] | undefined = undefined;

        if (techStack && techStack.length > 0) {
            tech = techStack.map((item) => {
                const itemType = item.type.toLowerCase();
                const label = item.label;

                return {

                    type: 'svg',
                    frameWork: label,
                    techType: itemType,
                    alt: 'Image for ' + label,
                    src: `/media/tech-lang-icons/${label.toLowerCase()}.svg`,
                    srcset: `/media/tech-lang-icons/${label.toLowerCase()}.svg`
                } as FigureItem;
            });
        }

        return {
            techStack: tech as FigureItem[],
            id: AUTOINCREMENT++,
            body: doc.body || undefined, 
            name: doc.tag + "-Timeline",
            title: doc.title || undefined, 
            isVisible: (AUTOINCREMENT - 1) === 0,
            date: { created: doc.created, end: doc.end },
            description: doc.meta.description || undefined,
            location: { name: doc.location, anchor: { label: doc.location, href: doc.loc_link || undefined } },
            organization: { name: doc.organization, anchor: { label: doc.organization, href: doc.org_link } },
            reference: { name: doc.references, anchor: { label: doc.references, href: doc.ref_link || undefined } },
        } as unknown as TimelineItem;
    });
}

export function mapReference(data: Ref<ReferenceCollectionItem[]>): ReferenceItem[]
{
    let AUTOINCREMENT:number = 0;
    const randomID = Math.floor(Math.random() * data.value.length);
    return data.value.map((doc:ReferenceCollectionItem) => {
        return {
            id: AUTOINCREMENT++,
            quote: `"${doc.quote}"`,
            anchor: 
            {
                type: ['pdf'],
                href: doc.link,
                label: doc.title,
            },
            isVisible: AUTOINCREMENT - 1 === randomID,
        } as ReferenceItem;
    });
}
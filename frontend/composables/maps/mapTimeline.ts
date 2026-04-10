import type { FigureItem } from '~/types/media';
import type { TimelineItem } from '~/types/timeline';
import type { AcademicCollectionItem } from '@nuxt/content';

export function mapTimeline(data: Ref<AcademicCollectionItem[]>): TimelineItem[] {
    if (!data.value) return [];

    let AUTOINCREMENT: number = 0;
    const timeline = sortbyDate<AcademicCollectionItem>(data.value);

    return timeline.map((doc: AcademicCollectionItem): TimelineItem => {
        const techStack = fetchTechType(doc.techStack);
        let tech: FigureItem[] | undefined = undefined;

        if (techStack && techStack.length > 0) {
            tech = techStack.map((item) => {
                const label = item.label.toLowerCase();
                const category = item.category.toLowerCase();
                return { type: 'svg', frameWork: label, category: category, alt: 'A visual representation of ' + label, src: `/media/tech-lang-icons/${label}.svg`, srcset: `/media/tech-lang-icons/${label}.svg`, caption: " " } as FigureItem;
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
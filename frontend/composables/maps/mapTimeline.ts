import type { FigureItem } from '~/types/media';
import type { TimelineItem, Subject } from '~/types/timeline';
import type { AcademicCollectionItem } from '@nuxt/content';
import { sortbyDate, setDateFormat } from '../preprosessor-utils';
import { fetchTechType } from '~/utils/tech-utils';

function mapIcons(techStack: any[]): FigureItem[] {
    const AVAILABLE_ICONS = [
        'batchfile', 'c', 'cp', 'cs', 'css', 'cython', 'dockerfile', 'flask', 
        'fortran', 'git', 'go', 'hack', 'html', 'javascript', 'jinja', 
        'jupyter', 'liquid', 'lua', 'makefile', 'meson', 'mssql', 'nunjucks', 
        'nuxt', 'php', 'powershell', 'python', 'roff', 'sass', 'scratch', 
        'shell', 'smarty', 'sqlite', 'tinacms', 'typescript', 'vue'
    ];

    return techStack.map((item) => {
        const label = item.label.toLowerCase();
        const category = item.category.toLowerCase();
        const isAvailable = AVAILABLE_ICONS.includes(label);

        return { 
            type: isAvailable ? 'svg' : 'text', 
            label: label,
            frameWork: label, 
            category: category, 
            alt: 'A visual representation of ' + label, 
            src: isAvailable ? `/media/tech-lang-icons/${label}.svg` : '', 
            srcset: isAvailable ? `/media/tech-lang-icons/${label}.svg` : '', 
            caption: " " 
        } as FigureItem;
    });
}

export function mapTimeline(data: AcademicCollectionItem[]): TimelineItem[] {
    if (!data) return [];

    let AUTOINCREMENT: number = 0;
    const timeline = sortbyDate<AcademicCollectionItem>(data);

    return timeline.map((doc: AcademicCollectionItem): TimelineItem => {
        const techStack = fetchTechType(doc.techStack);
        
        // Sort subjects newest first
        const sortedSubjects = doc.subjects ? sortbyDate(doc.subjects) : [];
        
        const subjects: Subject[] = sortedSubjects.map(sub => {
            const subTech = fetchTechType(sub.techStack);
            return {
                title: { label: sub.title, href: sub.ref_link || undefined },
                date: {
                    created: setDateFormat({ date: sub.created }),
                    end: sub.end ? setDateFormat({ date: sub.end }) : null
                } as any,
                techStack: mapIcons(subTech),
                body: sub.body || undefined,
            };
        }) || [];

        return {
            subjects: subjects,
            id: AUTOINCREMENT++,
            body: doc.body || undefined, 
            date: {
                created: setDateFormat({ date: doc.created }),
                end: doc.end ? setDateFormat({ date: doc.end }) : null
            } as any,
            techStack: mapIcons(techStack),
            isVisible: (AUTOINCREMENT - 1) === 0,
            title: { label: doc.title, href: doc.org_link },
            description: (doc as any).description || undefined,
            name: ( doc.title || 'Achievement') + "-Timeline",
            location: { label: doc.location, href: doc.loc_link },
        } as unknown as TimelineItem;
    });
}
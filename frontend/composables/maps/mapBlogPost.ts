import type { DateItem } from '~/types/date';
import type { DevPostsCollectionItem } from '@nuxt/content';

export const mapBlogData = (data: DevPostsCollectionItem[]) => {
        if (!data) return [];
        data = data.sort((a, b) => { const dateA = new Date(a.date); const dateB = new Date(b.date); return dateB.getTime() - dateA.getTime(); });
        
        let AUTOINCREMENT = 0;
        const today = new Date();
        
        return data.map((item) => {
            const id = item.id.split('/')
            const date:DateItem = {date: item.date};
            const isPublished = new Date(item.date) <= today;
            const path = id.pop()?.replace('.md', '').toLowerCase();

            const dir = '/logs';
            const tags = (() =>
                    {
                        const listOfAvailableTags = ['project', 'devops', 'os', 'rd', 'mentalt-vedlikehold',];
                        const index:number = id.findIndex(p => listOfAvailableTags.includes(p.toLocaleLowerCase()));

                        const misc: string = 'misc';
                        const folder:string | undefined = (index + 1) != -1 ? id[index] : misc;
                        if (!id[index]) return;
                        const label = folder?.toLowerCase() === listOfAvailableTags[0] ? id[index + 1] : folder;

                        return { name: label, label: `${label ? label?.charAt(0).toUpperCase() + label.slice(1)?.replace(/-/g, ' ') : ''}`, type: ['tag', 'dir'], href: `${dir}/tags/${label}`, cls: [label], path: id.pop()?.toLocaleLowerCase() };

                    })();
            return {
                path: path,
                tags: [tags],
                title: item.title,
                id: AUTOINCREMENT++,
                body: item.body,
                isPublished: isPublished,
                date: setDateFormat(date),
                status: item.status ?? '',
                ingress: item.ingress ?? '',
                sources: item.sources ?? '',
                anchor: [{ type: ['router'], path: `${dir}/records/${path}`, label: 'Les mer', cls: ['read-more-btn'] }]
            }
        });
    }
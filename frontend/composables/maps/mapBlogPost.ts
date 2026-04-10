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
                        const index = id.findIndex(p => listOfAvailableTags.includes(p.toLocaleLowerCase()));

                        const misc = 'misc';
                        const folder = (index + 1) != -1 ? id[index]?.toLowerCase() : misc;
                        if (!id[index]) return;
                        const label = folder === listOfAvailableTags[0] ? id[index + 1] : folder;

                        const tag = { label: label, type: ['tag'], href: `${dir}/tags/${label}`, cls: [label], path: id.pop()?.toLocaleLowerCase() || misc };
                        return tag;})()
            return {
                path: path,
                tags: [tags],
                title: item.title,
                id: AUTOINCREMENT++,
                star: item.star ?? '',
                body: item.body ?? '',
                isPublished: isPublished,
                date: setDateFormat(date),
                parade: item.parade ?? '',
                ingress: item.ingress ?? '',
                sources: item.sources ?? '',
                anchor: [{ type: ['router'], path: `${dir}/records/${path}`, label: 'Les mer', cls: ['read-more-btn'] }]
            }
        });
    }
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
            const tags = (() =>
                    {
                        const listOfAvailableTags = ['project', 'devops', 'os', 'rd', 'mentalt-vedlikehold'];
                        const index = id.findIndex(p => listOfAvailableTags.includes(p.toLocaleLowerCase()));

                        if (index === -1) return ['misc']; if (!id[index]) return;
                        else if (id[index].toLowerCase() === 'project') { return [id[index + 1]];}
                        else  return index != -1 ? [id[index]]: [];
                    })()
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
                anchor: [{ type: ['router'], path: `artikkel/${path}`, label: 'Les mer', cls: ['read-more-btn'] }]
            }
        });
    }
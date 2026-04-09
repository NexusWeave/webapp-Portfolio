import type { DateItem } from '~/types/props';
import type { DevPostsCollectionItem } from '@nuxt/content';

export const mapBlogData = (data: DevPostsCollectionItem[]) => {
        if (!data) return [];
        data = data.sort((a, b) => { const dateA = new Date(a.date); const dateB = new Date(b.date); return dateB.getTime() - dateA.getTime(); });
        const today = new Date()
        let AUTOINCREMENT = 0;
        return data.map((item) => {
            const isPublished = new Date(item.date) <= today
            const id = item.id.split('/')
            const date:DateItem = {date: item.date};
            const path = id.pop()?.replace('.md', '').toLowerCase();
            const tags = (() =>
                    {
                        const list_of_tags = ['project', 'devops', 'os', 'rd', 'mentalt-vedlikehold'];
                        const index = id.findIndex(p => list_of_tags.includes(p.toLocaleLowerCase()));

                        if (index === -1) return ['misc'];
                        if (!id[index]) return;
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
                anchor: [{ href: `artikkel/${path}`, label: 'Les mer' }]
            }
        });
    }
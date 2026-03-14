
import type { DevPostsCollectionItem } from '@nuxt/content';
import type { DateItem } from '~/types/props';

export const mapBlogData = (data: DevPostsCollectionItem[]) => {
        if (!data) return [];
        data = data.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB.getTime() - dateA.getTime();
        });
        
        return data.map((item) => {
            const date:DateItem = {date: item.date};
            const id = item.id.split('/').pop()?.replace('.md', '').toLocaleLowerCase();
            return {
                id: id,
                date: setDateFormat(date),
                star: item.star ?? '',
                body: item.body ?? '',
                title: item.title,
                parade: item.parade ?? '',
                ingress: item.ingress ?? '',
                sources: item.sources ?? '',
                anchor: 
                [{
                    href: `aktuelt/artikkel/${id}`, 
                    label: 'Les mer'
                }]
            }
        });
    }
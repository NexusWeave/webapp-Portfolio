
import type { BlogCollectionItem } from '@nuxt/content';

export const mapBlogData = (data: BlogCollectionItem[]) => {
        if (!data) return [];

        return data.map((item) => {
            return {
                date: item.date,
                star: item.star,
                body: item.body,
                title: item.title,
                parade: item.parade,
                ingress: item.ingress,
                sources: item.sources,
                anchor: { cls: ['btn'], href: item.id, label: 'Les mer' }
            }
        });
    }
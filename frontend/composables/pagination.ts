import { computed } from 'vue';
import { mapBlogData } from './maps/blogPost';

import type { BlogCollectionItem } from '@nuxt/content';

export const blogPagination =  (rawData:BlogCollectionItem[], currentPage:number) =>
    {
        return computed(() => {
            if (!rawData) return [];
        const n = 3;
        const data = mapBlogData(rawData);

        const start = (currentPage - 1) * n;
        const end = start + n;
        return !!data ? data.slice(start, end) : null;
    });
}
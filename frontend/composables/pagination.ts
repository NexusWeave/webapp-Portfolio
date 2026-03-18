import { mapBlogData } from './maps/blogPost';

import type { DevPostsCollectionItem } from '@nuxt/content';

export const blogPagination =  (rawData:DevPostsCollectionItem[], currentPage:number, n:number = 2) =>
    {
        if (!rawData) return [];
        const data = mapBlogData(rawData);

        const start = (currentPage - 1) * n;
        const end = start + n;
        return !!data ? data.slice(start, end) : null;
    }
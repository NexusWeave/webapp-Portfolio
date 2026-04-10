import { mapBlogData } from './maps/mapBlogPost';

import type { DevPostsCollectionItem } from '@nuxt/content';

export const blogPagination =  (rawData:DevPostsCollectionItem[], currentPage:number, n:number) =>
    {
        if (!rawData) return [];
        const data = mapBlogData(rawData).filter(post => post.isPublished);
        const start = (currentPage - 1) * n;
        const end = start + n;
        return !!data ? data.slice(start, end) : null;
    }
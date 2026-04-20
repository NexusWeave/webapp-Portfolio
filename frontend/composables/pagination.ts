import type { PostItem } from '~/types/documents';

import type { DevPostsCollectionItem } from '@nuxt/content';

export const blogPagination =  (data:PostItem[], currentPage:number, n:number, label:string = 'blog-post') =>
    {
        if (!data) return [];
        
        const start = (currentPage - 1) * n;
        const end = start + n;
        const filteredData = data.filter(post => post.isPublished && post.tags.some(t => t.labels?.includes(label)));
        return !!filteredData ? filteredData.slice(start, end) : null;
    }
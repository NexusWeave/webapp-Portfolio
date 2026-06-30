import type { DateItem } from '~/types/date';
import type { PostItem, PostTag } from '~/types/documents';
import type { DevPostsCollectionItem } from '@nuxt/content';

export const generatePostTags = (id: string[], dir: string): PostTag[] => {
    const misc = 'misc';
    const miscTag = { name: misc, cls: [misc], type: ['tag', 'dir'], href: `${dir}/tags/${misc}`, path: misc, label: 'Misc', labels: [misc, 'blog-post'] };
    const listOfAvailableTags = ['project', 'support', 'os', 'devops', 'rd', 'mentalt-vedlikehold' ];
    const index:number = id.findIndex(p => listOfAvailableTags.includes(p.toLowerCase()));

    if (index === -1 || !id[index]) return [miscTag];

    const result: PostTag[] = [];

    // Generate a tag for every folder level from the matched root folder
    for (let i = index; i < id.length; i++) {
        const currentLabel = id[i];
        if (!currentLabel) continue;
        const name = currentLabel.toLowerCase();
        result.push({ name: name, cls: [name], path: name, type: ['tag', 'dir'], href: `${dir}/tags/${name}`, labels: [name, 'blog-post'], label: !listOfAvailableTags.includes(name) ? currentLabel.charAt(0).toUpperCase() + currentLabel.slice(1).replace(/-/g, ' ') : currentLabel });
    }

    return result.length > 0 ? result : [miscTag];
};

export const mapBlogData = (data: DevPostsCollectionItem[]): PostItem[] => {
        if (!data) return [];
        data = data.sort((a, b) => { const dateA = new Date(a.date); const dateB = new Date(b.date); return dateB.getTime() - dateA.getTime(); });

        const today = new Date();
        
        return data.map((item, index) => {
            const id = item.id.split('/').filter(p => !!p);
            const date:DateItem = {date: item.date};
            const isPublished = new Date(item.date) <= today;
            const path = id.pop()?.replace('.md', '').toLowerCase();

            const dir = '/logs';
            const tags:PostTag[] = generatePostTags(id, dir);

            return { id: index, path: path!, tags: tags, status: item.status!, body: item.body ?? {}, ingress: item.ingress, sources: item.sources, isArchived: index > 4, title: item.title ?? '', isPublished: isPublished, date: setDateFormat(date), anchor: [{ type: ['router'], path: `${dir}/records/${path}`, label: 'Les mer', cls: ['read-more-btn'] }] }
        });
    };
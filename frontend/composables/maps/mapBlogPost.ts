import type { DateItem } from '~/types/date';
import type { PostItem, PostTag } from '~/types/documents';
import type { DevPostsCollectionItem } from '@nuxt/content';

const generatePostTags = (id: string[], dir: string): PostTag[] => {
    const misc = 'misc';
    const miscTag = { name: misc, cls: ['misc'], type: ['tag', 'dir'], href: `${dir}/tags/misc`, path: 'misc', label: 'Misc', labels: ['misc', 'blog-post'] };
    const listOfAvailableTags = ['project', 'support', 'os', 'devops', 'rd', 'mentalt-vedlikehold' ];
    const index:number = id.findIndex(p => listOfAvailableTags.includes(p.toLowerCase()));

    if (index === -1 || !id[index]) return [miscTag];

    const folder:string = id[index].toLowerCase();

    if (folder === 'support') {
        const result: PostTag[] = [];
        for (let i = index; i < id.length; i++) {
            const currentLabel = id[i];
            if (!currentLabel) continue;
            const name = currentLabel.toLowerCase();
            result.push({
                name: name, cls: [name], type: ['tag', 'dir'],
                href: `${dir}/tags/${name}`, path: name,
                label: !listOfAvailableTags.includes(name) ? currentLabel.charAt(0).toUpperCase() + currentLabel.slice(1).replace(/-/g, ' ') : currentLabel,
                labels: [name, 'blog-post']
            });
        }
        return result.length > 0 ? result : [miscTag];
    } else {
        const originalFolder:string = id[index];
        const label: string = folder === 'project' ? `${id[index + 1]}` : originalFolder;
        const name: string = label ? label.toLowerCase() : misc;
        
        return [{
            name: name, cls: [name], type: ['tag', 'dir'],
            href: `${dir}/tags/${name}`,  path: name,
            label: `${!listOfAvailableTags.includes(name) ? label.charAt(0).toUpperCase() + label.slice(1)?.replace(/-/g, ' ') : label}`,
            labels: [name , 'blog-post']
        }];
    }
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
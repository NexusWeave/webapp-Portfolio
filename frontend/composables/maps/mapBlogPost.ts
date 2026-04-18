import type { DateItem } from '~/types/date';
import type { PostItem, PostTag } from '~/types/documents';
import type { DevPostsCollectionItem } from '@nuxt/content';

export const mapBlogData = (data: DevPostsCollectionItem[]): PostItem[] => {
        if (!data) return [];
        data = data.sort((a, b) => { const dateA = new Date(a.date); const dateB = new Date(b.date); return dateB.getTime() - dateA.getTime(); });

        const today = new Date();
        
        return data.map((item, index) => {
            const id = item.id.split('/')
            const date:DateItem = {date: item.date};
            const isPublished = new Date(item.date) <= today;
            const path = id.pop()?.replace('.md', '').toLowerCase();

            const dir = '/logs';
            const tags:PostTag = (() =>
                    {
                        const misc = 'misc';
                        const listOfAvailableTags = ['project', 'support', 'os', 'devops', 'rd', 'mentalt-vedlikehold' ];
                        const index:number = id.findIndex(p => listOfAvailableTags.includes(p.toLowerCase()));
                        
                        
                        if (!id[index]) return { name: misc, cls: ['misc'], type: ['tag', 'dir'], href: `${dir}/tags/misc`, path: 'misc', label: 'Misc' };

                        const folder:string = id[index].toLowerCase() ?? misc;
                        
                        const label: string = listOfAvailableTags.includes(folder) ? folder == 'project' || folder == 'support' ? `${id[index + 1]}` : folder : misc;
                        const name = label ? label.toLowerCase() : misc;
                        
                        return {
                            name: name, cls: [name], type: ['tag', 'dir'],
                            href: `${dir}/tags/${name}`,  path: id.pop()?.toLowerCase(),
                            label: `${label && !listOfAvailableTags.includes(name) ? name.charAt(0).toUpperCase() + name.slice(1)?.replace(/-/g, ' ') : label}` };
                    })();

            return {
                id: index,
                path: path!,
                tags: [tags!],
                status: item.status!,
                body: item.body ?? {},
                ingress: item.ingress,
                sources: item.sources,
                isArchived: index > 4,
                title: item.title ?? '',
                isPublished: isPublished,
                date: setDateFormat(date),
                anchor: [{ type: ['router'], path: `${dir}/records/${path}`, label: 'Les mer', cls: ['read-more-btn'] }]
            }
        });
    };
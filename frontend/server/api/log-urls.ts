import { queryCollection } from "@nuxt/content/server";
import type { DevPostsCollectionItem } from "@nuxt/content";


export async function fetchCollection<T>(event: any, path: any) { return await queryCollection(event, path).all() }

const mapBlogData = (data: DevPostsCollectionItem[]) => {
        if (!data) return [];
        data = data.sort((a, b) => { const dateA = new Date(a.date); const dateB = new Date(b.date); return dateB.getTime() - dateA.getTime(); });

        let AUTOINCREMENT = 0;
        return data.map((item) => {
            const id = item.id.split('/')
            const date = new Date(item.date);
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
                date: date, path: path, tags: [tags],
                title: item.title, id: AUTOINCREMENT++,
                body: item.body ?? '', status: item.status ?? '',
                sources: item.sources ?? '', ingress: item.ingress ?? '',
                anchor: [{ href: `logs/records/${path}`, label: 'Les mer' }]
            }
        });
    }

export default defineEventHandler(async (event) => {
    const devPostPath = 'devPosts';
    const rawDevPosts = await fetchCollection(event, devPostPath) as DevPostsCollectionItem[]
    const devPosts = mapBlogData(rawDevPosts)


    const mappedPosts = [...devPosts]
    return mappedPosts.map(post => ({
        loc: `${post.anchor[0]?.href}`,
        lastmod: post.date,
    }))
})
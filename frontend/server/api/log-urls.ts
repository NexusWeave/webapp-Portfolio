import { DevPostsCollectionItem } from "@nuxt/content";
export async function fetchCollection<T>(event, path:string)
{
     return await queryCollection(event, path).all()
}

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
                path: path,
                tags: [tags],
                title: item.title,
                id: AUTOINCREMENT++,
                star: item.star ?? '',
                body: item.body ?? '',
                date: date,
                parade: item.parade ?? '',
                ingress: item.ingress ?? '',
                sources: item.sources ?? '',
                anchor: [{ href: `artikkel/${path}`, label: 'Les mer' }]
            }
        });
    }

export default defineEventHandler(async (event) => {
    const devPostPath = 'devPosts';
    const rawDevPosts = await fetchCollection(event, devPostPath) as DevPostsCollectionItem[]
    const devPosts = mapBlogData(rawDevPosts)

    const personalPostPath = 'personalPosts';
    const rawPersonalPosts = await fetchCollection(event, personalPostPath) as DevPostsCollectionItem[]
    const personalPosts = mapBlogData(rawPersonalPosts)


    const mappedPosts = [...devPosts, ...personalPosts]
    return mappedPosts.map(post => ({
        loc: `${post.anchor[0]?.href}`,
        lastmod: post.date,
    }))
})
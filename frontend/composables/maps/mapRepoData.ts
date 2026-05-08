import { setDateFormat } from '#imports';
import type { RepositoryData, GithubData, LanguageData } from "@/types/props";

export function mapRepoData(data: RepositoryData): GithubData[]
{
        const repositories = [...data].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return repositories.map((item: any) => {
        const languages = [...(item.languages ?? [])].sort((a: any, b: any) => b.bytes - a.bytes);

        const validIcons = ['c', 'cp', 'cs', 'css', 'cython', 'dockerfile', 'flask', 'fortran', 'git', 'go', 'hack', 'html', 'javascript', 'jinja', 'jupyter', 'lua', 'makefile', 'meson', 'mssql', 'nunjuncks', 'nuxt', 'php', 'powershell', 'python', 'roff', 'sass', 'scratch', 'shell', 'smarty', 'sqlite', 'tinacms', 'typescript', 'vue'];

        const media = languages.map((lang: LanguageData) => {
            const hasIcon = validIcons.includes(lang.label.toLowerCase());
            return { type: 'svg', caption: ' ', alt: ` Visual Representation of ${lang.label}`, "src": hasIcon ? `/media/tech-lang-icons/${lang.label.toLowerCase()}.svg` : "", 
            "srcset": hasIcon ? `/media/tech-lang-icons/${lang.label.toLowerCase()}.svg ` : ""
        }
            });
        const date = setDateFormat({date: item.created_at, updated: item.updated});
        const anchor = item.anchor.map((aItem: any) => { return { id: aItem.id, href: aItem.href, type: [aItem.name] }});
        
        return {
            date : date,
            media: media,
            anchor: anchor,
            name: item.name,
            id: item.repo_id,
            flags: item.flags,
            owner: item.owner,
            languages: languages,
            description: item.description,
            collaborators: item.collaborators ?? [],
            label: item.label.split('-')[1] || item.label,
        }
    });
}
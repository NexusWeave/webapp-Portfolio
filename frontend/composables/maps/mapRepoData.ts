import { setDateFormat } from '#imports';
import type { RepositoryData, GithubData, LanguageData } from "@/types/props";

export function mapRepoData(data: RepositoryData): GithubData[]
{
        const repositories = [...data].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return repositories.map((item: RepositoryItem) => {
        const languages = [...(item.languages ?? [])].sort((a: any, b: any) => b.bytes - a.bytes);

        const validIcons = ['batchfile', 'c', 'cp', 'cs', 'css', 'cython', 'dockerfile', 'flask', 'fortran', 'git', 'go', 'hack', 'html', 'javascript', 'jinja', 'jupyter', 'liquid', 'lua', 'makefile', 'meson', 'mssql', 'nunjucks', 'nuxt', 'php', 'powershell', 'python', 'roff', 'sass', 'scratch', 'shell', 'smarty', 'sqlite', 'tinacms', 'typescript', 'vue'];

        const media = languages.map((lang: any) => {
            const label = lang.label.toLowerCase();
            const hasIcon = validIcons.includes(label);
            const src = hasIcon ? `/media/tech-lang-icons/${label}.svg` : "";
            
            return { 
                type: 'image/svg+xml', 
                caption: ' ', 
                alt: ` Visual Representation of ${lang.label}`, 
                src: src,
                srcset: src
            }
        });
        const date = setDateFormat({date: item.created_at, updated: null});
        
        // Reconstruct anchor as backend doesn't provide it
        const anchor = [
            { 
                id: `github-${item.id}`, 
                href: `https://github.com/${item.owner}/${item.label}`, 
                type: ['github'] 
            }
        ];
        
        return {
            date : date,
            media: media,
            anchor: anchor,
            name: item.label,
            id: String(item.id),
            flags: item.stack || {},
            owner: item.owner,
            owner_url: item.owner_url,
            languages: languages as any,
            description: item.description,
            collaborators: item.collaborators ?? [],
            label: item.label.split('-')[1] || item.label,
        }
    });
}
import { setDateFormat } from '#imports';
import type { RepositoryData, GithubData, LanguageData } from "@/types/props";

export function mapRepoData(data: RepositoryData): GithubData[]
{
    const repositories = [...data].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return repositories.map((item: any) => {
        const languages = [...(item.languages || [])].sort((a: any, b: any) => (b.bytes || 0) - (a.bytes || 0));

        const validIcons = ['batchfile', 'c', 'cp', 'cs', 'css', 'cython', 'dockerfile', 'flask', 'fortran', 'git', 'go', 'hack', 'html', 'javascript', 'jinja', 'jupyter', 'liquid', 'lua', 'makefile', 'meson', 'mssql', 'nunjucks', 'nuxt', 'php', 'powershell', 'python', 'roff', 'sass', 'scratch', 'shell', 'smarty', 'sqlite', 'tinacms', 'typescript', 'vue'];

        const media = languages.map((lang: any) => {
            const label = String(lang.label || "").toLowerCase();
            const hasIcon = validIcons.includes(label);
            const src = hasIcon ? `/media/tech-lang-icons/${label}.svg` : "";
            
            return { 
                type: 'image/svg+xml', 
                caption: ' ', 
                alt: ` Visual Representation of ${label}`, 
                src: src,
                srcset: src
            }
        });
        
        const date = setDateFormat({date: item.created_at, updated: null});
        
        const forbiddenWords = ['webapp', 'nexus', 'database', 'mariadb', 'py', 'django', 'cms', 'flask', 'vupy', 'console'];
        const cleanedLabel = item.label
            .split(/[-_]/)
            .filter((part: string) => !forbiddenWords.includes(part.toLowerCase()))
            .join(' ');

        return {
            id: String(item.id),
            label: cleanedLabel || item.label,
            date : date as { date: string },
            media: media,
            anchor: item.anchor || [],
            flags: item.flags || {},
            owner: item.owner,
            owner_url: item.owner_url,
            languages: languages,
            description: item.description,
            collaborators: item.collaborators || [],
        }
    });
}
import { setDateFormat } from '#imports';
import type { RepositoryData, GithubData, LanguageData } from "@/types/props";

export function mapRepoData(data: RepositoryData): GithubData[]
{
        const repositories = [...data].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return repositories.map((item: any) => {
        const rawLanguages = item.languages || item.lang_assosiations || [];
        const languages = [...rawLanguages].sort((a: any, b: any) => {
            const bytesA = a.bytes || a.code_bytes || 0;
            const bytesB = b.bytes || b.code_bytes || 0;
            return bytesB - bytesA;
        });

        const validIcons = ['batchfile', 'c', 'cp', 'cs', 'css', 'cython', 'dockerfile', 'flask', 'fortran', 'git', 'go', 'hack', 'html', 'javascript', 'jinja', 'jupyter', 'liquid', 'lua', 'makefile', 'meson', 'mssql', 'nunjucks', 'nuxt', 'php', 'powershell', 'python', 'roff', 'sass', 'scratch', 'shell', 'smarty', 'sqlite', 'tinacms', 'typescript', 'vue'];

        const media = languages.map((lang: any) => {
            const rawLabel = lang.label || lang.language || "";
            const label = String(rawLabel).toLowerCase();
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
        
        return {
            date : date as any,
            media: media,
            anchor: item.anchor || [],
            name: item.label,
            id: String(item.id || item.repo_id),
            flags: item.flags || item.stack || {},
            owner: item.owner,
            owner_url: item.owner_url,
            languages: languages as any,
            description: item.description,
            collaborators: item.collaborators ?? [],
            label: item.label.split('_')[0] || item.label,
        }
    });
}
import { setDateFormat } from '#imports';
import { validIcons, forbiddenWords } from "@/utils/techStack";
import type { RepositoryData, GithubData, LanguageData } from "@/types/props";

export function mapRepoData(data: RepositoryData): GithubData[]
{
    if (!data) return [];

    const repositories = [...data].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return repositories.map((item: any) => {
        const rawLanguages = item.languages || item.lang_assosiations || [];
        const languages = [...rawLanguages].sort((a: any, b: any) => {
            const bytesA = a.bytes || a.code_bytes || 0;
            const bytesB = b.bytes || b.code_bytes || 0;
            return bytesB - bytesA;
        });

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
        
        const cleanedLabel = item.label
            .split(/[-_]/)
            .filter((part: string) => !forbiddenWords.includes(part.toLowerCase()))
            .join(' ');

        return {
            media: media,
            owner: item.owner,
            id: String(item.id),
            languages: languages,
            flags: item.flags || {},
            anchor: item.anchor || [],
            owner_url: item.owner_url,
            description: item.description,
            date : date.current,
            label: cleanedLabel || item.label,
            collaborators: item.collaborators || [],
            contribution_ratio: item.contribution_ratio,
        }
    });
}
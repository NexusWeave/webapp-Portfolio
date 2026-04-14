import { setDateFormat } from '#imports';
import { useLanguageStore } from '@/stores/languageBytesStore';
import type { RepositoryData, GithubData, LanguageData } from "@/types/props";

export function mapRepoData(data: RepositoryData): GithubData[]
{
    data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    return data.map((item:any) => {
        const languages = item.languages.sort((a: any, b: any) => b.bytes - a.bytes);

        const { increment } = useLanguageStore();
        for (let j = 0; j < languages.length; j++)
        {
            const lang = languages[j];
            if (lang && lang.label && lang.bytes) increment(lang.label, lang.bytes);
        }

        
        const media = languages.map((lang: LanguageData) => {
            
            return { type: 'svg', caption: ' ', alt: ` Visual Representation of ${lang.label}`, "src": `/media/tech-lang-icons/${lang.label.toLowerCase()}.svg`, 
            "srcset": `/media/tech-lang-icons/${lang.label.toLowerCase()}.svg `
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
            languages: item.languages,
            description: item.description,
            collaborators: item.collaborators ?? [],
            label: item.label.split('-')[1] || item.label,
        }
    });
}
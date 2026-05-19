import type { DateItem } from "./date";
import type { FigureItem } from "./media";
import type { AnchorItem } from "./navigation";


interface RepositoryBase
{
    label: string;
    owner: string;
    owner_url?: string;
    description: string;
    flags?: Record<string, boolean>;
    collaborators?: { name: string; profile_url: string; }[];
    languages?: GithubRepoLanguage[];
}


interface ProgressItem extends LanguageData { type: string; percentage: number; original?: number; }

export interface LanguageData { label?: string; language?: string; bytes?: number; code_bytes?: number; }
export interface RepositoryData extends Array<RepositoryItem> {}
export interface ProgressProps { data: ProgressItem; cls?: string[]; }
export interface GithubRepoLanguage extends LanguageData { img?: FigureItem[];}
export interface GithubData extends Omit<RepositoryBase, 'flags' | 'collaborators' | 'languages'> { 
    id: string; 
    label: string; 
    date: { date: string }; 
    flags: Record<string, boolean>; 
    anchor: AnchorItem[]; 
    languages: GithubRepoLanguage[];
    collaborators: { name: string; profile_url: string; }[];
}
export interface RepoProps { data: GithubData; cls?: Array<string | string[] | Array<string | string[]>>; }
export interface RepositoryItem extends RepositoryBase { id?: number; repo_id?: number; created_at: string; anchor?: AnchorItem[]; date?: { date: string }; }
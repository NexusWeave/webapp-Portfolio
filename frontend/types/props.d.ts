import type { DateItem } from "./date";
import type { FigureItem } from "./media";
import type { AnchorItem } from "./navigation";


interface RepositoryBase
{
    name: string;
    owner: string;
    owner_url?: string;
    description: string;
    anchor: AnchorItem[];
    collaborators?: { name: string; profile_url: string; }[];
    flags: Record<string, boolean>;
    languages?: GithubRepoLanguage[];
}


interface ProgressItem extends LanguageData { type: string; percentage: number; original?: number; }

export interface LanguageData { label: string; bytes: number; }
export interface RepositoryData extends Array<RepositoryItem> {}
export interface ProgressProps { data: ProgressItem; cls?: string[]; }
export interface GithubRepoLanguage extends LanguageData { img: FigureItem[];}
export interface GithubData extends RepositoryBase { id: string; label: string; date: DateItem; }
export interface RepoProps { data: GithubData; cls?: Array<string | string[] | Array<string | string[]>>; }
export interface RepositoryItem extends RepositoryBase { label: string; repo_id: string; created_at: string; }
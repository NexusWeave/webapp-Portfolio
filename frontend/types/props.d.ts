import type { Dateitem } from "./date";
import type { FigureItem } from "./figure";
import type { AnchorItem } from "./navigation";


interface RepositoryBase
{
    name: string;
    owner: string;
    description: string;
    anchor: AnchorItem[];
    collaborators?: string[];
    flags: Record<string, boolean>;
    languages?: GithubRepoLanguage[];
}


interface ProgressItem extends LanguageData { type: string; percentage: number; }

export interface LanguageData { label: string; bytes: number; }
export interface RepositoryData extends Array<RepositoryItem> {}
export interface ProgressProps { data: ProgressItem; cls?: string[]; }
export interface GithubRepoLanguage extends LanguageData { img: FigureItem[];}
export interface GithubData extends RepositoryBase { id: string; label: string; date: DateItem; }
export interface RepoProps { data: GithubRepo; cls?: Array<string | string[] | Array<string | string[]>>; }
export interface RepositoryItem extends RepositoryBase { label: string; repo_id: string; created_at: string; }
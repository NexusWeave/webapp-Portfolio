import type { Dateitem } from "./date";
import type { FigureItem } from "./figure";
import type { AnchorItem } from "./navigation";

export interface AIContext { source: string; content: string; }
export interface jsonResponse { code: string; data: AIContext[] | RepositoryBase; }

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




export interface LanguageData { label: string; bytes: number; }

export interface GithubRepoLanguage extends LanguageData { img: FigureItem[];}
export interface GithubData extends RepositoryBase { id: string; label: string; date: DateItem; }
export interface RepoProps { data: GithubData; cls?: Array<string | string[] | Array<string | string[]>>; }
export interface RepositoryData extends RepositoryBase { label: string; repo_id: string; created_at: string; }



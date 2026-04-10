import type { DateObject } from "./date";
import type { FigureItem } from "./figure";
import type { AnchorItem } from "./navigation";


export interface GithubData
{
    label: string;
    owner: string;
    name : string[];
    repo_id: string;
    date: DateObject;
    icon: FigureItem[];
    created_at: string;
    description: string;
    anchor: AnchorItem[];
    collaborators?: string[];
    flags: Record<string, boolean>;
    languages: GithubRepoLanguage[];
}
export interface GithubRepoLanguage { img: FigureItem[]; label: string, bytes: number }
export interface RepoProps { data: GithubRepo; cls?: Array<string | string[] | Array<string | string[]>>; }

export interface ProgressProps { value: number; tech?: string; label: string; cls?: string[]; }

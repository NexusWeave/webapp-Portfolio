//  --- Imports ---
import type { TimelineItem } from "./timeline";


//  --- Timeline component ---
export interface TimelineProps
{
    title: string;
    range?: number;
    cls?: Array<any>;
    data: TimelineItem[];
}

export interface FilterProps
{
    cls?: Array<any>;
    data: Record<string, any>;
}

export interface TimelineCardProps
{
    cls?: Array<any>;
    data: TimelineItem;
    isVisible?: boolean;
}


//  --- Misc Props ---
export interface DateYearProps{ data: string; isVisible: boolean; }

export interface listData
{
    title?: string;
    anchor:
    {
        
        href: string;
        label?: string;
        
        cls?: string | string[];
        type?: string | string[];
        img?:
        {
            src: string;
            alt?: string;
        }
    }
}
export interface DateItem
{
    time?: string | null;
    date?: string | null;
    text?: string;
    delimiter?: string;
    updated?: Date | string | null;
}

export interface listProps
{
    title?: string;
    data: listData[];
    cls?: Array<string | string[]>;
}

export interface GithubRepo
{
    
    label: string;
    owner: string;
    label: string;
    name : string[];
    repo_id: string;
    icon: FigureItem[];
    created: string;
    description: string;
    date: Record<string, string>;
    anchor: Record<string, string>;
    languages: Array<{img: FigureItem[]; label: string, bytes: number}>;
}

export interface RepoProps { data: GithubRepo; cls?: Array<string | string[] | Array<string | string[]>>; }

export interface ProgressProps { value: number; tech?: string; label: string; cls?: string[]; }


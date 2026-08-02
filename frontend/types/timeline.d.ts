//  Types for the project
import type { DateObject } from "./date";
import type { AnchorItem} from "./navigation";

export interface TimelineItem
{
    id: number;
    body?: object;
    date: DateObject;
    isVisible: boolean;
    title?: AnchorItem;
    subjects: Subject[];
    location: AnchorItem;
    description?: string | undefined;

    range?:
    {            
        type: string,
        name: string,
        value: string,
        rangeMax: number
    }
}


import type { FigureItem } from "./media";

export interface TechStack { category: string; label: string; }
export interface FilterProps { cls?: Array<any>; data: Record<string, any>; }
export interface Subject {title: AnchorItem; date: DateObject; techStack?: FigureItem[]; body?: string;}
export interface TimelineCardProps { cls?: Array<any>; data: TimelineItem; isVisible?: boolean; }
export interface TimelineProps { title: string; range?: number; cls?: Array<any>; data: TimelineItem[]; }
//  Types for the project
import type { DateObject } from "./date";
import type { Anchor} from "./navigation";

export interface TimelineItem
{
    id: number;
    body?: object;
    date: DateObject;
    isVisible: boolean;
    techStack?: TechStack[];
    location: ReferencePoint;
    reference: ReferencePoint;
    title?: string | undefined;
    organization: ReferencePoint;
    description?: string | undefined;

    range?:
    {            
        type: string,
        name: string,
        value: string,
        rangeMax: number
    }
}

export interface TechStack { category: string; label: string; }
export interface ReferencePoint { name: string; anchor: Anchor; }
export interface FilterProps { cls?: Array<any>; data: Record<string, any>; }
export interface TimelineCardProps { cls?: Array<any>; data: TimelineItem; isVisible?: boolean; }
export interface TimelineProps { title: string; range?: number; cls?: Array<any>; data: TimelineItem[]; }
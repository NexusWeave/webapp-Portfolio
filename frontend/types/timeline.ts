//  Types for the project

import type { Anchor, DateYearProps } from "./props";

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

export interface DateObject
{
    created: string;
    end?: string | null;
    updated?: string | null;
}

export interface TechStack
{
    type: string;
    label: string;
}
export interface ReferencePoint
{
    name: string;
    anchor: Anchor;
}
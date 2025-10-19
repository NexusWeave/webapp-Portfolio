//  Props Definitions

import type { AcademicCollectionItem } from "@nuxt/content";
import type { DateObject } from "./timeline";
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
    isVisible?: boolean;
    data: TimelineItem;
}

//  --- Carousel component ---
export interface CarouselProps
{
    data    : string[],
    buttons? : CarouselButton[],
}

export interface CarouselButton
{
    cls ?  : string,
    icon?    : string,
    exist?   : boolean,
    action  : () => void,    
}

//  --- Misc Props ---
export interface DateYearProps
{
    isVisible: boolean;
    data: string;
}

export interface FigureItem
{
    src     : string,
    alt     : string,
        type?   : string,
        srcset? : string,
        caption? : string,
}
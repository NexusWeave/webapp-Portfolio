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

export interface Anchor
{
    cls?    : string,
    label   : string,
    href    : string,
    type    : string[],
    
}

export interface FigureItem
{
    caption? : string,

    img :
    {
        type    : string,
        src     : string,
        alt     : string,
        srcset? : string,
    }
}

export interface FigureProps
{
    cls?   : string[],
    data    : FigureItem,
}
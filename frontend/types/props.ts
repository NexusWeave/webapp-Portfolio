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
    data    : FigureItem[],
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
    label   : string,
    href    : string,
    type    : string[],
    img?    : FigureItem
    
}

export interface FigureItem
{
    type    : string;
    src     : string;
    alt     : string;
    srcset? : string;
    caption? : string;
}

export interface FigureProps
{
    cls?   : string[],
    data    : FigureItem,
}

export interface listData
{
    title?: string;
    anchor:
    {
        type?: string | string[];
        href: string;
        label?: string;
        cls?: string | string[];
        img?: {
        src: string;
        alt?: string;
    }
}
}
export interface listProps
{
    title?: string;
    data: listData[];
    cls?: Array<string | string[]>;
}

export interface iconProps
{
    cls?: string[];
    label?: string;
}


interface NavProp
{
    totalPage?: number;
    activePage?: number;
    toggle: 'router' | 'anchor' | 'pagination';

    data: Array<Record<string, any>> | Record<string, any>;
    cls?: Array<string | string[] | Array<string | string[]>>;
}
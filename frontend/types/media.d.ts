export interface FigureItem
{
    src : string;
    alt : string;
    type : string;
    srcset? : string;
    caption? : string;
}
export interface iconProps { cls?: string[]; }
export interface FigureProps { cls?   : string[]; data    : Record<FigureItem>; }
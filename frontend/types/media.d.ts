export interface FigureItem
{
    src : string;
    alt : string;
    type : string;
    label? : string;
    srcset? : string;
    caption? : string;
    width? : number | string;
    height? : number | string;
}
export interface iconProps { cls?: string[]; label?: string; }
export interface FigureProps { cls?   : string[]; data    : FigureItem; }
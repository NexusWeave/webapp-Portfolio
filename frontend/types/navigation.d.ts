export interface RouterItem
{
    type: string[];
    path: string;
    order: number;
    label: string;
    anchor?: Anchor;
}
export interface Anchor
{
    href: string[];
    label?: string;
    type: string[];
    img?: FigureItem;
}
export interface FigureItem
{
    src: string;
    alt: string;
    type: string;
    srcset?: string;
    caption?: string;
}

interface NavigationItem
{
    
    id?: string;
    type: string;
    path?: string;
    label?: string;
    anchor: Anchor;
}

export interface NavigationProp
{
    cls?: string[] | Array<string[]>;
    
    data?: NavigationItem | NavigationItem[] | RouterItem[];
}

export interface ButtonItem
{
    cls?: string[];
    label?: string;
    anchor?: Anchor;
    action?: () => void;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
}
export interface ButtonProps
{
    cls?: string[];
    data: ButtonItem
}
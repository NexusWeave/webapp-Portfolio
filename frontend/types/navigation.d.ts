import type { FigureItem } from '~/types/media';

interface BaseItem { id?: string; label?: string; cls?: string[]; type?: string[]; }

export interface RouterItem extends BaseItem { path: string; order?: number; }
export interface AnchorItem extends BaseItem { href: string; media?: FigureItem; isDownload?: boolean; isDisabled?: boolean;}
export interface ButtonItem extends BaseItem { disabled?: boolean; anchor?: AnchorItem; action?: () =>  number | void; type?: "submit" | "reset"; }

export interface ButtonProps { cls?: string[]; data: ButtonItem; }
export interface AnchorProps { data:  AnchorItem; cls?: string[]; }
export interface NavigationProp { cls?: string[]; data:  (AnchorItem[] | RouterItem[]); }
export interface PaginationProps { activePage?: number; totalPage?: number; cls?: string[]; }

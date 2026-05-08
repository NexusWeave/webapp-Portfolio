//  Importing types
import type Anchor from '~/types/navigation/anchor';
import type { FigureItem, DocumentItem } from './media';
import type { DateItem } from './dates';
import type { PostItem } from './documents';

export interface NewsItem
{
    title: string;
    ingress: string;
    hovedinnhold: string;
    img?:
    {
        src: string;
        alt: string;
        srcset?: string;
        caption?: string;
    };
    caption?: string;
    date?: string;
}

export interface Article
{
    id: number;
    name?: string;
    title: string;
    date: DateItem;
    archive: boolean;
    anchor: Anchor[];
    cta: CallToAction[] | null;
    section: Record<string, any>;
    ingress: Record<string, any>;
}

interface TagItem { label: string; anchor: Anchor; }

//  Props interfaces
export interface TagProps { data: TagItem; cls?: string[]; }
export interface BodyProps { data: Record<string, any> | null; }
export interface HeaderProps { article: PostItem; isPost?: boolean; cls?: string[] | string; }

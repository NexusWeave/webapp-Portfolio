//  Importing types
import type Anchor from '~/types/navigation/anchor';
import type { FigureItem, DocumentItem } from './media';
import type { DateItem } from './dates';

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

//  Props interfaces
export interface TagProps { data: TagItem; cls?: string[]; }
export interface BodyProps { data: Record<string, any> | null; }

interface TagItem { label: string; anchor: Anchor; }

export interface ArticleProps
{
    data: Article;
    isNewsPage?: boolean;
    isArticlePage?: boolean;
    cls?: string[];
}

export interface HeaderProps
{
    article: any;
    isNewsPage?: boolean;
    isArticlePage?: boolean;
    cls?: string[] | string;
}

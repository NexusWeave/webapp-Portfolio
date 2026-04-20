//  --- Import types logic

import type { Anchor } from '~/types/anchor';

interface DocumentItem { id: number; title: string; body: Record<string, any>; anchor: Anchor; }

export interface ReferenceItem extends DocumentItem {}
export interface PostTag { name: string; href: string; label: string; cls: string[];  type: string[]; labels?:string[] };
export interface PostItem extends DocumentItem {  tags: PostTag[]; path: string;  anchor: Anchor; date: DateItem;  status: string; ingress: string; sources?: string;  isArchived: boolean; isPublished: boolean; }
export interface PostProps { data: PostItem ; cls?: string[]; }

//  --- Import types logic

import type { Anchor } from '~/types/anchor';

interface DocumentItem { id: number; title: string; body: Record<string, any>; anchor: Anchor; }

export interface ReferenceItem extends DocumentItem {}
export interface PostTag { name: string; href: string;  label: string; cls: string[];  type: string[]; };
export interface PostItem extends DocumentItem {  path: string;  anchor: Anchor; date: DateItem;  status: string; ingress: string; sources?: string; isPublished: boolean; tags: PostTag[]; }

import type { MaybeRefOrGetter } from 'vue';

export interface PostMeta {
    title?: string;
    image?: string;
    keywords?: string[];
    description?: string;
}

export interface SeoOptions {
  title?: MaybeRefOrGetter<string | undefined>;
  image?: MaybeRefOrGetter<string | undefined>;
  urlPath?: MaybeRefOrGetter<string | undefined>;
  description?: MaybeRefOrGetter<string | undefined>;
  datePublished?: MaybeRefOrGetter<string | undefined>;
  type?: MaybeRefOrGetter<'website' | 'article' | undefined>;
}
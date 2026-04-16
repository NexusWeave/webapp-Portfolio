//  --- Imports & Zod Schema Definitions
import { z } from 'zod';
import { defineCollection, defineContentConfig } from '@nuxt/content';


const referencesCollection = z.object({ link: z.string(), title: z.string(), body: z.strictObject({}), });
const profileCollection = z.object({ title: z.string(),  createdts: z.string(), updatedts: z.string().optional() });

const achievementsCollection = z.object({
    tag: z.string(),
    title: z.string(),
    created: z.string(),
    end: z.string().optional().nullable(),
    updated: z.string().optional().nullable(),
    isVisible: z.boolean().optional(),
    organization: z.string(),
    org_link: z.string().optional(),
    body: z.strictObject({}).optional(),
    location: z.string().optional(),
    loc_link: z.string().optional(),
    references: z.string().optional(),
    ref_link: z.string().optional(),
    techStack: z.array(z.string()).optional(),
});

const blogCollection = z.object({
    date:z.string(),
    title: z.string(),
    body: z.strictObject({}),
    ingress: z.string(),
    status: z.string().optional(),
    sources: z.string().optional()
})

const profileInformationCollection = z.object({ date:z.string(), title: z.string(), coop: z.string(), summary: z.string(), body: z.strictObject({}) })
// defineContentConfig & collections definition
export default defineContentConfig({
  collections: 
  {
    'reference': defineCollection( { type: 'data', schema: referencesCollection, source: 'references/*.md' }),
    'devPosts': defineCollection( { type: 'page', schema: blogCollection, source: 'posts/technical/**/*.md', }),
    'personalPosts': defineCollection( { type: 'page', schema: blogCollection, source: 'posts/personal/**/*.md' } ),
    'academic': defineCollection( { type: 'data', schema: achievementsCollection, source: 'achievements/academic/*.md' }),
    'profileInfo': defineCollection( { type: 'page', schema: profileInformationCollection, source: 'profiles/*.md' }),
    'achievements': defineCollection( { type: 'page', schema: achievementsCollection, source: 'achievements/achievements/*.md' }),
  
    // 'content' Standard Collection definition
    content: defineCollection({ type: 'page', source: '**/*.md', }),
  },
});
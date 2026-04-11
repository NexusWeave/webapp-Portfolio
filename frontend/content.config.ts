//  --- Imports & Zod Schema Definitions
import { z } from 'zod';
import { defineCollection, defineContentConfig } from '@nuxt/content';


const referencesCollection = z.object({ link: z.string(), title: z.string(), quote: z.string() });
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


// defineContentConfig & collections definition
export default defineContentConfig({
  collections: 
  {
    'devPosts': defineCollection( { type: 'page', schema: blogCollection, source: 'posts/dev/**/*.md', }),
    'devProfile': defineCollection( { type: 'page', schema: profileCollection, source: 'profiles/dev/*.md' }),
    'personalPosts': defineCollection( { type: 'page', schema: blogCollection, source: 'posts/personal/**/*.md' } ),
    'reference': defineCollection( { type: 'data', schema: referencesCollection, source: 'quotes/references/*.md' }),
    'academic': defineCollection( { type: 'data', schema: achievementsCollection, source: 'achievements/academic/*.md' }),
    'personalProfile': defineCollection( { type: 'page', schema: profileCollection, source: 'profiles/personal-profiles/*.md' }),
    'achievements': defineCollection( { type: 'page', schema: achievementsCollection, source: 'achievements/achievements/*.md' }),

    // 'content' Standard Collection definition
    content: defineCollection({ type: 'page', source: '**/*.md', }),
  },
});
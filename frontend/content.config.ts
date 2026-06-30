//  --- Imports & Zod Schema Definitions
import { z } from 'zod';
import { defineCollection, defineContentConfig } from '@nuxt/content';


const referencesCollection = z.object({ link: z.string(), title: z.string(), body: z.strictObject({}), });

const achievementsCollection = z.object({
    title: z.string(),
    created: z.any().optional(),
    isVisible: z.boolean().optional(),
    org_link: z.string().optional(),
    body: z.strictObject({}).optional(),
    end: z.any().optional(),
    location: z.string().optional(),
    loc_link: z.string().optional(),
    references: z.string().optional(),
    ref_link: z.string().optional(),
    subjects: z.array(z.object({
        title: z.string(),
        body: z.string().optional(),
        created: z.any().optional(),
        end: z.any().optional(),
        techStack: z.array(z.string()).optional(),
        ref_link: z.string().optional(),
    })).optional(),
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

const profileInformationCollection = z.object({ id: z.string(), date: z.string(), title: z.string(), coop: z.string(), summary: z.string(), path: z.string(), stem: z.string(), body: z.strictObject({}) })

// defineContentConfig & collections definition
export default defineContentConfig({
  collections: 
  {
    'reference': defineCollection( { type: 'data', schema: referencesCollection, source: 'references/*.md' }),
    'devPosts': defineCollection( { type: 'page', schema: blogCollection, source: 'posts/**/*.md', }),
    'academic': defineCollection( { type: 'data', schema: achievementsCollection, source: 'timeline/*.md' }),
    'timeline': defineCollection( { type: 'data', schema: achievementsCollection, source: 'timeline/*.md' }),
    'profileInfo': defineCollection( { type: 'page', schema: profileInformationCollection, source: 'profiles/*.md' }),
  
    // 'content' Standard Collection definition
    content: defineCollection({ type: 'page', source: '**/*.md', }),
  },
});
import { describe, it, expect } from 'vitest';
import { z } from 'zod';

//  --- Re-use Zod schemas matching content.config.ts
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
    date: z.string(),
    title: z.string(),
    body: z.strictObject({}),
    ingress: z.string(),
    image: z.string().optional(),
    status: z.string().optional(),
    sources: z.string().optional(),
    meta: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        image: z.string().optional(),
        keywords: z.array(z.string()).optional()
    }).optional()
});

const profileInformationCollection = z.object({ 
    id: z.string(), 
    date: z.string(), 
    title: z.string(), 
    coop: z.string(), 
    summary: z.string(), 
    path: z.string(), 
    stem: z.string(), 
    body: z.strictObject({}) 
});

describe('CMS & Content Schema Integration Tests', () => {
    describe('blogCollection Zod Schema', () => {
        it('should pass validation for valid blog post metadata', () => {
            const validPost = {
                date: '2026-08-17',
                title: 'Vue 3 & Nuxt 3 Presentation',
                body: {},
                ingress: 'A comprehensive guide on Vue and Nuxt with TypeScript.',
                status: 'published'
            };
            const result = blogCollection.safeParse(validPost);
            expect(result.success).toBe(true);
        });

        it('should fail validation if required fields (title, date, ingress) are missing', () => {
            const invalidPost = {
                title: 'Missing Date and Ingress',
                body: {}
            };
            const result = blogCollection.safeParse(invalidPost);
            expect(result.success).toBe(false);
        });
    });

    describe('achievementsCollection Zod Schema', () => {
        it('should validate achievement entry with optional subjects and techStack', () => {
            const validAchievement = {
                title: 'BSc Computer Science',
                location: 'University',
                techStack: ['Vue', 'Nuxt', 'TypeScript'],
                subjects: [
                    { title: 'Web Development', techStack: ['HTML', 'CSS', 'JS'] }
                ]
            };
            const result = achievementsCollection.safeParse(validAchievement);
            expect(result.success).toBe(true);
        });
    });

    describe('referencesCollection & profileInformationCollection Zod Schema', () => {
        it('should validate reference item correctly', () => {
            const validRef = {
                link: 'https://krigjo25.no',
                title: 'Portfolio Website',
                body: {}
            };
            expect(referencesCollection.safeParse(validRef).success).toBe(true);
        });

        it('should validate profile information structure', () => {
            const validProfile = {
                id: 'profile-1',
                date: '2026-08-17',
                title: 'Kristoffer Gjøsund',
                coop: 'Freelance',
                summary: 'Fullstack Developer',
                path: '/profiles/kristoffer',
                stem: 'kristoffer',
                body: {}
            };
            expect(profileInformationCollection.safeParse(validProfile).success).toBe(true);
        });
    });
});

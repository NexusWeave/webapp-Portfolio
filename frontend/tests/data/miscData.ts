import type { PostItem } from "~/types/documents";

export const mockBlogData: PostItem[] =[
    {
        id: 0,
        body: {},
        isArchived: false,
        isPublished: true,
        status: "published",
        path: "my-first-post",
        sources: "Self study",
        title: "My First Blog Post",
        ingress: "This is the entry summary of my first blog post.",
        date: { updated: null, time: '13:00', delimiter: 'dot', text: 'Publisert', date: 'tor. 1. jan. 2026' },
        anchor: [ { type: ['router'], label: 'Les mer', cls: ['read-more-btn'], path: '/logs/records/my-first-post' } ],
        tags: [ { name: 'misc', path: 'misc', label: 'Misc', cls: ['misc'], type: ['tag', 'dir'], href: '/logs/tags/misc', labels: ['misc', 'blog-post'] } ],
    },
    {
        id: 1,
        body: {},
        isArchived: false,
        isPublished: true,
        status: "published",
        path: "my-second-post",
        title: "My Second Blog Post",
        ingress: "This is the entry summary of my second blog post.",
        date: { updated: null, time: '13:00', delimiter: 'dot', text: 'Publisert', date: 'tor. 1. jan. 2026' },
        anchor: [ { type: ['router'], label: 'Les mer', cls: ['read-more-btn'], path: '/logs/records/my-second-post' } ],
        tags: [ { name: 'misc', path: 'misc', label: 'Misc', cls: ['misc'], type: ['tag', 'dir'], href: '/logs/tags/misc', labels: ['misc', 'blog-post'] } ],
    },
    {
        id: 2,
        body: {},
        isArchived: false,
        isPublished: true,
        status: "published",
        path: "my-third-post",
        sources: "Self study",
        title: "My Third Blog Post",
        ingress: "This is the entry summary of my third blog post.",
        date: { updated: null, time: '13:00', delimiter: 'dot', text: 'Publisert', date: 'tor. 1. jan. 2026' },
        anchor: [ { type: ['router'], label: 'Les mer', cls: ['read-more-btn'], path: '/logs/records/my-third-post' } ],
        tags: [ { name: 'misc', path: 'misc', label: 'Misc', cls: ['misc'], type: ['tag', 'dir'], href: '/logs/tags/misc', labels: ['misc', 'blog-post'] } ],
    }];

export const mockFetchAPIData = [
    {
        id: 987654,
        label: "test-api-repo",
        owner: "api-owner",
        owner_url: "https://github.com/api-owner",
        description: "A description of the test api repository",
        created_at: "2026-07-02T13:00:00Z",
        flags: {
            isBacked: false
        },
        collaborators: [
            { name: "Collab API", profile_url: "https://github.com/collab-api" }
        ],
        languages: [
            { label: "TypeScript", bytes: 1000 }
        ]
    }
];

export const mockReferenceData = [
    {
        id: 0,
        title: "Test Referanse 1",
        body: {
            type: "root",
            children: [
                {
                    type: "element",
                    tag: "p",
                    props: {},
                    children: [{ type: "text", value: "Dette er en test-referanse." }]
                }
            ]
        },
        anchor: {
            type: ["pdf"],
            href: "/media/docs/test-ref-1.pdf",
            label: " - Test Referanse 1"
        }
    }
];
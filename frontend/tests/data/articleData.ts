import type { PostItem } from '@/types/documents';

export const dummyHeaderData: Partial<PostItem> = {
    title: 'Test Article Title',
    date: {
        id: 1,
        date: '2026-07-27',
        formattedDate: '27. juli 2026'
    },
    ingress: 'Dette er en **test-ingress** for artikkelen.',
    anchor: [
        {
            type: ['internal'],
            href: '/logs/records/test-article',
            label: 'Les mer'
        }
    ],
    tags: [
        {
            name: 'Vue',
            href: '/logs/tags/vue',
            label: 'Vue.js',
            cls: ['bg-vue'],
            type: ['tag']
        }
    ]
};


const dummyBodyItem: Record<string, any> = {
    info: 'Dette er test-info for artikkelen.',
    status: 'Published',
    sources: 'Kilder: [Test Source](https://example.com)',
    cta: [{ href: '/test', label: 'Test CTA' }],
    img: { src: '/test.png', alt: 'Test Image' },
    media: { src: '/video.mp4', type: 'video' },
    body: {
        type: 'root',
        children: [
            {
                type: 'element',
                tag: 'p',
                props: {},
                children: [{ type: 'text', value: 'Dette er brødteksten i testartikkelen.' }]
            }
        ]
    }
};


export const dummyBodyData: Record<string, any>[] = [
    dummyBodyItem,
    { ...dummyBodyItem, img: null, media: null },                                // CTA kun
    { ...dummyBodyItem, cta: null, img: null, media: { src: '/video.mp4', type: 'video' } }, // Media kun
    { body: dummyBodyItem.body }                                                 // Minimal
];

export const dummyPostItem: PostItem = {
    id: 1,
    title: dummyHeaderData.title || '',
    path: '/logs/records/test-article',
    date: dummyHeaderData.date!,
    status: dummyBodyItem.status,
    ingress: dummyHeaderData.ingress || '',
    info: dummyBodyItem.info,
    sources: dummyBodyItem.sources,
    body: dummyBodyItem.body,
    anchor: dummyHeaderData.anchor as any,
    tags: dummyHeaderData.tags!,
    isArchived: false,
    isPublished: true
};

// Testdata for Page.vue (dekker Page (logs-records), TagPage (logs-tags) og generell side)
export const dummyPageData: PostItem[] = [
    dummyPostItem,                                                              // 0: Standard artikkel-side
    { ...dummyPostItem, tags: [{ ...dummyHeaderData.tags![0], cls: ['custom-tag-theme'] }] }, // 1: Med tilpasset tag-klasse
    { ...dummyPostItem, path: '/logs/tags/vue' }                                // 2: Tag-side variant
];

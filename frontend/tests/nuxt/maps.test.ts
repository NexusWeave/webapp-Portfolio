import { describe, it, expect } from 'vitest';
import { mapProfile } from '~/composables/maps/mapProfile';
import { mapRepoData } from '~/composables/maps/mapRepoData';
import { mapTimeline } from '~/composables/maps/mapTimeline';
import { mapReference } from '~/composables/maps/mapReferences';
import { mapBlogData, generatePostTags } from '~/composables/maps/mapBlogPost';
import { mockProfile, mockReferences, mockTimeline, mockBlogData,  mockRepoData, mockPostTags } from '../data/mapData';

import type { PostTag } from '~/types/documents';
describe('Test maps', () => {

    describe('Mapping Profile', () => {
        it('Returns an empty array when no data is provided', () => {
            expect(mapProfile(null as any)).toEqual([]);
            expect(mapProfile(undefined as any)).toEqual([]);
        });

        it('Maps data correctly', () => {
            const expectedOutput = [
                {
                    id: "sample-id",
                    path: "sample-path",
                    coop: "Sample coop",
                    stem: "Sample stem",
                    title: "Sample title",
                    date: {
                        delimiter: 'dot',
                        text: 'Publisert',
                        time: '01:00',
                        date: 'søn. 1. jan. 2023',
                        updated: null,
                    },
                    summary: "Sample summary",
                    body: {},
                },
                {
                    id: "sample-id",
                    path: "sample-path",
                    coop: "Sample coop",
                    stem: "Sample stem",
                    title: "",
                    date: {
                        delimiter: 'dot',
                        text: 'Publisert',
                        time: '01:00',
                        date: 'søn. 1. jan. 2023',
                        updated: null,
                    },
                    summary: "Sample summary",
                    body: {},
                }
            ];

            expect(mapProfile(mockProfile)).toEqual(expectedOutput);
        });
    });

    describe('Mapping References', () => {
        it('Returns an empty array when no data is provided', () => {
            expect(mapReference(null as any)).toEqual([]);
            expect(mapReference(undefined as any)).toEqual([]);
        });

        it('Maps reference data correctly', () => {
            const expectedOutput = [
                {
                    id: 0,
                    title: "Sample title",
                    body: {},
                    anchor: {
                        type: ['pdf'],
                        href: "path/to/sample.pdf",
                        label: " - Sample title"
                    }
                }
            ];

            expect(mapReference(mockReferences)).toEqual(expectedOutput);
        });
    });

    describe('Mapping Repo Data', () => {
        it('Returns an empty array when no data is provided', () => {
            expect(mapRepoData(null as any)).toEqual([]);
            expect(mapRepoData(undefined as any)).toEqual([]);
        });

        it('Maps repository data correctly', () => {
            const expectedOutput = [
                {
                    id: "123456",
                    label: "test repo name",
                    owner: "test-owner",
                    owner_url: "https://github.com/test-owner",
                    description: "A description of the test repository",
                    date: undefined,
                    flags: {
                        isBacked: true
                    },
                    collaborators: [
                        { name: "Collaborator One", profile_url: "https://github.com/collab1" }
                    ],
                    languages: [
                        { label: "TypeScript", bytes: 4500 },
                        { label: "CSS", bytes: 1500 }
                    ],
                    media: [
                        {
                            type: 'image/svg+xml',
                            caption: ' ',
                            alt: ' Visual Representation of typescript',
                            src: '/media/tech-lang-icons/typescript.svg',
                            srcset: '/media/tech-lang-icons/typescript.svg'
                        },
                        {
                            type: 'image/svg+xml',
                            caption: ' ',
                            alt: ' Visual Representation of css',
                            src: '/media/tech-lang-icons/css.svg',
                            srcset: '/media/tech-lang-icons/css.svg'
                        }
                    ],
                    anchor: [],
                    contribution_ratio: undefined
                }
            ];

            expect(mapRepoData(mockRepoData)).toEqual(expectedOutput);
        });
    });

    describe('Mapping blog posts', () => {
        it('Returns an empty array when no data is provided', () => {
            expect(mapBlogData(null as any)).toEqual([]);
            expect(mapBlogData(undefined as any)).toEqual([]);
        });

        it('Returns fallback tag', () => {
            const dir = "";
            const defaulth = "misc";
            
            const expectedOutput: PostTag[] = [{ name: defaulth, cls: [defaulth], type: ['tag', 'dir'], href: `${dir}/tags/${defaulth}`, path: defaulth, label: 'Misc', labels: [defaulth, 'blog-post'] }]
            expect(generatePostTags(mockPostTags.fallback, dir)).toEqual(expectedOutput);
        });

        it('Returns correctly formated Posts', () => {
            const testDir = 'posts/project/intranet';
            const expectedOutput: PostTag[] = [
                {
                    name: "project",
                    cls: ["project"],
                    type: ['tag', 'dir'],
                    href: `${testDir}/tags/project`,
                    path: "project",
                    label: "project",
                    labels: ["project", "blog-post"]
                },
                {
                    name: "webapps",
                    cls: ["webapps"],
                    type: ['tag', 'dir'],
                    href: `${testDir}/tags/webapps`,
                    path: "webapps",
                    label: "Webapps",
                    labels: ["webapps", "blog-post"]
                }
            ];
            expect(generatePostTags(mockPostTags.valid, testDir)).toEqual(expectedOutput);
        });

        it('Maps blog post data correctly', () => {
            const expectedOutput = [
                {
                    id: 0,
                    path: "my-first-post",
                    tags: [
                        {
                            name: 'misc',
                            cls: ['misc'],
                            type: ['tag', 'dir'],
                            href: '/logs/tags/misc',
                            path: 'misc',
                            label: 'Misc',
                            labels: ['misc', 'blog-post']
                        }
                    ],
                    status: "published",
                    body: {},
                    ingress: "This is the entry summary of my first blog post.",
                    sources: "Self study",
                    isArchived: false,
                    title: "My First Blog Post",
                    isPublished: true,
                    date: {
                        delimiter: 'dot',
                        text: 'Publisert',
                        time: '13:00',
                        date: 'tor. 1. jan. 2026',
                        updated: null
                    },
                    anchor: [
                        {
                            type: ['router'],
                            path: '/logs/records/my-first-post',
                            label: 'Les mer',
                            cls: ['read-more-btn']
                        }
                    ]
                }
            ];

            expect(mapBlogData(mockBlogData)).toEqual(expectedOutput);
        });
    });

    describe('Mapping timeline data', () => {
        it('Returns an empty array when no data is provided', () => {
            expect(mapTimeline(null as any)).toEqual([]);
            expect(mapTimeline(undefined as any)).toEqual([]);
        });

        it('Maps timeline data correctly', () => {
            const expectedOutput = [
                {
                    id: 0,
                    name: "Bachelor of Science-Timeline",
                    body: {},
                    isVisible: true,
                    title: {
                        label: "Bachelor of Science",
                        href: "https://uio.no"
                    },
                    location: {
                        label: "University of Oslo",
                        href: "https://uio.no"
                    },
                    description: undefined,
                    date: {
                        created: {
                            delimiter: 'dot',
                            text: 'Publisert',
                            time: '02:00',
                            date: 'lør. 15. aug. 2020',
                            updated: null
                        },
                        end: {
                            delimiter: 'dot',
                            text: 'Publisert',
                            time: '02:00',
                            date: 'tir. 20. juni 2023',
                            updated: null
                        }
                    } as any,
                    techStack: [
                        {
                            type: 'svg',
                            label: 'python',
                            frameWork: 'python',
                            category: 'python',
                            alt: 'A visual representation of python',
                            src: '/media/tech-lang-icons/python.svg',
                            srcset: '/media/tech-lang-icons/python.svg',
                            caption: ' '
                        },
                        {
                            type: 'svg',
                            label: 'typescript',
                            frameWork: 'typescript',
                            category: 'javascript',
                            alt: 'A visual representation of typescript',
                            src: '/media/tech-lang-icons/typescript.svg',
                            srcset: '/media/tech-lang-icons/typescript.svg',
                            caption: ' '
                        }
                    ],
                    subjects: [
                        {
                            title: {
                                label: "Algorithms and Data Structures",
                                href: "https://uio.no/course/123"
                            },
                            body: "Learned arrays, lists, search, and sort algorithms.",
                            date: {
                                created: {
                                    delimiter: 'dot',
                                    text: 'Publisert',
                                    time: '01:00',
                                    date: 'søn. 10. jan. 2021',
                                    updated: null
                                },
                                end: {
                                    delimiter: 'dot',
                                    text: 'Publisert',
                                    time: '02:00',
                                    date: 'tir. 15. juni 2021',
                                    updated: null
                                }
                            } as any,
                            techStack: [
                                {
                                    type: 'svg',
                                    label: 'python',
                                    frameWork: 'python',
                                    category: 'python',
                                    alt: 'A visual representation of python',
                                    src: '/media/tech-lang-icons/python.svg',
                                    srcset: '/media/tech-lang-icons/python.svg',
                                    caption: ' '
                                }
                            ]
                        }
                    ]
                }
            ];

            expect(mapTimeline(mockTimeline)).toEqual(expectedOutput);
        });
    });
});
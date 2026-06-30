import type { RepositoryData } from "~/types/props";
import type { AcademicCollectionItem, ProfileInfoCollectionItem, ReferenceCollectionItem, DevPostsCollectionItem } from "@nuxt/content";


export const mockProfile = [
    {
        body: {},
        id: "sample-id",
        date: "2023-01-01",
        coop: "Sample coop",
        stem: "Sample stem",
        path: "sample-path",
        title: "Sample title",
        summary: "Sample summary",
    },
    {
        body: {},
        id: "sample-id",
        date: "2023-01-01",
        coop: "Sample coop",
        stem: "Sample stem",
        path: "sample-path",
        summary: "Sample summary",
    }
] as unknown as ProfileInfoCollectionItem[];

export const mockReferences = [
    {
        body: {},
        title: "Sample title",
        link: "path/to/sample.pdf"
    }
] as unknown as ReferenceCollectionItem[];

export const mockTimeline = [
    {
        title: "Bachelor of Science",
        created: "2020-08-15",
        end: "2023-06-20",
        location: "University of Oslo",
        loc_link: "https://uio.no",
        org_link: "https://uio.no",
        body: {},
        techStack: [
            "Python",
            "TypeScript"
        ],
        subjects: [
            {
                title: "Algorithms and Data Structures",
                created: "2021-01-10",
                end: "2021-06-15",
                ref_link: "https://uio.no/course/123",
                techStack: [
                    "Python"
                ],
                body: "Learned arrays, lists, search, and sort algorithms."
            }
        ]
    }
] as unknown as AcademicCollectionItem[];

export const mockBlogData = [
    {
        id: "/logs/dev/my-first-post.md",
        date: "2026-01-01T12:00:00.000Z",
        title: "My First Blog Post",
        body: {},
        ingress: "This is the entry summary of my first blog post.",
        status: "published",
        sources: "Self study"
    }
] as unknown as DevPostsCollectionItem[];

export const mockRepoData: RepositoryData = [
    {
        id: 123456,
        label: "test-repo-name",
        owner: "test-owner",
        owner_url: "https://github.com/test-owner",
        description: "A description of the test repository",
        created_at: "2026-06-30T10:00:00Z",
        flags: {
            isBacked: true
        },
        collaborators: [
            { name: "Collaborator One", profile_url: "https://github.com/collab1" }
        ],
        languages: [
            { label: "TypeScript", bytes: 4500 },
            { label: "CSS", bytes: 1500 }
        ]
    }
];

export const mockPostTags = {
    fallback: [],
    valid: ["project", "webapps"]
};
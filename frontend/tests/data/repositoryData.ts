import type { RepositoryItem } from '~/types/props';

export const cardDummyData = [
    {
        // Standard complete BusinessCard repository data
        id: 0,
        repo_id: 1000,
        label: 'Test Repo',
        owner: 'owner-name',
        date: { date: '2026-05-05' },
        flags: { collaborator: true },
        created_at: '2026-05-05T12:00:00Z',
        owner_url: 'https://github.com/owner-name',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        collaborators: [{ name: 'collab1', profile_url: 'https://github.com/collab1' }],
        anchor: [ { label: 'Repo Link', href: 'https://github.com/owner-name/test-repo' }],
        media: [ { src: '/icon1.svg', alt: 'TypeScript', type: 'image/svg+xml' }, { src: '/icon2.svg', alt: 'Vue', type: 'image/svg+xml' }],
        languages: [ { label: 'TypeScript', language: 'TypeScript', bytes: 5000, code_bytes: 5000 }, { label: 'Vue', language: 'Vue', bytes: 2000, code_bytes: 2000 }],
    },
    {
        // Repository without languages and media
        id: 1,
        repo_id: 1001,
        label: 'Test Repo',
        owner: 'owner-name',
        date: { date: '2026-05-05' },
        flags: { collaborator: true },
        created_at: '2026-05-05T12:00:00Z',
        owner_url: 'https://github.com/owner-name',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        collaborators: [{ name: 'collab1', profile_url: 'https://github.com/collab1' }],
        anchor: [ { label: 'Repo Link', href: 'https://github.com/owner-name/test-repo' }],
    },
    {
        // Repository without anchor link
        id: 2,
        repo_id: 1003,
        label: 'Test Repo',
        owner: 'owner-name',
        date: { date: '2026-05-05' },
        flags: { collaborator: true },
        created_at: '2026-05-05T12:00:00Z',
        owner_url: 'https://github.com/owner-name',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        collaborators: [{ name: 'collab1', profile_url: 'https://github.com/collab1' }],
        media: [ { src: '/icon1.svg', alt: 'TypeScript', type: 'image/svg+xml' }, { src: '/icon2.svg', alt: 'Vue', type: 'image/svg+xml' }],
        languages: [ { label: 'TypeScript', language: 'TypeScript', bytes: 5000, code_bytes: 5000 }, { label: 'Vue', language: 'Vue', bytes: 2000, code_bytes: 2000 }],
    },
    {
        // Repository without collaborators
        id: 3,
        repo_id: 1003,
        label: 'Test Repo',
        owner: 'owner-name',
        date: { date: '2026-05-05' },
        flags: { frontend: true },
        created_at: '2026-05-05T12:00:00Z',
        owner_url: 'https://github.com/owner-name',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        anchor: [ { label: 'Repo Link', href: 'https://github.com/owner-name/test-repo' }],
        media: [ { src: '/icon1.svg', alt: 'TypeScript', type: 'image/svg+xml' }, { src: '/icon2.svg', alt: 'Vue', type: 'image/svg+xml' }],
        languages: [ { label: 'TypeScript', language: 'TypeScript', bytes: 5000, code_bytes: 5000 }, { label: 'Vue', language: 'Vue', bytes: 2000, code_bytes: 2000 }],
    },
    {
        // Repository with long description (>81 characters Lorem Ipsum)
        id: 4,
        repo_id: 1004,
        label: 'Long Description Repo',
        owner: 'owner-name',
        date: { date: '2026-05-05' },
        flags: { collaborator: true },
        created_at: '2026-05-05T12:00:00Z',
        owner_url: 'https://github.com/owner-name',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
        collaborators: [{ name: 'collab1', profile_url: 'https://github.com/collab1' }],
        anchor: [{ label: 'Repo Link', href: 'https://github.com/owner-name/test-repo' }],
        media: [{ src: '/icon1.svg', alt: 'TypeScript', type: 'image/svg+xml' }],
        languages: [{ label: 'TypeScript', language: 'TypeScript', bytes: 5000, code_bytes: 5000 }],
    },
    {
        // Repository with a single language
        id: 5,
        repo_id: 1005,
        label: 'Single Language Repo',
        owner: 'owner-name',
        date: { date: '2026-05-05' },
        flags: { frontend: true },
        created_at: '2026-05-05T12:00:00Z',
        owner_url: 'https://github.com/owner-name',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        anchor: [{ label: 'Repo Link', href: 'https://github.com/owner-name/test-repo' }],
        media: [{ src: '/icon1.svg', alt: 'TypeScript', type: 'image/svg+xml' }],
        languages: [{ label: 'TypeScript', language: 'TypeScript', bytes: 5000, code_bytes: 5000 }],
    },
    {
        // Repository with more than 5 collaborators
        id: 6,
        repo_id: 1006,
        label: 'Many Collaborators Repo',
        owner: 'owner-name',
        date: { date: '2026-05-05' },
        flags: { collaborator: true },
        created_at: '2026-05-05T12:00:00Z',
        owner_url: 'https://github.com/owner-name',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        collaborators: [
            { name: 'collab', profile_url: 'https://github.com/collab' },
            { name: 'collab1', profile_url: 'https://github.com/collab1' },
            { name: 'collab2', profile_url: 'https://github.com/collab2' },
            { name: 'collab3', profile_url: 'https://github.com/collab3' },
            { name: 'collab4', profile_url: 'https://github.com/collab4' },
            { name: 'collab5', profile_url: 'https://github.com/collab5' },
            { name: 'collab6', profile_url: 'https://github.com/collab6' },
        ],
        anchor: [{ label: 'Repo Link', href: 'https://github.com/owner-name/test-repo' }],
        media: [{ src: '/icon1.svg', alt: 'TypeScript', type: 'image/svg+xml' }],
        languages: [{ label: 'TypeScript', language: 'TypeScript', bytes: 5000, code_bytes: 5000 }],
    },
    {
        // Repository with bot collaborators (dependabot[bot])
        id: 7,
        repo_id: 1007,
        label: 'Bot Collaborator Repo',
        owner: 'owner-name',
        date: { date: '2026-05-05' },
        flags: { collaborator: true },
        created_at: '2026-05-05T12:00:00Z',
        owner_url: 'https://github.com/owner-name',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        collaborators: [
            { name: 'collab1', profile_url: 'https://github.com/collab1' },
            { name: 'dependabot[bot]', profile_url: 'https://github.com/dependabot' },
        ],
        anchor: [{ label: 'Repo Link', href: 'https://github.com/owner-name/test-repo' }],
        media: [{ src: '/icon1.svg', alt: 'TypeScript', type: 'image/svg+xml' }],
        languages: [{ label: 'TypeScript', language: 'TypeScript', bytes: 5000, code_bytes: 5000 }],
    },
    {
        // Repository where repo owner is in collaborators list
        id: 8,
        repo_id: 1008,
        label: 'Owner In Collaborators Repo',
        owner: 'owner-name',
        date: { date: '2026-05-05' },
        flags: { collaborator: true },
        created_at: '2026-05-05T12:00:00Z',
        owner_url: 'https://github.com/owner-name',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        collaborators: [
            { name: 'owner-name', profile_url: 'https://github.com/owner-name' },
            { name: 'collab1', profile_url: 'https://github.com/collab1' },
        ],
        anchor: [{ label: 'Repo Link', href: 'https://github.com/owner-name/test-repo' }],
        media: [{ src: '/icon1.svg', alt: 'TypeScript', type: 'image/svg+xml' }],
        languages: [{ label: 'TypeScript', language: 'TypeScript', bytes: 5000, code_bytes: 5000 }],
    },
    {
        // Repository with missing/empty title (label)
        id: 9,
        repo_id: 1009,
        label: '',
        owner: 'owner-name',
        date: { date: '2026-05-05' },
        flags: { frontend: true },
        created_at: '2026-05-05T12:00:00Z',
        owner_url: 'https://github.com/owner-name',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        anchor: [{ label: 'Repo Link', href: 'https://github.com/owner-name/test-repo' }],
        media: [{ src: '/icon1.svg', alt: 'TypeScript', type: 'image/svg+xml' }],
        languages: [{ label: 'TypeScript', language: 'TypeScript', bytes: 5000, code_bytes: 5000 }],
    },
    {
        // Repository with missing date
        id: 10,
        repo_id: 1010,
        label: 'Missing Date Repo',
        owner: 'owner-name',
        date: undefined,
        flags: { frontend: true },
        created_at: '2026-05-05T12:00:00Z',
        owner_url: 'https://github.com/owner-name',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        anchor: [{ label: 'Repo Link', href: 'https://github.com/owner-name/test-repo' }],
        media: [{ src: '/icon1.svg', alt: 'TypeScript', type: 'image/svg+xml' }],
        languages: [{ label: 'TypeScript', language: 'TypeScript', bytes: 5000, code_bytes: 5000 }],
    },
    {
        // Repository with missing/empty description
        id: 11,
        repo_id: 1011,
        label: 'Missing Description Repo',
        owner: 'owner-name',
        date: { date: '2026-05-05' },
        flags: { frontend: true },
        created_at: '2026-05-05T12:00:00Z',
        owner_url: 'https://github.com/owner-name',
        description: '',
        anchor: [{ label: 'Repo Link', href: 'https://github.com/owner-name/test-repo' }],
        media: [{ src: '/icon1.svg', alt: 'TypeScript', type: 'image/svg+xml' }],
        languages: [{ label: 'TypeScript', language: 'TypeScript', bytes: 5000, code_bytes: 5000 }],
    },
    {
        // Repository with missing/empty description
        id: 12,
        repo_id: 1012,
        label: 'Missing Description Repo',
        owner: 'owner-name',
        date: { date: '2026-05-05' },
        flags: { frontend: true },
        created_at: '2026-05-05T12:00:00Z',
        owner_url: 'https://github.com/owner-name',
        description: 'Lorem ipsuml Doloro etus',
        anchor: [{ label: 'Repo Link', href: 'https://github.com/owner-name/test-repo' }],
        media: [{ src: '/icon1.svg', alt: 'TypeScript', type: 'image/svg+xml' }],
        languages: [{ label: 'TypeScript', language: 'TypeScript', bytes: 5000, code_bytes: 5000 }],
    },
    {
        // Repository where with only one language.
        id: 13,
        repo_id: 1013,
        owner: 'owner-name',
        date: { date: '2026-05-05' },
        flags: { collaborator: true },
        created_at: '2026-05-05T12:00:00Z',
        label: 'Owner In Collaborators Repo',
        owner_url: 'https://github.com/owner-name',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        collaborators: [
            { name: 'owner-name', profile_url: 'https://github.com/owner-name' },
            { name: 'collab1', profile_url: 'https://github.com/collab1' },
        ],
        anchor: [{ label: 'Repo Link', href: 'https://github.com/owner-name/test-repo' }],
        media: [{ src: '/icon1.svg', alt: 'TypeScript', type: 'image/svg+xml' }],
        languages: [{ label: 'TypeScript', language: 'TypeScript', bytes: 5000, code_bytes: 5000 }],
    },
];

export const portfolioDummyData = [
    {
        // Standard Backend project with single collaborator
        id: 0,
        repo_id: 1000,
        label: 'Code Assessor KI',
        owner: 'krigjo25',
        date: { date: '2026-07-01' },
        flags: { backend: true },
        created_at: '2026-07-01T12:00:00Z',
        owner_url: 'https://github.com/krigjo25',
        description: 'An automated compliance & QA engine for code and documents.',
        collaborators: [
            { name: 'krigjo25', profile_url: 'https://github.com/krigjo25' },
            { name: '235o', profile_url: 'https://github.com/235o' },
            { name: 'NexusWeave', profile_url: 'https://github.com/NexusWeave' }
        ],
        media: [{ src: '/python.svg', alt: 'Python', type: 'image/svg+xml' }],
        languages: [{ label: 'Python', language: 'Python', bytes: 5000, code_bytes: 5000 }],
        anchor: [{ label: 'Repo Link', href: 'https://github.com/krigjo25/code-assessor-ki' }]
    },
    {
        // Fullstack project & Collaborator flag, no languages
        id: 1,
        repo_id: 1001,
        label: 'karriere ki',
        owner: 'filrossi',
        date: { date: '2026-06-15' },
        flags: { fullstack: true, collaborator: true },
        created_at: '2026-06-15T12:00:00Z',
        owner_url: 'https://github.com/filrossi',
        description: 'Karriere-KI is a specialized automation console program designed to simplify job application processes.',
        collaborators: [{ name: 'krigjo25', profile_url: 'https://github.com/krigjo25' }],
        languages: [],
        anchor: [{ label: 'Repo Link', href: 'https://github.com/filrossi/karriere-ki' }]
    },
    {
        // Frontend project without collaborators
        id: 2,
        repo_id: 1002,
        label: 'ux lumina',
        owner: 'NexusWeave',
        date: { date: '2026-05-20' },
        flags: { frontend: true },
        created_at: '2026-05-20T12:00:00Z',
        owner_url: 'https://github.com/NexusWeave',
        description: 'Lumina-sass is a customized and centralized Sass dependency.',
        collaborators: [],
        languages: [
            { label: 'TypeScript', language: 'TypeScript', bytes: 4200, code_bytes: 4200 },
            { label: 'Sass', language: 'Sass', bytes: 3000, code_bytes: 3000 }
        ],
        media: [
            { src: '/ts.svg', alt: 'TypeScript', type: 'image/svg+xml' },
            { src: '/sass.svg', alt: 'Sass', type: 'image/svg+xml' }
        ],
        anchor: [{ label: 'Repo Link', href: 'https://github.com/NexusWeave/ux-lumina' }]
    },
    {
        // Misc project (no backend/frontend/fullstack flags)
        id: 3,
        repo_id: 1003,
        label: 'Misc Utilities',
        owner: 'krigjo25',
        date: { date: '2026-04-10' },
        flags: { misc: true },
        created_at: '2026-04-10T12:00:00Z',
        owner_url: 'https://github.com/krigjo25',
        description: 'Miscellaneous helper scripts and config files.',
        collaborators: [],
        languages: [{ label: 'Shell', language: 'Shell', bytes: 1200, code_bytes: 1200 }],
        anchor: [{ label: 'Repo Link', href: 'https://github.com/krigjo25/misc-utils' }]
    },
    {
        // Project with empty/missing description & title fallback
        id: 4,
        repo_id: 1004,
        label: '',
        owner: 'krigjo25',
        date: undefined,
        flags: { backend: true },
        created_at: '2026-03-01T12:00:00Z',
        owner_url: 'https://github.com/krigjo25',
        description: '',
        collaborators: [],
        languages: []
    }
];


/** Ten repositories for testing pagination (starting from id 0). */
export const portfolioPaginationDummyData = [
    ...portfolioDummyData, // id 0, 1, 2, 3, 4 (5 elementer)
    {
        id: 5, repo_id: 1005, label: 'Portfolio API', owner: 'krigjo25',
        owner_url: 'https://github.com/krigjo25', description: 'API integration project.',
        created_at: '2025-04-15T12:00:00Z', flags: { backend: true },
        languages: [{ label: 'Python', language: 'Python', bytes: 2200, code_bytes: 2200 }], collaborators: [],
    },
    {
        id: 6, repo_id: 1006, label: 'Nuxt Dashboard', owner: 'krigjo25',
        owner_url: 'https://github.com/krigjo25', description: 'A dashboard built with Nuxt.',
        created_at: '2025-03-15T12:00:00Z', flags: { frontend: true },
        languages: [{ label: 'TypeScript', language: 'TypeScript', bytes: 3000, code_bytes: 3000 }], collaborators: [],
    },
    {
        id: 7, repo_id: 1007, label: 'Data Tools', owner: 'krigjo25',
        owner_url: 'https://github.com/krigjo25', description: 'Utilities for processing data.',
        created_at: '2025-02-15T12:00:00Z', flags: { backend: true },
        languages: [{ label: 'Python', language: 'Python', bytes: 2400, code_bytes: 2400 }], collaborators: [],
    },
    {
        id: 8, repo_id: 1008, label: 'Vue Components', owner: 'NexusWeave',
        owner_url: 'https://github.com/NexusWeave', description: 'Reusable Vue components.',
        created_at: '2025-01-15T12:00:00Z', flags: { frontend: true },
        languages: [{ label: 'Vue', language: 'Vue', bytes: 2100, code_bytes: 2100 }], collaborators: [],
    },
    {
        id: 9, repo_id: 1009, label: 'Automation Console', owner: 'krigjo25',
        owner_url: 'https://github.com/krigjo25', description: 'A console for automated workflows.',
        created_at: '2024-12-15T12:00:00Z', flags: { fullstack: true },
        languages: [{ label: 'Python', language: 'Python', bytes: 2600, code_bytes: 2600 }, { label: 'Sass', language: 'Sass', bytes: 900, code_bytes: 900 }], collaborators: [],
    },
];

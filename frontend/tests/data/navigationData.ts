import type { ButtonItem, AnchorItem } from "@/types/navigation";

// 1. List of Button dummy data scenarios
export const dummyButtonData: ButtonItem[] = [
    {
        id: 'test-btn',
        label: 'Standard Button'
    },
    {
        id: 'btn-icon',
        type: ['github'],
        label: 'Button with Icon'
    },
    {
        id: 'btn-anchor',
        label: 'Button with Anchor',
        anchor: {
            id: 'anchor-in-btn',
            label: 'Nested Anchor',
            href: '/internal-page'
        }
    },
    {
        id: 'full-btn',
        type: ['mail'],
        disabled: true,
        action: () => {},
        label: 'Full Button Test',
        cls: ['btn-primary', 'large-size'],
        anchor: {
            href: '/contact',
            label: 'Nested Link',
            id: 'nested-anchor-id'
        }
    }
];

// 2. List of Anchor dummy data scenarios
export const dummyAnchorData: AnchorItem[] = [
    {
        id: 'anchor-std',
        label: 'Standard Anchor',
        href: '/local-path'
    },
    {
        id: 'anchor-ext',
        label: 'External Link',
        href: 'https://github.com/krigjo25'
    },
    {
        id: 'anchor-dl',
        label: 'Download Document',
        href: '/downloads/report.docx',
        type: ['docx']
    },
    {
        id: 'anchor-icon',
        label: 'Anchor with Icon',
        href: 'mailto:test@example.com',
        type: ['mail']
    },
    {
        id: 'anchor-img',
        label: 'Anchor with Image',
        href: '/view-image',
        type: ['png'],
        media: {
            id: 'fig-1',
            type: ['png'],
            img: {
                src: '/test.png',
                alt: 'Test Alt'
            }
        } as any
    }
];

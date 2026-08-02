import type { ReferenceItem } from "@/types/documents";

export const dummyReferences: ReferenceItem[] = [
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

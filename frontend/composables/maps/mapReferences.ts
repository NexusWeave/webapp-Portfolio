import type { ReferenceItem } from '~/types/documents';
import type { ReferenceCollectionItem } from '@nuxt/content';

export function mapReference(data: ReferenceCollectionItem[]): ReferenceItem[]
{
    return data.map((doc:ReferenceCollectionItem, index) => {
        const anchor = { type: ['pdf'], href: doc.link, label: ` - ${doc.title}` };
        return { id: index, title: doc.title, body: doc.body, anchor: anchor };
    });
}
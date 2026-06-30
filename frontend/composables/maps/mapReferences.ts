import type { AnchorItem } from '~/types/navigation';
import type { ReferenceItem } from '~/types/documents';
import type { ReferenceCollectionItem } from '@nuxt/content';


export function mapReference(data: ReferenceCollectionItem[]): ReferenceItem[]
{
    if (!data || data.length === 0) return [];
    return data.map((doc:ReferenceCollectionItem, index: number) => {
        const anchor: AnchorItem = { type: ['pdf'], href: doc.link, label: ` - ${doc.title}` };
        return { id: index, title: doc.title, body: doc.body, anchor: anchor };
    });
}
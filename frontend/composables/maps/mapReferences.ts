import type { ReferenceItem } from '~/types/documents';
import type { ReferenceCollectionItem } from '@nuxt/content';

export function mapReference(data: Ref<ReferenceCollectionItem[]>): ReferenceItem[]
{
    return data.value.map((doc:ReferenceCollectionItem, index) => {
        const anchor = { type: ['pdf'], href: doc.link, label: ` - ${doc.title}` };
        return { id: index, quote: doc.quote, anchor: anchor } as ReferenceItem;
    });
}
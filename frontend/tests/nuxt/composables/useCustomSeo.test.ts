import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ref, computed, unref, type Ref, type ComputedRef } from 'vue';
import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import { useCustomSeo } from '~/composables/useCustomSeo';
import type { SeoOptions } from '~/types/utils';

const useSeoMetaSpy = vi.fn();
const useHeadSpy = vi.fn();

mockNuxtImport('useSeoMeta', () => {
    return (options: Record<string, unknown>) => {
        const unwrapped: Record<string, unknown> = {};
        for (const [key, val] of Object.entries(options)) {
            unwrapped[key] = unref(val);
        }
        useSeoMetaSpy(unwrapped);
    };
});

mockNuxtImport('useHead', () => {
    return (options: { link?: Array<{ rel: string; href: unknown }> }) => {
        const unwrapped: Record<string, unknown> = { ...options };
        if (Array.isArray(options.link)) {
            unwrapped.link = options.link.map((item: { rel: string; href: unknown }) => ({
                ...item,
                href: unref(item.href)
            }));
        }
        useHeadSpy(unwrapped);
    };
});

describe('useCustomSeo()', () => {

    beforeEach(() => {
        useSeoMetaSpy.mockClear();
        useHeadSpy.mockClear();
    });

    it('sets default SEO metadata when no options are provided', () => {
        useCustomSeo();

        expect(useSeoMetaSpy).toHaveBeenCalledWith(expect.objectContaining({
            title: 'Portefølje - Kristoffer Gjøsund',
            description: 'Portefølje side for Kristoffer Gjøsund',
            ogType: 'website',
            ogUrl: 'https://krigjo25.no',
            ogImage: 'https://krigjo25.no/og-image.png',
            robots: 'index, follow',
            googleSiteVerification: '8gvx99aCgKbc489qfagbKyJyY9Wv4KUKC9AAk8fLxUs'
        }));

        expect(useHeadSpy).toHaveBeenCalledWith(expect.objectContaining({
            link: [{ rel: 'canonical', href: 'https://krigjo25.no' }]
        }));
    });

    it('sets custom title, description, and urlPath', () => {
        const options: SeoOptions = {
            title: 'Kompetanse profil',
            description: 'En side om min bakgrunn.',
            urlPath: '/dev'
        };

        useCustomSeo(options);

        expect(useSeoMetaSpy).toHaveBeenCalledWith(expect.objectContaining({
            title: 'Kompetanse profil - Kristoffer Gjøsund',
            description: 'En side om min bakgrunn.',
            ogTitle: 'Kompetanse profil - Kristoffer Gjøsund',
            ogUrl: 'https://krigjo25.no/dev'
        }));

        expect(useHeadSpy).toHaveBeenCalledWith(expect.objectContaining({
            link: [{ rel: 'canonical', href: 'https://krigjo25.no/dev' }]
        }));
    });

    it('handles reactive (Ref/ComputedRef) options dynamically', () => {
        const titleRef: Ref<string> = ref('Dynamisk Tittel');
        const descriptionRef: ComputedRef<string> = computed(() => 'Dynamisk beskrivelse');

        const options: SeoOptions = {
            title: titleRef,
            description: descriptionRef,
            urlPath: '/logs/records/test-slug',
            type: 'article'
        };

        useCustomSeo(options);

        expect(useSeoMetaSpy).toHaveBeenCalledWith(expect.objectContaining({
            title: 'Dynamisk Tittel - Kristoffer Gjøsund',
            description: 'Dynamisk beskrivelse',
            ogType: 'article',
            ogUrl: 'https://krigjo25.no/logs/records/test-slug'
        }));
    });
});

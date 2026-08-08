<template>
    <h2> Informasjons side om trenings utstyr</h2>
    <section>
        <details>
            <summary>Pivot Olympisk Tricep stang</summary>
            <ul>
                <li>
                    Vekt : 9KG
                </li>
                <li>
                    <b>Maxvekt :</b> 100 KG per side  (total vekt : max 200 KG)
                </li>
                <li>
                    Notes : Dette produktet kan brukes for alle medlemmer hos {{ gym }} i {{ street }}.
                </li>
            </ul>
            Eier Informasjon :
            Kristoffer Gjøsund
            krigjo25@gmail.com
            46652938
        </details>
        
    </section>
</template>
<script lang="ts" setup>

    import { useCustomSeo } from '~/composables/useCustomSeo';

    import type { SeoOptions } from '~/types/utils';

    //  --- Meta information

    const seoData: SeoOptions = { urlPath: '/equipment-info', title: 'Informasjon om trengings utstyr', description: 'Oversikt siden for Hovedsiden med oversikt over Kristoffers trenings utstyr, som ligger offenlig ute i treningsstudioet.' };
    definePageMeta( { order: 99 });
    useCustomSeo(seoData);

    const gym = 'EVO';
    const street = "Grunderløkka"
</script>
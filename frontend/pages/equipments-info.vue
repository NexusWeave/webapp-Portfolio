<template>
    <h2> Informasjons side om trenings utstyr</h2>
    <section class="eq-info">
        <details>
            <summary>{{ tool }}</summary>
            <ul>
                <li>
                    <span>Vekt uten vekter : </span><span>{{ equipmentInfo.weight }}  KG</span>
                </li>
                <li>
                    <span>Maxvekt : </span>
                    <span>{{ equipmentInfo.max }}</span>
                </li>
                <li>
                    <span>Notes :</span> <span>{{ equipmentInfo.notes }}</span>
                </li>
            </ul>
            <details>
                <summary>Eier Informasjon</summary>
                <p> {{ contact.name }} {{ contact.phone }} {{ contact.email }}</p>
            </details>
            
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
    const street = "Grunderløkka";
    const tool = "Pivot Olympisk Tricep stang";

    const  equipmentInfo = computed(() => {
        const data =  {
            weight: 9,
            max: '100 KG per side  (total vekt : max 200 KG)',
            notes: `${tool}en er tilgjengelig for alle medlemmene hos ${gym} i ${street}.`}

        return data
    });

    const contact = {
        phone: '',//'46 65 29 38',
        name : 'Kristoffer Gjøsund',
        email: '' //'krigjo25@gmail.com'
    }
</script>
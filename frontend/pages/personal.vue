<template>
    <section class="flex-wrap-row-justify-space-evenly">
        <section class="flex-column-justify-center-align-center">
            <MediaFigure :data="CarouselData[0]"
        />
        </section>
        <section class="flex-column-justify-center-align-center">
            <article v-for="(data, i) in personal" :key="i" class="bio">
                <h3 v-if="i === 2">{{ data.title }}</h3>
                <ContentRenderer v-if="i === 2" :value="data" />
            </article>
        </section>
    </section>
</template>
<script setup lang="ts">

    //  Importing dependencies & types
    import type { CarouselButton, FigureItem } from '@/types/props';

    const path = 'personal_profile';
    const {data: personal} = await useAsyncData('personal', () => 
    {
        return queryCollection(path).all();
    });

    //  Carousel Data
    const CarouselData: FigureItem[] = 
    [
        {
            type    : 'jpg',
            alt     : 'Portrait of Kristoffer Gjøsund',
            src     : 'media/images/carousel/20240903_165612.jpg',
            caption : '- Motivert av å gi, og heve resultater gjennom samarbeid. Hver utfordring, er en felles reise. - Kristoffer Gjøsund',
        },

    ];

</script>
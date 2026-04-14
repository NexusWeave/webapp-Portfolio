<template>
    <section :class="['business-card', 'flex-column']">
        <section  :class="['flex-wrap-row-justify-space-between', 'card-data']">
            <MediaFigure v-if="hasLanguages" :data="data.media[num]" :cls="['tech-figure', 'tech-img']" />
            <div v-else ></div>
            <span :class="['date-container']"> <b> <time :datetime="data?.date.date"> {{ data?.date.date }} </time> </b> </span>
        </section>
        <section :class="['card-content', 'flex-column-items-center']">
            <h3>
                {{ data.label }}
                <span v-if="data.flags.collaborator" :class="['icon']"> <MediaIcon :cls="['collaborator']"/> </span>
            </h3>
            <NavigationNavMenu v-if="hasAnchor" :cls="['portofolio-nav']" :data="data.anchor" />
            <p>{{ data.description }}</p>

            <section v-if="hasTechnology" :class="['tech-container']">
                <h4>Andre teknologi(er) : </h4>
                <p :class="['flex-wrap-row-justify-space-evenly']">
                    <span v-for="(media, i) in data.media" :key="i"> <MediaFigure v-if="i > num" :data="media" :cls="['tech-figure', 'tech-img']" /> </span>
                </p>
    
            </section>
        </section>
    </section>
</template>
<script lang="ts" setup>

    //  --- Importing dependencies & types
    import type { RepoProps } from '@/types/props';

    //  --- Props Definition Logic
    const props = defineProps<RepoProps>();
    const data = computed(() => props.data);

    //  --- Flags & Computed Logic
    const num = 0;
    const hasAnchor = computed(() => props.data.anchor && props.data.anchor.length > num);
    const hasLanguages = computed(() => props.data.languages && props.data.languages.length > num);
    const hasTechnology = computed(() => props.data.languages && props.data.languages.length > 1);

    //  --- Debugging Logic
    //console.log("BusinessCard props:", props.data);
console.error("BusinessCard data:", data.value);
</script>
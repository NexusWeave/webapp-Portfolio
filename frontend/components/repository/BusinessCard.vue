<template>
    <section :class="['business-card', 'flex-column']">
        <section  :class="['flex-wrap-row-justify-space-between', 'card-data']">
            <MediaFigure v-if="hasLanguages" :data="data.media[num]" :cls="['tech-figure', 'tech-img']" />
            <div v-else ></div>
            <span :class="['date-container']"> <b> <time :datetime="data?.date.date"> {{ data?.date.date }} </time> </b> </span>
        </section>
        <section :class="['card-content', 'flex-column-items-center']">
            <h3> {{ data.label }} </h3>
            
            <section v-if="isCollaboration" :class="['credits', 'flex-wrap-row-justify-center']">
                <p v-if="data.owner && data.owner_url">Eier: <a :href="data.owner_url" target="_blank">@{{ data.owner }}</a></p>
                <template v-if="otherContributors.length > 0">
                    <p v-for="collab in otherContributors" :key="collab.name" :class="['collab-name']">
                        <span>Bidragsyter: <a :href="collab.profile_url" target="_blank">@{{ collab.name }}</a></span>
                    </p>
                </template>
            </section>

            <NavigationNavMenu v-if="hasAnchor" :cls="['portofolio-nav']" :data="data.anchor" />
            <p>{{ truncatedDescription }}</p>

            <section v-if="hasTechnology" :class="['tech-container']">
                <h4>Andre teknologi(er) : </h4>
                <section :class="['flex-wrap-row-justify-space-evenly']">
                    <template v-for="(media, i) in data.media" :key="i">
                     <MediaFigure  v-if="i > num" :data="media" :cls="['tech-figure', 'tech-img']" />
                    </template>
                </section>
    
            </section>
        </section>
    </section>
</template>
<script lang="ts" setup>

    //  --- Importing dependencies & types
    import { computed } from 'vue';
    import type { RepoProps } from '@/types/props';

    //  --- Props Definition Logic
    const props = defineProps<RepoProps>();
    const data = computed(() => props.data);

    //  --- Flags & Computed Logic
    const num = 0;
    const hasAnchor = computed(() => props.data.anchor && props.data.anchor.length > num);
    const hasLanguages = computed(() => props.data.languages && props.data.languages.length > num);
    const hasTechnology = computed(() => props.data.languages && props.data.languages.length > 1);

    const truncatedDescription = computed(() => {
        const description = data.value?.description || '';
        const limit = 81; // Basert på eksempelet ditt
        return description.length > limit ? description.substring(0, limit) + '...' : description;
    });

    const isCollaboration = computed(() => {
        // Definerer samarbeid som prosjekter eid av andre, ELLER prosjekter med mer enn én bidragsyter
        const hasMultipleContributors = props.data.collaborators && props.data.collaborators.length > 1;
        return props.data.flags.collaborator || hasMultipleContributors;
    });

    const otherContributors = computed(() => {
        if (!props.data.collaborators) return [];
        // Filtrer ut eieren fra bidragsyter-listen for å unngå dobbeltvisning
        return props.data.collaborators.filter(c => c.name.toLowerCase() !== props.data.owner.toLowerCase());
    });

    //  --- Debugging Logic
    //console.log("BusinessCard props:", props.data);
    //console.error("BusinessCard data:", data.value);
</script>
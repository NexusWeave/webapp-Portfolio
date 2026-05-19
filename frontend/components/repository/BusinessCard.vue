<template>
    <section class="business-card grid-layout">
        <header class="card-header flex-wrap-row-justify-space-between">
            <MediaFigure v-if="hasLanguages && data?.media" :data="data.media[num]" :cls="['tech-figure', 'tech-img']" />
            <div v-else></div>
            <span class="date-container"> <b> <time v-if="data?.date?.date" :datetime="data.date.date"> {{ data.date.date }} </time> </b> </span>
        </header>
        <section class="card-content flex-column-items-center">
            <h3> {{ data?.label || 'Ukjent' }} </h3>
            
            <section v-if="isCollaboration" class="credits flex-wrap-row-justify-center">
                <p v-if="data?.owner && data?.owner_url" class="collab-name">
                    <span>Eier: <NavigationAnchor :data="{ href: data.owner_url, label: `@${data.owner}`, type: ['github', 'external'] }" /></span>
                </p>
                <template v-if="otherContributors?.length > 0">
                    <p v-for="collab in otherContributors" :key="collab.name" class="collab-name">
                        <span>Bidragsytere: <NavigationAnchor :data="{ href: collab.profile_url, label: `@${collab.name}`, type: ['github', 'external'] }" /></span>
                    </p>
                </template>
            </section>

            <p class="description">{{ truncatedDescription }}</p>
        </section>

        <nav class="card-nav flex-wrap-row-justify-center">
            <NavigationNavMenu v-if="hasAnchor && data?.anchor" :cls="['portofolio-nav']" :data="data.anchor" />
        </nav>

        <footer v-if="hasTechnology && data?.media" class="card-footer">
            <h4>Andre teknologi(er) : </h4>
            <section class="flex-wrap-row-justify-space-evenly">
                <template v-for="(media, i) in data.media" :key="i">
                    <MediaFigure v-if="i > num" :data="media" :cls="['tech-figure', 'tech-img']" />
                </template>
            </section>
        </footer>
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
    const hasAnchor = computed(() => (props.data?.anchor?.length || 0) > num);
    const hasLanguages = computed(() => (props.data?.languages?.length || 0) > num);
    const hasTechnology = computed(() => (props.data?.languages?.length || 0) > 1);

    const truncatedDescription = computed(() => {
        const description = data.value?.description || '';
        const limit = 81; // Basert på eksempelet ditt
        return description.length > limit ? description.substring(0, limit) + '...' : description;
    });

    const isCollaboration = computed(() => {
        if (!props.data) return false;
        // Definerer samarbeid som prosjekter eid av andre, ELLER prosjekter med mer enn én bidragsyter
        const hasMultipleContributors = (props.data.collaborators?.length || 0) > 1;
        return (props.data.flags?.collaborator) || hasMultipleContributors;
    });

    const otherContributors = computed(() => {
        if (!props.data?.collaborators) return [];
        // Filtrer ut eieren fra bidragsyter-listen for å unngå dobbeltvisning
        return props.data.collaborators.filter(c => c?.name?.toLowerCase() !== props.data?.owner?.toLowerCase());
    });

    //  --- Debugging Logic
    //console.log("BusinessCard props:", props.data);
    //console.error("BusinessCard data:", data.value);
</script>
<template>
    <section class="business-card grid-layout">
        <header class="card-header flex-wrap-row-justify-space-between">
            <MediaFigure v-if="hasLanguages && data?.media" :data="data.media[num]" :cls="['tech-figure', 'tech-img']" />
            <div v-else></div>
            <span class="date-container"> <b> <time v-if="data?.date?.date" :datetime="data.date.date"> {{ data.date.date }} </time> </b> </span>
        </header>
        <main class="card-content">
        <section class="card-content flex-column-items-center">
            <h3> {{ data?.label || 'Ukjent' }} </h3>
            <p class="description">{{ truncatedDescription }}</p>
        </section>

        <nav class="card-nav flex-wrap-row-justify-center">
            <NavigationNavMenu v-if="hasAnchor && data?.anchor" :cls="['portofolio-nav']" :data="data.anchor" />
        </nav>

        <section v-if="isCollaboration" class="credits flex-wrap-row-justify-center">
            <p v-if="data?.contribution_ratio !== undefined" class="collab-name">
                <span>Bidrag: <b>{{ data.contribution_ratio }}%</b></span>
            </p>
            <p v-if="displayOwner.name && displayOwner.url" class="collab-name">
                <span>Eier: <NavigationAnchor :data="{ href: displayOwner.url, label: `@${displayOwner.name}` }" /></span>
                </p>
            <p v-if="contributors?.length > 0" class="collab-name">
                <span>Bidragsytere: <template v-for="(part, i) in contributorParts" :key="i"><NavigationAnchor v-if="part.type === 'collab'" :data="{ href: part.data.profile_url, label: `@${part.data.name}` }" /><template v-else>{{ part.value }}</template></template></span>
            </p>
        </section>
        </main>
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
        // Bruk 'collaborator' flagget fra backenden, som er true hvis det er flere bidragsytere eller eid av andre
        return !!props.data.flags?.collaborator || !!props.data.is_fork;
    });

    const displayOwner = computed(() => {
        return { name: data.value?.owner, url: data.value?.owner_url };
    });

    const contributors = computed(() => {
        if (!props.data?.collaborators) return [];
        const ownerName = displayOwner.value.name?.toLowerCase() || '';
        
        // Filtrer ut den viste eieren og boter. Inkluderer 'krigjo25' hvis han ikke er eier.
        const filtered = props.data.collaborators.filter(c => {
            const name = c?.name?.toLowerCase() || '';
            return name !== ownerName && !name.includes('[bot]');
        });

        return filtered.slice(0, 5); 
    });

    const hasMoreContributors = computed(() => {
        const ownerName = displayOwner.value.name?.toLowerCase() || '';
        const filtered = props.data.collaborators?.filter(c => {
            const name = c?.name?.toLowerCase() || '';
            return name !== ownerName && !name.includes('[bot]');
        }) || [];
        return filtered.length > 5;
    });

    const contributorParts = computed(() => {
        const parts: any[] = [];
        const items = contributors.value;
        items.forEach((collab, i) => {
            parts.push({ type: 'collab', data: collab });
            if (i < items.length - 2) {
                parts.push({ type: 'separator', value: ', ' });
            } else if (i === items.length - 2) {
                parts.push({ type: 'separator', value: ' & ' });
            }
        });

        if (hasMoreContributors.value) {
            parts.push({ type: 'separator', value: '...' });
        }

        return parts;
    });

    //  --- Debugging Logic
    //console.log("BusinessCard props:", props.data);
    //console.error("BusinessCard data:", data.value);
</script>
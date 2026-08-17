<template>
    <section class="business-card grid-layout">
        <header class="card-header flex-wrap-row-justify-between">
            <MediaFigure v-if="hasLanguages && repo?.media" :data="repo.media[num]" :cls="['tech-figure', 'tech-img']" />
            <span v-if="repo?.date?.date" class="date-container" ><b><time :datetime="repo.date.date"> {{ repo.date.date }} </time></b></span>
        </header>

        <main class="card-content">
            <section class="card-content flex-col flex-center">
                <h2> {{ repo?.label || 'Ukjent' }} </h2>
                <p class="description">{{ truncatedDescription }}</p>
            </section>

            <section v-if="hasAnchor && repo?.anchor?.[0]" class="card-nav flex-wrap-row-content-center-justify-evenly">
                <NavigationAnchor :cls="['portofolio-nav']" :data="repo.anchor[0]" />
            </section>
        </main>

        <footer v-if="repo?.media" class="card-footer">
            <section v-if="isCollaboration" class="credits flex-wrap-row-content-center-justify-evenly">
                <p v-if="displayOwner.label && displayOwner.href" class="collab-name">
                    Eier - <NavigationAnchor :data="displayOwner" />
                </p>
                <br>
                <p v-if="contributors?.length > 0" class="collab-name flex-wrap-row flex-center">
                    Bidragsytere - 
                    <template v-for="(part, i) in contributor" :key="i">
                        <NavigationAnchor v-if="part.type === 'collab'" :data="{ label: `@${part.data.name}`, href: part.data.profile_url }" />
                        <template v-else>{{ part.value }}</template>
                    </template>
                </p>
            </section>
            <template v-if="repo.languages?.length > 1">
                <h3>Andre teknologi(er)</h3>
                <section class="flex-wrap-row-content-center-justify-evenly">
                    <template v-for="(media, i) in repo.media.slice(1, 6)" :key="i">
                        <MediaFigure :data="media" :cls="['tech-figure', 'tech-img']" />
                    </template>
                </section>
            </template>
        </footer>
    </section>
</template>
<script lang="ts" setup>

    //  --- Importing dependencies & types
    import { computed } from 'vue';
    import type { RepoProps } from '@/types/props';

    //  --- Props Definition Logic
    const props = defineProps<RepoProps>();

    const data = props.data;
    const repo = computed(() => data);

    //  --- Flags & Computed Logic
    const num:number = 0;
    const hasAnchor = computed(() => (data.anchor?.length || 0) > num);
    const hasLanguages = computed(() => (data.languages?.length || 0) > num);

    const truncatedDescription = computed(() => {
        const limit = 68;
        const description = data?.description || '';
        return description.length > limit ? description.substring(0, limit) + '...' : description;
    });

    //  --- Collaboration logic
    const maxCollaborators: number = 2;
    const collaborators = data.collaborators;
    const isCollaboration = computed(() => { if (!data) return false; return !!data.flags?.collaborator; });
    const displayOwner = computed(() => { return { label: `@${data?.owner}`, href: `${data?.owner_url}` };});

    const contributors = computed(() => {
        if (!collaborators) return [];
        const ownerName = data.owner?.toLowerCase() || '';
        
        // Filtrer ut den viste eieren og boter
        const filtered = collaborators.filter(collab => {
            const name = collab?.name?.toLowerCase() || '';
            return name !== ownerName && !name.includes('[bot]');
        });
        return filtered.slice(0, maxCollaborators); 
    });

    const hasMoreContributors = computed(() => {
        const ownerName = displayOwner.value.label?.toLowerCase() || '';
        const filtered = collaborators?.filter(collab => {
            const name = collab?.name?.toLowerCase() || '';
            return name !== ownerName && !name.includes('[bot]');
        }) || [];
        return filtered.length > maxCollaborators;
    });

    const contributor = computed(() => {
        const collabs: any[] = [];
        const items = contributors.value;
        items.forEach((collab, i) => {
            collabs.push({ type: 'collab', data: collab });
            if (i < items.length - 2) collabs.push({ type: 'separator', value: ', ' }); 
            else if (i === items.length - 2) collabs.push({ type: 'separator', value: ' & ' });
        });

        if (hasMoreContributors.value) collabs.push({ type: 'separator', value: '...' });
        return collabs;
    });

    //  --- Debugging Logic
    //console.log("BusinessCard props:", props.data);
    //console.error("BusinessCard data:", data.value);
</script>
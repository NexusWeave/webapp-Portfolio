<template>
    <section :class="['business-card', 'flex-column']">
        <section :class="['flex-wrap-row-justify-space-between', 'card-content']">
            <span v-for="(tech, i) in data.languages" :key="i">
                <MediaFigure v-if="data.languages && data.languages.length > 0 && i < 1"
                    :data="tech.img"
                    :cls="['tech-figure', 'tech-img']"
                />
            </span>

            <h3  v-if="Array.isArray(data.name) && data.name.length > 1">
                {{ data.name[1] }}
                <span v-if="data.flags.collaborator" :class="['icon']">
                    <MediaIcon :cls="['collaborator']"/>
                </span>
            </h3> 
            <h3  v-else>
                {{ data.label }}
                <span v-if="data.flags.collaborator" :class="['icon']"> <MediaIcon :cls="['collaborator']"/> </span>
            </h3>
            <span :class="['date-container']">
                <b><time :datetime="data.date.created">{{ data.date.created }}</time>
                </b>
            </span>
        </section>

        <section class="flex-column-items-center">
            <NavigationNavMenu v-if="hasAnchor" :cls="['portofolio-nav']" :data="data.anchor" />
            <p>{{ data.description }}</p>

            <section v-if="hasLanguages" :class="['tech-container']">
                <h4>Andre teknologi(er) : </h4>
                <p :class="['flex-wrap-row-justify-space-evenly']">
                    <span v-for="(tech, i) in data.languages" :key="i"> <MediaFigure v-if="i > 0" :data="tech.img" :cls="['tech-figure', 'tech-img']" /> </span>
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
    const hasAnchor = computed(() => props.data.anchor && props.data.anchor.length > 0);
    const hasLanguages = computed(() => props.data.languages && props.data.languages.length > 1);

    //  --- Debugging Logic
    //console.log("BusinessCard props:", props.data);
    //console.error("BusinessCard data:", data.value);
</script>
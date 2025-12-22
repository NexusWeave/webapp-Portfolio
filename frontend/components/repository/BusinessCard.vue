<template>
    <section :class="cls[0]">
        <section :class="cls[1]">
            <MediaFigure :data="data.icon[0]"
                :cls="['tech-figure', 'tech-img']"
            />

            <h3  v-if="Array.isArray(data.name) && data.name.length > 1">{{ data.name[1] }}</h3>
            <h3  v-else>{{ data.label }}</h3>
            <span :class="[cls[2]]">
                <b><time :datetime="data.date.created">{{ data.date.created }}</time>
                </b>
            </span>
        </section>

        <section class="flex-column-items-center">
            <NavigationNavMenu
                :cls="cls[3]"
                toggle="anchor"
                :data="data.anchor"
            />
            
            <p>{{ data.description }}</p>

            <section v-if="!!data.languages && data.languages.length > 0"
                :class="['tech-container']">
                <h4>Teknologi : </h4>
                <p :class="['flex-wrap-row-justify-space-evenly']">
                    <span v-for="(tech, i) in data.languages" :key="i">
                        <span :class="tech.label.toLowerCase()"></span>
                        <b>{{ tech.label }}</b>
                    </span>
                </p>
            </section>
        </section>
    </section>
</template>
<script lang="ts" setup>

    //  --- Importing dependencies & types
    import type { RepoProps } from '@/types/props';

    //  --- Props Definition Logic
    const props = withDefaults(defineProps<RepoProps>(),
    {
        cls: () =>
        [
            ['business-card', 'flex-column'],
            ['flex-wrap-row-justify-space-between', 'card-content'],
            'date-container',
            [
                'portefolio-bar', 
                ['nav-list', 'flex-wrap-row-justify-space-evenly'],
                'nav-item', ['anchor-item']
            ]
        ]
    });

    const cls = computed(() => props.cls);
    const data = computed(() => props.data);

    //  --- Debugging Logic
    //console.error("BusinessCard data:", data.value);
</script>
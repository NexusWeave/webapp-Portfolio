<template>
    <section :class="cls[0]">
        <section :class="cls[1]">
            <MediaFigure  v-for="language in data.lang" :key="language.id" 
                :data="language"
                :cls="['tech-figure', 'tech-img']"
            />

            <h3  v-if="Array.isArray(data.name)">{{ data.name[1] }}</h3>
            <h3  v-else>{{ data.name }}</h3>
            <span :class="[cls[2]]">
                <time v-bind:datetime="data.date">
                    <b>{{ data.date }}</b>
                </time>
            </span>
        </section>

        <section class="flex-column-items-center">
            <NavigationNavMenu
                :cls="cls[3]"
                toggle="anchor"
                :data="data.anchor"
            />
            
            <p>{{ data.description }}</p>
            <section class="flex-wrap-row-justify-space-evenly">
                <h4>Teknologi : </h4>
                <p v-if="!!data.lang && data.lang.length > 0"
                    :class="['tech-container', 'flex-wrap-row-justify-space-evenly']">
                    <span v-for="(tech, i) in data.lang" :key="i">
                        <span :class="tech.label.toLowerCase()"> </span>
                        <b>{{ tech.label }}</b>
                    </span>
                </p>
            </section>
        </section>
    </section>
</template>
<script setup lang="ts">

    //  --- Importing dependencies & types
    import type { RepoProps } from '@/types/props';

    //  --- Props Definition Logic
    const props = withDefaults(defineProps<RepoProps>(),
    {
        cls: () =>
        [
            ['business-card', 'flex-column','flex-wrap-column'],
            ['flex-wrap-row-justify-space-between', 'card-content'],
            'date-container',
            [
                'portefolio-bar', 
                ['nav-list', 'flex-wrap-row-justify-space-evenly'],
                'nav-item', ['anchor-item']
            ]
        ]
    });

    const cls = props.cls;
    const data = props.data;

    //  --- Debugging Logic
    console.error("BusinessCard data:", data);
</script>
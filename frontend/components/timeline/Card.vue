<template>
    <section v-if="!!data.isVisible"
        :class="[{'timeline-active': !!data.isVisible }]">
        <h3 v-if="!!data.organization.anchor">
             <NavigationAnchor :data="data.organization.anchor" />
        </h3>
        <h3 v-else>{{ data.organization.name }}</h3>

        <h4 v-if="!!data.title"> {{ data.title }}</h4>

        <section v-if="!!data.date"
            :class="cls[1]">
            <section class="flex-wrap-row-justify-center">
                <MediaIcon :cls="['icon', 'calendar']" :label="'school year'"/>
                <DateYear v-if="!!data.date.created"
                    :data="data.date.created"
                    :isVisible="!!data.isVisible"
                />
                {{!!data.date.end ? ' - ' : ' - Pågående'}}
                <DateYear v-if="!!data.date.end"
                    :data="data.date.end"
                    :isVisible="!!data.isVisible"
                />
                
            </section>
        </section>

        <section v-if="!!data.techStack && data.techStack.length > 0">
            <h4>Teknologi : </h4>
            <p :class="['tech-container', 'flex-wrap-row-justify-space-evenly']">
                <p v-for="(tech, i) in data.techStack" :key="i" class="tech-item">
                    <span :class="tech.type.toLowerCase()"></span>
                    <b>{{ tech.label }}</b>
                </p>
            </p>
        </section>

        <section :class="cls[5]">
            <ContentRenderer v-if="data.body" :value="data.body" />
        </section>

        <section :class="cls[2]">
            <span v-if="!!data.location">
                <NavigationAnchor :data="data.location" />
            </span>
            <span v-if="!!data.reference">
                <NavigationAnchor :data="data.reference" />
            </span>
        </section>
    </section>
</template>

<script setup lang="ts">
    
    //  --- Import & Props -setup logic
    import { computed } from 'vue';
    import type { TimelineCardProps } from '~/types/props';

    const props = withDefaults(defineProps<TimelineCardProps>(),
    {
        cls: () => [],
        isVisible: () => false,
    });
    
    const cls = props.cls;
    const data = computed(() => props.data);
    const emits = defineEmits(['toggleVisibility']);

    //  --- Debug / log logic
    //console.log("Timeline Card data:", data.value);
</script>
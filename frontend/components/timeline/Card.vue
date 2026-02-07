<template>
    <section v-if="!!data.isVisible"
        :class="[{'timeline-active': !!data.isVisible }, 'flex-column-justify-center']">

        <section class="flex-wrap-row-align-items-center-justify-space-between">
            <section class="section">
                <h3 v-if="!!data.organization.anchor">
                    <NavigationAnchor :data="data.organization.anchor" />
                </h3>
                <h3 v-else>{{ data.organization.name }}</h3>

                <h4 v-if="!!data.title"> {{ data.title }}</h4>

                <section v-if="!!data.date"
                    :class="cls[1]">
                    <section class="flex-wrap-row-align-items-center-justify-center">
                        <MediaIcon :cls="['icon', 'calendar']" :label="'school year'"/>
                        <DatesYear v-if="!!data.date.created"
                            :data="data.date.created"
                            :isVisible="!!data.isVisible"
                        />
                        {{!!data.date.end ? ' - ' : ' - Pågående'}}
                        <DatesYear v-if="!!data.date.end"
                            :data="data.date.end"
                            :isVisible="!!data.isVisible"
                        />
                        
                    </section>
                </section>
                
                <section v-if="!!data.techStack && data.techStack.length > 0"
                    :class="['tech-container']">
                    <h4>Teknologi : </h4>
                    <p :class="['flex-wrap-row-justify-space-evenly']">
                        <span v-for="(tech, i) in data.techStack" :key="i">
                            <span :class="tech.type.toLowerCase()"></span>
                            <b>{{ tech.label }}</b>
                        </span>
                    </p>
                </section>

                <section :class="cls[2]">
                    <h3 v-if="!!data.location.anchor.href">
                        <NavigationAnchor :data="data.location.anchor" />
                    </h3>
                    <h3 v-else>
                        {{ data.location.name }}
                    </h3>
                    
                    <h3 v-if="!!data.reference.anchor">
                        <NavigationAnchor  :data="data.reference.anchor" />
                    </h3>
                </section>
            </section>

            <section class="section">
                    <ContentRenderer v-if="data.body" :value="data.body" />
            </section>
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
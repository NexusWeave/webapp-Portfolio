<template>
    <section :class="['timeline-card-wrapper', {'timeline-active': !!isVisible }, 'flex-col-justify-center']">
        <div class="timeline-pointer"></div>
        <section class="timeline-card-content flex-col">
            
            <header class="timeline-card-header flex-col">
                <div class="header-main flex-row-justify-between">
                    <h2 v-if="!!data.title?.href" class="timeline-main-title"> 
                        <NavigationAnchor :data="data.title" /> 
                    </h2>
                    <h3 v-else class="timeline-main-title"> {{ data.title?.label }} </h3>
                    
                    <div class="timeline-location flex-row-items-center">
                         <span class="location-icon">📍</span>
                         <NavigationAnchor v-if="!!data.location?.href" :data="data.location" />
                         <span v-else>{{ data.location?.label }}</span>
                    </div>
                </div>
            </header>

            <section v-if="data.body" class="timeline-body-content">
                <Suspense>
                    <template #default>
                        <ContentRenderer :value="data.body" />
                    </template>
                    <template #fallback>
                        <section class="alert-info"><p>Laster innhold...</p></section>
                    </template>
                </Suspense>
            </section>

            <section class="timeline-sub-list">
                <div v-for="sub, i in data.subjects" :key="i" :class="['subject-item', 'flex-wrap-row-justify-content-evenly', 
                { 'subject-expandable': !!sub.body, 'subject-expanded': expandedSubjects.includes(i) }]">

                <h3 class="flex-row-items-center-justify-content-space-between">
                    <template v-if="!!sub.title.href" >
                        <NavigationAnchor :data="sub.title" /> 
                    </template>
                    <template v-else> {{ sub.title.label }} </template>
                </h3>
                    <div class="flex-wrap-row-justify-between" @click="sub.body ? toggleSubject(i) : null">
                        <span v-if="sub.body" class="expand-icon inline-items-justify-center">
                            {{ expandedSubjects.includes(i) ? '−' : '+' }}
                        </span>
                        
                        <span class="subject-date ">
                            <template v-if="sub.date.created && sub.date.end">
                                <DatesYear :data="sub.date.created.date" :isVisible="!!props.isVisible" />
                                <span> - </span>
                                <DatesYear :data="sub.date.end.date" :isVisible="!!props.isVisible" />
                            </template>
                            <span v-else>Pågående</span>
                        </span>


                        <div class="subject-content flex-col">
                            <div v-if="!!sub.techStack && sub.techStack.length > 0" class="tech-container flex-col">
                                <div class="tech-icons flex-wrap-row"> 
                                    <template v-for="(tech, j) in sub.techStack" :key="j">
                                        <MediaFigure v-if="tech" :data="tech" :cls="['tech-figure', 'tech-img']" />
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>


                    <transition name="expand">
                        <div v-if="sub.body && expandedSubjects.includes(i)" class="sub-details">
                            <div class="details-content">
                                <Suspense>
                                    <template #default>
                                        <MDC :value="sub.body" />
                                    </template>
                                    <template #fallback>
                                        <section class="alert-info"><p>Laster inn beskrivelse...</p></section>
                                    </template>
                                </Suspense>
                            </div>
                        </div>
                    </transition>
                </div>
            </section>
        </section>
    </section>
</template>

<script lang="ts" setup >
    
    //  --- Import & Props -setup logic
    import { computed, ref } from 'vue';
    import type { TimelineCardProps } from '~/types/timeline';

    const props = withDefaults(defineProps<TimelineCardProps>(), { cls: () => [], isVisible: false });
    
    const cls = computed(() => props.cls);
    const data = computed(() => props.data);
    const emits = defineEmits(['toggleVisibility']);

    //  --- Expansion Logic
    const expandedSubjects = ref<number[]>([]);

    function toggleSubject(index: number) {
        const pos = expandedSubjects.value.indexOf(index);
        if (pos > -1) {
            expandedSubjects.value.splice(pos, 1);
        } else {
            expandedSubjects.value.push(index);
        }
    }

    //  --- Debug / log logic
    //console.log("Timeline Card data:", data.value);
</script>
<template>
    <section :class="['timeline-card-wrapper', {'timeline-active': !!isVisible }, 'flex-col-justify-center']">
        <div class="timeline-pointer"></div>
        <section class="timeline-card-content flex-col">
            
            <header class="timeline-card-header flex-col">
                <div class="header-main flex-row-justify-between">
                    <h3 v-if="!!data.title?.href" class="timeline-main-title"> 
                        <NavigationAnchor :data="data.title" /> 
                    </h3>
                    <h3 v-else class="timeline-main-title"> {{ data.title?.label }} </h3>
                    
                    <div class="timeline-location flex-row-items-center">
                         <span class="location-icon">📍</span>
                         <NavigationAnchor v-if="!!data.location?.href" :data="data.location" />
                         <span v-else>{{ data.location?.label }}</span>
                    </div>
                </div>
            </header>

            <section v-if="data.body" class="timeline-body-content">
                <ContentRenderer :value="data.body" />
            </section>

            <section class="timeline-subjects-list flex-col">
                <div v-for="sub, i in data.subjects" :key="i" 
                     :class="['subject-item', { 'subject-expandable': !!sub.body, 'subject-expanded': expandedSubjects.includes(i) }]">
                    
                    <div class="subject-grid-container" @click="sub.body ? toggleSubject(i) : null">
                        <div class="subject-date flex-col">
                            <template v-if="sub.date">
                                <DatesYear v-if="sub.date.created" :data="sub.date.created.current" :isVisible="!!props.isVisible" />
                                <span class="date-dash"> - </span>
                                <DatesYear v-if="sub.date.end" :data="sub.date.end.current" :isVisible="!!props.isVisible" />
                                <span v-else class="ongoing">Pågående</span>
                            </template>
                        </div>
                        
                        <div class="subject-content flex-col">
                            <div class="subject-header flex-row-items-center-justify-content-space-between">
                                <h4 v-if="!!sub.title.href" class="subject-title"> 
                                    <NavigationAnchor :data="sub.title" /> 
                                </h4>
                                <h4 v-else class="subject-title">{{ sub.title.label }}</h4>
                                
                                <span v-if="sub.body" class="expand-icon">
                                    {{ expandedSubjects.includes(i) ? '−' : '+' }}
                                </span>
                            </div>

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
                        <div v-if="sub.body && expandedSubjects.includes(i)" class="subject-details">
                            <div class="details-content">
                                <MDC :value="sub.body" />
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
<template>
    <article :class="['timeline-card-wrapper', {'timeline-active': !!isVisible }, 'timeline-card-content', 'flex-col']">
        <span class="timeline-pointer" aria-hidden="true"></span>
        
        <header class="timeline-card-header flex-col">
            <section class="header-main flex-row-justify-between">
                <h3 v-if="!!data.title?.href" class="timeline-main-title"> 
                    <NavigationAnchor :data="data.title" /> 
                </h3>
                <h3 v-else class="timeline-main-title"> {{ data.title?.label }} </h3>
                
                <address class="timeline-location flex-row-items-center">
                     <span class="location-icon" aria-hidden="true">📍</span>
                     <NavigationAnchor v-if="!!data.location?.href" :data="data.location" />
                     <span v-else>{{ data.location?.label }}</span>
                </address>
            </section>
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

        <ul class="timeline-subjects-list flex-col">
            <li v-for="sub, i in data.subjects" :key="i" 
                 :class="['subject-item', { 'subject-expandable': !!sub.body, 'subject-expanded': expandedSubjects.includes(i) }]">
                
                <details :open="expandedSubjects.includes(i)" class="subject-details-wrapper">
                    <summary class="subject-grid-container" @click.prevent="sub.body ? toggleSubject(i) : null" :role="sub.body ? 'button' : undefined">
                        <section class="subject-date flex-col">
                            <template v-if="sub.date">
                                <DatesYear v-if="sub.date.created" :data="sub.date.created.current" :isVisible="!!props.isVisible" />
                                <span class="date-dash" aria-hidden="true"> - </span>
                                <DatesYear v-if="sub.date.end" :data="sub.date.end.current" :isVisible="!!props.isVisible" />
                                <span v-else class="ongoing">Pågående</span>
                            </template>
                        </section>
                        
                        <section class="subject-content flex-col">
                            <header class="subject-header flex-row-items-center-justify-content-space-between">
                                <h4 v-if="!!sub.title.href" class="subject-title"> 
                                    <NavigationAnchor :data="sub.title" /> 
                                </h4>
                                <h4 v-else class="subject-title">{{ sub.title.label }}</h4>
                                
                                <span v-if="sub.body" class="expand-icon inline-items-justify-center" aria-hidden="true">
                                    {{ expandedSubjects.includes(i) ? '−' : '+' }}
                                </span>
                            </header>

                            <section v-if="!!sub.techStack && sub.techStack.length > 0" class="tech-container flex-col">
                                <ul class="tech-icons flex-wrap-row"> 
                                    <li v-for="(tech, j) in sub.techStack" :key="j">
                                        <MediaFigure v-if="tech" :data="tech" :cls="['tech-figure', 'tech-img']" />
                                    </li>
                                </ul>
                            </section>
                        </section>
                    </summary>

                    <transition name="expand">
                        <section v-if="sub.body && expandedSubjects.includes(i)" class="subject-details">
                            <section class="details-content">
                                <Suspense>
                                    <template #default>
                                        <MDC :value="sub.body" />
                                    </template>
                                    <template #fallback>
                                        <section class="alert-info"><p>Laster beskrivelse...</p></section>
                                    </template>
                                </Suspense>
                            </section>
                        </section>
                    </transition>
                </details>
            </li>
        </ul>
    </article>
</template>

<script lang="ts" setup >
    
    //  --- Import & Props -setup logic
    import { computed, ref } from 'vue';
    import type { TimelineCardProps } from '~/types/timeline';

    const props = withDefaults(defineProps<TimelineCardProps>(), {
        cls: () => [],
        isVisible: false,
        data: () => ({
            id: 0,
            date: { created: { current: "2025" }, end: { current: "2026" } },
            isVisible: true,
            subjects: [
                {
                    title: { label: "Test Subject" },
                    date: { created: { current: "2025" }, end: { current: "2026" } },
                    techStack: [],
                    body: "Test description body content"
                }
            ],
            location: { label: "Test Location" },
            title: { label: "Test Title" }
        } as any)
    });

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

</script>
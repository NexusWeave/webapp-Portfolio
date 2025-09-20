<template>
    <template>
        <section :class="[cls[0], cls[1]]">
            <section :class="cls[2], cls[3]">
                <TimelineFilter
                :data="range"
                :cls="[['flex-column-align-items-center', 'timeline-item'],
                'timeline-input-label', 'timeline-input']"
                @toggleVisibility="toggleVisibility"/>
            </section>

            <section :class="cls[3]">
                <h3>
                    <DateYear v-for="data in timeline" :key="data.id"
                        :year="data.year" :isVisible="data.isVisible"/>
                </h3>
            </section>

            <section :class="cls[3]">
                <TimelineCard v-for="data in timeline" :key="data.id"
                        :data="data" :cls="
                        [
                            [
                                'flex-wrap-column', 
                                cls[4],
                                'timeline-content'
                            ],
                                'flex-column-justify-center-align-center',
                'flex-wrap-row-align-content-start-justify-space-evenly',
                ['tech-container', 'flex-wrap-row-justify-space-evenly'], 'tech-item', 'timeline-description',
                    'timeline-list', 'timeline-item']"/>
            </section>
        </section>

    </template>

</template>
<script setup lang="ts">

    interface Props
    {
        cls?: Array<any>;
        range?: Record<string,any>;
        data: Record<string, any>;
    }

    import { computed } from 'vue'

    const props = withDefaults(defineProps<Props>(),
    {
        range: () =>
                ({
                    "value": 0,
                    "rangeMax": 0,
                    "type": 'range',
                    "name": "akademic-timeline",
                    "title": 'Undefined Timeline',
                    
                }),
        cls: () => ['component-blue', 'timeline-container',
        'timeline-line', 'flex-wrap-row-justify-space-evenly', 'component-w-g-b']
    });

    const cls = computed(() => 
    {
        const parentCls = Array.isArray(props.cls) ? props.cls : []; 
        const replacementCls = parentCls.length > 0 ? parentCls[0] : 'component-blue';
        const defaultCls = ['component-blue', 'timeline-container', 'timeline-line', 'flex-wrap-row-justify-space-evenly'];

        const modDefault = defaultCls.map((c) =>
        {
            if (c === 'component-blue' && c != replacementCls) {
                return replacementCls;
            }
            return c;
        });

        return [
            ...modDefault,
            ...parentCls.slice(1).filter(c => !modDefault.includes(c))
        ];
    });

    const range = props.range;
    const timeline = computed(() => props.data);


    const emits = defineEmits(['toggleVisibility'])
    const toggleVisibility = (id:number) => 
        {
            emits('toggleVisibility', id);
        };

    //console.warn("Academic data on load:", academic.timelines);
</script>
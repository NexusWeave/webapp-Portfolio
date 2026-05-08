<template>
        <section :class="[cls[0], cls[1]]">
            <section :class="[cls[2], cls[3]]">
                <TimelineFilter :data="filter" :cls="[['flex-column-align-items-center', 'timeline-item'], 'timeline-input-label', 'timeline-input']" @toggleVisibility="toggleVisibility" />
            </section>
            <section :class="cls[3]">
                <DatesYear v-for="item in data" :key="item.id"
                    :data="item.date.created"
                    :isVisible="!!item.isVisible"
                />
            </section>
            <section :class="['timeline-content', cls[4]]">
                <TimelineCard v-for="item in data" :key="item.id"
                    :data="item"
                    :isVisible="item.isVisible"
                    :cls="[cls[4], 'timeline-card', 'timeline-active', cls[5], cls[6]]"
                />
            </section>
        </section>
</template>
<script setup lang="ts">

    //  --- Import & types logic
    import { computed, ref } from 'vue';
    import type { TimelineItem, TimelineProps } from '~/types/timeline';

    //  --- Props & reactive logic
    const props = withDefaults(defineProps<TimelineProps>(), { cls: () => ['component-blue', 'timeline-container', 'timeline-line', 'flex-wrap-row-justify-space-evenly', 'component-w-g-b'] });

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

   const data = ref<TimelineItem[]>(props.data);
   const rangeValue = ref('0');

    const filter = computed(() => (
        {
            title: props.title,
            range:
            {
                value: rangeValue.value,
                step: 0.1,
                type: 'range',
                name: "timeline-input",
                rangeMax: Math.max(0, data.value.length - 1),
            }
        }));

    function toggleVisibility(id:number): void
        {
            rangeValue.value = String(id);
            const target = Math.round(Number(id));
            data.value.forEach((item) => 
            {
                item.isVisible = (item.id === target);
            });
        };

        //  --- Debugging Logic
        //console.log("Timeline.vue\n Transfered data :", data);
        //console.log("Timeline.vue\n Processed data :", data);
        //console.log("Timeline.vue\n Transfered filter :", filter);
</script>
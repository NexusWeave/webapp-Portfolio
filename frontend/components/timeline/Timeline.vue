<template>
        <section :class="[...cls, 'timeline-explorer-wrapper', 'flex-column']">
            <h2 class="timeline-title">{{ props.title }}</h2>

            <section class="timeline-track-container">
                <section class="timeline-track-wrapper flex-row flex-row-align-items-center">
                    <div class="timeline-track"></div>
                    <div class="timeline-dots flex-row flex-justify-space-between">
                        <div v-for="item in data" :key="'dot-'+item.id" 
                             :class="['timeline-dot', { 'active': item.isVisible }]">
                        </div>
                    </div>
                    <TimelineFilter :data="filter" :cls="[['timeline-item'], 'timeline-filter-title', 'timeline-input']" @toggleVisibility="toggleVisibility" />
                </section>
            </section>

            <section :class="['timeline-content-wrapper', 'flex-row', 'flex-justify-center']">
                <TimelineCard v-for="item in data" :key="item.id"
                    :data="item"
                    :isVisible="item.isVisible"
                    :cls="['timeline-card', { 'timeline-active': item.isVisible }]"
                />
            </section>
        </section>
</template>
<script setup lang="ts">

    //  --- Import & types logic
    import { computed, ref } from 'vue';
    import type { TimelineItem, TimelineProps } from '~/types/timeline';

    //  --- Props & reactive logic
    const props = withDefaults(defineProps<TimelineProps>(), { cls: () => ['component-blue', 'timeline-container', 'flex-wrap-row-justify-space-evenly', 'component-w-g-b'] });

    const cls = computed(() => 
    {
        const parentCls = Array.isArray(props.cls) ? props.cls : []; 
        const replacementCls = parentCls.length > 0 ? parentCls[0] : 'component-blue';
        const defaultCls = ['component-blue', 'timeline-container', 'flex-wrap-row-justify-space-evenly'];

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
   
   // Initialize visibility: if no item is visible, make the first one visible
   if (data.value.length > 0 && !data.value.some(item => item.isVisible)) {
       data.value[0].isVisible = true;
   }

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
<template>

        <section :class="[cls[0], cls[1]]">
            <section :class="cls[2], cls[3]">
                <TimelineFilter
                    :data="filter"
                    :cls="[['flex-column-align-items-center', 'timeline-item'],
                    'timeline-input-label', 'timeline-input']"
                    @toggleVisibility="toggleVisibility"
                />
            </section>
            <section :class="cls[3]">
                <DateYear v-for="item in data" :key="item.id"
                    :data="item.date.created"
                    :isVisible="!!item.isVisible"
                />
            </section>
            <section :class="['timeline-content', 'card-container',cls[4]]">
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
    import { computed } from 'vue';

    import type { TimelineProps } from '~/types/props';
    import type { TimelineItem } from '~/types/timeline';

    //  --- Props & reactive logic
    const props = withDefaults(defineProps<TimelineProps>(),
    {

        cls: () => ['component-blue', 'timeline-container',
        'timeline-line', 'flex-wrap-row-justify-space-evenly', ['card-container', 'component-w-g-b']],
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

   const data = ref<TimelineItem[]>(props.data);

    const filter = computed(() => (
        {
            title: props.title,
            range:
            {
                value: '0',
                type: 'range',
                name: "timeline-input",
                rangeMax: data.value.length - 1,
            }
        }));

    function toggleVisibility(id:number): void
        {
            const target = Number(id);
            data.value.forEach((item) => 
            {

                if(item.id === target) item.isVisible = !item.isVisible;
                else item.isVisible = false;
            });
        };

        //  --- Debugging Logic
        //console.log("Timeline.vue\n Transfered data :", data);
        //console.log("Timeline.vue\n Processed data :", data);
        //console.log("Timeline.vue\n Transfered filter :", filter);
</script>
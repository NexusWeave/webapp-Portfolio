<template>
        <section :class="[cls[0], cls[1]]">
            <section :class="cls[2], cls[3]">
                <h2 :class="cls[1]">{{  title ?? "Untitled Timeline" }}</h2>
                <SchemaForm :data="schema" @input="toggleVisibility"/>

            </section>
            <section :class="cls[3]">
                <DatesYear v-for="item in data" :key="item.id"
                    :data="item.date.created"
                    :isVisible="!!item.isVisible"
                />
            </section>
            <section :class="[, 'timeline-content',cls[4]]">
                <TimelineCard v-for="item in data" :key="item.id"
                    :data="item"
                    :isVisible="item.isVisible"
                    :cls="[, cls[4], 'timeline-card', 'timeline-active', cls[5], cls[6]]"
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
    const title = computed(() => props.title);
   const data = ref<TimelineItem[]>(props.data);
   

    const schema =
    {
        action: '#',
        name: props.title.toLowerCase().replace(/\s+/g, '-') ?? '',
        inputControl: [ { id: 'timeline-input', modelValue: '0', type: 'range', name: "timeline-input", rangeMax: data.value.length - 1, }]
    }


    function toggleVisibility(id: number): void
        {
            const target = Number(id);

            data.value.forEach((item) => 
            {
                console.log(item.id, target);
                if(item.id === target) item.isVisible = !item.isVisible;
                else item.isVisible = false;
            });
        };

    //  --- Debugging Logic
    //console.log("Timeline.vue\n Transfered data :", data.value);
    //console.log("Timeline.vue\n Processed data :", data);
    //console.log("Timeline.vue\n Transfered filter :", schema.value);
</script>
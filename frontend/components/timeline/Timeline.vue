<template>
        <section :class="[...cls, 'timeline-explorer-wrapper', 'flex-col-items-center']">
            <h2 class="timeline-title">{{ props.title }}</h2>

            <nav aria-label="Tidslinje kontroll" class="timeline-track-container">
                <section class="timeline-track-wrapper flex-row-items-center">
                    <div class="timeline-track"></div>
                    <ol class="timeline-dots flex-row-justify-between">
                        <li v-for="item in data" :key="'dot-'+item.id" 
                             :class="['timeline-dot', { 'active': item.isVisible }]">
                        </li>
                    </ol>
                    <TimelineFilter :data="filter" :cls="[['timeline-item'], 'timeline-filter-title', 'timeline-input']" @toggleVisibility="toggleVisibility" />
                </section>
            </nav>

            <section :class="['timeline-content-wrapper', 'flex-row-justify-center']">
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
    const props = withDefaults(defineProps<TimelineProps>(), { cls: () => ['component-blue', 'timeline-container', 'component-w-g-b'] });

    const cls = computed(() => 
    {
        const parentCls = Array.isArray(props.cls) ? props.cls : []; 
        const replacementCls = parentCls.length > 0 ? parentCls[0] : 'component-blue';
        const defaultCls = ['component-blue', 'timeline-container'];

        const modDefault = defaultCls.map((c) =>
        {
            if (c === 'component-blue' && c != replacementCls) {
                return replacementCls;
            }
            return c;
        });

        return parentCls.length > 0 ? modDefault : defaultCls;
    });

    const data = computed(() => props.data);
    const rangeValue = ref<string>('0');

    const filter = computed(() => 
    {
        const title: string = props.title;
        const max: number = data.value?.length - 1 || 0; 
        
        return {
            title: title, 
            range: {
                value: rangeValue.value,
                step: 1,
                type: 'range',
                name: "timeline-input",
                rangeMax: max
            }
        };
    });

    //  --- Method definitions
    function toggleVisibility(id: number): void
    {
        rangeValue.value = String(id);
        const target = Math.round(Number(id));
        data.value.forEach((item) =>
        {
            if (item.id === target) {
                item.isVisible = true;
            } else {
                item.isVisible = false;
            }
        });
    }

    //  --- Debugging / log logic
    //console.log("Timeline component data : ", data.value);

</script>
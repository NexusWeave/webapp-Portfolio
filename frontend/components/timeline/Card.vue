<template>
    <section v-if="!!data.isVisible"
        :class="[cls[0], {'timeline-active': !!data.isVisible }]">
        <h3 v-if="!!data.institution">
             <NavigationAnchor :data="data.institution" />
        </h3>
        <h3 v-else>{{ data.name }}</h3>
        <h4 v-if="!!data.title"> {{ data.title }}</h4>

        <section v-if="!!data.start || !!data.end"
        :class="cls[1]">
            <section class="flex-wrap-row-justify-center">
                <MediaIcon :cls="['icon', 'calendar']" :label="'school year'"/>
                <span>{{ data.start}}</span>
                {{!!data.end ? ' - ' : ''}}
                <span v-if="!!data.end">{{data.end }}</span>
            </section>
        </section>

        <section v-if="!!data.tech">
            <h4>Teknologi : </h4>
            <span :class="cls[3]">
                <span v-for="tech in data.tech" :key="tech"
                    :class="tech.type">
                    {{ tech.label }}
                </span>
            </span>
        </section>

        <section v-if="!!data.body"
            :class="cls[5]">
            <p>{{ data.body.body }}</p>
            <ul v-if="!!data.body.list" :class="cls[6]">
                <li v-for="item in data.body.list" :key="item"
                    :class="cls[7]">
                    {{ item }}
                </li>
            </ul>
        </section>

        <section :class="cls[2]">

            <span v-if="!!data.location">
                <NavigationAnchor :data="data.location" />
            </span>
            <span v-if="!!data.diploma">
                <NavigationAnchor :data="data.diploma" />
            </span>
            <span v-if="!!data.reference">
                <NavigationAnchor :data="data.reference" />
            </span>
        </section>
    </section>
</template>

<script setup lang="ts">
    
    interface Props
    {
        cls?: Array<string | string[]>;
        data: Record<string, any>;
    }
    
    const props = withDefaults(defineProps<Props>(),
    {
        cls: () => []
    });
    
    const cls = props.cls;
    const data = computed(() => props.data);
    const emits = defineEmits(['toggleVisibility']);

    //console.log("Card data:", content.value);
</script>
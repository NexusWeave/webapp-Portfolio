<template>
    <span v-for="(tag, i) in data" :key="i" :class="cls">
        <NavigationAnchor v-if="isAnchor" :data="data.anchor" :cls="cls" />         
        <i v-if="!!tag.icon" class="icon"></i> 
        {{ tag }}
    </span>
</template>

<script setup lang="ts">

    import { computed } from 'vue';

    interface TagProps { data: string[]; cls?: string[]; }

    //  Define props
    const props = withDefaults(defineProps<TagProps>(), { cls: () => [] });
    const cls = computed(() => props.cls);

    const data = computed(() => { 
        const tagData = props.data;
        if (Array.isArray(tagData)) return tagData.map(tag => { cls.value.push(tag); return tag; });

        return props.data
    });

    

    //  --- Computed logic
    const isAnchor = computed(() => !!data.value.anchor);

    //  --- Debugging logic
    //console.log("Tag data:", data.value);
    
</script>
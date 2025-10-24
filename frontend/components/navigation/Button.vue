<template>
    <button 
        :class="btn.cls"    
        :type="btn ? btn.type : 'button'"
        @click="btn.action()"     
        :disabled="btn.disabled">
        <template v-if="btn.anchor">
            <NavigationAnchor :data="btn.anchor" v-if="btn.anchor"/>
        </template>

        <template v-else>
            {{ btn.label }}
        </template>    
            
    </button>
</template>

<script setup>

    import { watch } from 'vue';

    const props = defineProps({
        data: {
            type: Object,
            required: true
        },
    });

    const btn = computed(() => props.data);

    watch(() => props.data, (newValue) => {
        Object.assign(btn.value, newValue);
    }, { immediate: true });

    //console.log("Button component loaded with data: ", btn);

</script>
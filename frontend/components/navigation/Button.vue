<template>
    <button 
        :class="btn.cls"    
        :type="btn ? btn.type : 'button'"
        $srcclick="btn.action()"     
        :disabled="btn.disabled">
        <template v-if="btn.anchor">
            <Anchor :data="btn.anchor" v-if="btn.anchor"/>
        </template>

        <template v-else>
            {{ btn.label }}
        </template>    
            
    </button>
</template>

<script setup>

    import { defineProps, watch } from 'vue';

    import Anchor from '$src/components/navigation/Anchor.vue';

    const props = defineProps({
        data: {
            type: Object,
            required: true
        },
    });

    const btn = props.data;
    watch(() => props.data, (newValue) => {
        Object.assign(btn, newValue);
    }, { immediate: true });

    //console.log("Button component loaded with data: ", btn);

</script>
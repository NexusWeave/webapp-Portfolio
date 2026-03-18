<template>
    <button 
        :class="btn.cls"    
        :type="btn.type"
        @click="btn.action()"     
        :disabled="btn.disabled">

        <NavigationAnchor v-if="btn.anchor" :data="btn.anchor"/>

        <template v-else>
            {{ btn.label }}
        </template>    
            
    </button>
</template>

<script setup lang="ts">

    //  --- Importing dependencies & types
    import { watch, computed } from 'vue';

    interface ButtonProps { data:ButtonItem; }

    interface ButtonItem
    {
        id: number;
        label: string;
        cls: string[];
        type?: "button" | "submit" | "reset";
        disabled?: boolean;
        action: () => void;
        anchor?: { type: string[]; label: string; href: string; } | null; 
    }

    //  --- props definition logic
    const props = withDefaults(defineProps<ButtonProps>(), { data: () => ({ anchor: null, type: 'button', disabled: false, action: () => {} } as ButtonItem) });
    const btn = computed(() => props.data);

    //  --- Watcher
    watch(() => props.data, (newValue) => { Object.assign(btn.value, newValue); }, { immediate: true });

    //  --- Debug logic
    //console.log("Button component loaded with data: ", btn);

</script>
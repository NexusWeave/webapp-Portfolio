<template>
    <template v-if="isMembers">
        <ul class ="card-container flex-wrap-row-align-content-start-justify-space-evenly">
            <li v-for="member in data.members" :key="member.id"
            :class="['card-item']">
                <Anchor v-if="!!member.anchor" :data="member.anchor"/>
                <span v-if="!member.anchor">{{ member.label }}</span>
                <p>
                    
                    <span v-if="member.description">{{ member.description }}</span>
                </p>
            </li>
        </ul>
    </template>

    <template v-else>
        <h4 v-if="list.title">{{ list.title }}</h4>
        <ul>
            <li v-for="(bullet, i) in list.list" :key="i">
                <p>
                    <Anchor v-if="bullet.anchor" :data="bullet.anchor"/>
                    <span v-else>{{ bullet.bullet }}</span>
                </p>
            </li>
        </ul>
    </template>
</template>
<script setup>
    import { computed, defineProps } from 'vue';

    import Anchor from '$src/components/navigation/Anchor.vue';

    const props = defineProps({
        data: {
            type: Object,
            required: true
        },
        cls: {
            type: Array,
            required: false
        }
    });

    const data = props.data;
    const list = computed(() => {
        return !!data.list ? data.list : [];
    });
    const isMembers = computed(() => {
        return !!data.isMembers && data.members.length > 0;
    });
    //console.warn('List Component loaded with data: ', data);
</script>
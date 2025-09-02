<template>
    <section :class="['flex-wrap-row-justify-space-evenly']">
        <Achievements />
        <Academic />
    </section>
    <section>
        <Portfolio />
    </section>
</template>

<script setup>
    import Academic from '@/components/Academic.vue';
    import Achievements from '@/components/Achievements.vue';
    import Portfolio from '@/components/portfolio/Portfolio.vue';
</script>
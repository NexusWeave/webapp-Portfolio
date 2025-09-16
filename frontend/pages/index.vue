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
    import Academic from '$src/components/Academic.vue';
    import Achievements from '$src/components/Achievements.vue';
    import Portfolio from '$src/components/portfolio/Portfolio.vue';
</script>
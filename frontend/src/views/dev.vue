<template>
    <section class="flex-column-justify-center-align-center">
        <h2> Kristoffer Gjøsund</h2>
        <article>
            <h2> Backend-utvikler profil</h2>
        </article>

        <article>
            <h2> frontend utvikler profil </h2>
        </article>
        <h2> Utdanning og Portefølje</h2>
        <section class="flex-wrap-row-justify-space-evenly">
            
            <Academic />
            <Portfolio />
        </section>

    </section>
</template>

<script setup>
    import Academic from '@/components/Academic.vue';
    import Portfolio from '@/components/Achievements.vue';
</script>
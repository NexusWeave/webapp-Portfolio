<template>
    <section class="flex-column-align-items-center">
        <section>
            <h2> Aktuelle innlegg </h2>
        </section>
        <section class="flex-wrap-row-justify-space-evenly">
            <section>
                <p> Bilde av meg</p>
            </section>

            <article>
                <h2> Kristoffer Gjøsund</h2>
                <p> Profil informasjon om meg</p>
            </article>
        </section>

        <section>
            <h2> Trenings innlegg </h2>
        </section>
        
        <section>
            <Repo />
        </section>

        <section>
            <h2> Litt dypere om min reise </h2>
        </section>

        <section>
            <h2> mer historie om meg</h2>
        </section>
    </section>

</template>

<script setup>
    import Figure from '@/components/media/Figure.vue';
    import Repo from '@/components/portfolio/Portfolio.vue';
</script>
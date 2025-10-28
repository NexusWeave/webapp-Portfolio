<template>
    <section class="flex-wrap-row-justify-space-evenly">
        <section class="flex-column-justify-space-evenly">
            <article v-for="data in dev" :key="data.id" class="bio">
                <h3>{{ data.title }}</h3>
                <ContentRenderer :value="data"/>
            </article>

        </section>

    </section>
</template>
<script setup lang="ts">

    const path = 'dev';
    const {data: dev} = await useAsyncData('dev', () => 
    {
        return queryCollection(path).all();
    });
    //console.log(dev.value);
</script>
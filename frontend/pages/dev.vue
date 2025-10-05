<template>
    <section class="flex-column-justify-center-align-center">
        <article v-for="data in dev" :key="data.id" class="article-dev">
            <h3>{{ data.title }}</h3>
            <ContentRenderer :value="data"/>
        </article>


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
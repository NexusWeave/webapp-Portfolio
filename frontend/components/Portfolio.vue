<template>
    <section class="flex-column-items-center" v-if="toogle != 'repo'">
        <CardsPortfolioCard v-for="content in data" :key="content.id" 
        :data="content"
        :cls = "['card-container', 'tech']" />
    </section>
    <section v-if="toogle == 'repo'">

    </section>
</template>
<script setup lang="ts">

    interface Props
    {
        data:Array
        cls?: Array;
        toogle: string
    }
    const props = defineProps<Props>()

    const cls = props.cls;
    
    const data = props.data;
    const toogle = props.toogle;
    
    console.log(toogle, data)
</script>
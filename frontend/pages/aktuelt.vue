<template>
    <article>
        <h2> Mine Faglige Logger </h2>
        <section class="blog-section flex-wrap-row">
            <UtilsPagination v-if="totalDevPages > 1"
                    :activePage="currentDevPage" 
                    :totalPage="totalDevPages" 
                    @update="currentDevPage = $event"
                />
            <section v-for="(post, index) in mappedDev" :key="index" class="blog-content">
                <h2>{{ post.title }}</h2>
                <p><strong>Publisert:</strong> {{ post.date }}</p>
                <MDC :value="post.ingress" />
                <NavigationAnchor :data='post.anchor'/>
            </section>
        </section>

        <h2> Mine Personlige Logger </h2>
        <section class="blog-section flex-wrap-row">
            <UtilsPagination v-if="totalPersonalPages > 1"
                    :activePage="currentPersonalPage" 
                    :totalPage="totalPersonalPages" 
                    @update="currentPersonalPage = $event"
                />
            <section v-for="(post, index) in mappedPersonal" :key="index" class="blog-content">
                <h2>{{ post.title }}</h2>
                <p><strong>Publisert:</strong> {{ post.date }}</p>
                <MDC :value="post.ingress" />
                <NavigationAnchor :data='post.anchor'/>
            </section>
        </section>
    </article>
</template>
<script setup lang="ts">
    import { ref, computed } from 'vue';                        // @ts-ignore
    import { fetchCollection } from '#imports';                 // @ts-ignore
    import { blogPagination } from '@/composables/pagination';  // @ts-ignore

    import type { BlogCollectionItem } from '@nuxt/content';

    //  --- Dev Data Logic
    const devPath = 'dev_posts';
    const devCache = 'devCache';
    const rawDev = await fetchCollection<BlogCollectionItem>(devPath, devCache)

    const personalPath = 'personal_posts';
    const personalCache = 'personalCache';
    const rawPersonal = await fetchCollection<BlogCollectionItem>(personalPath, personalCache);

     //  --- Pagination Logic
    const n = 8;
    const currentDevPage = ref<number>(1);
    const currentPersonalPage = ref<number>(1);

    const totalDevPages = computed(() => { if (rawDev.value) return Math.ceil(rawDev.value.length / n); return 0; });
    const totalPersonalPages = computed(() => { if (rawPersonal.value) return Math.ceil(rawPersonal.value.length / n); return 0; });

    const mappedDev = blogPagination(rawDev.value, currentDevPage.value);
    const mappedPersonal = blogPagination(rawPersonal.value, currentPersonalPage.value);

    // Debugging logs
    console.log(rawDev.value);
    console.log(rawPersonal.value);
    
</script>
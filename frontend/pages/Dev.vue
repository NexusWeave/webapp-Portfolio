<template>
    <section class="flex-wrap-row-justify-space-around">
        <section class="dev-bar">
            <MediaFigure
                :data="{
                    type: 'jpg',
                    src: 'media/images/carousel/20240903_165612.jpg',
                    alt: 'Portrett av Kristoffer Gjøsund',
                }"
                :cls="['dev-avatar']"
            />
            <section class="dev-references">
                <h2> Attest sitater </h2>
                <section v-for="(data, i) in sortedReference" :key="i">
                    <article v-if="data.isVisible" class="dev-quote">
                        <p><q>{{ data.quote }}</q>
                        - </p>
                        <h3>
                            <cite>
                            <NavigationAnchor 
                                :data="data.anchor"
                            />
                        </cite>
                    </h3>
                    </article>
                </section>
            </section>
            <section class="dev-skill flex-column-justify-center-align-center">
                <h2> Min Kode Aktivitet</h2>

                <section class="flex-wrap-row-justify-space-evenly">
                    <UtilsProgress 
                        :value="totalCodeActivity"
                        label="Fullstack Utvikler"
                    />
                    <UtilsProgress v-for="(data, i) in codeActivity" :key="i" 
                        :value="data.value"
                        :label="data.name"
                        :tech="data.tech"
                    />
                </section>

            </section>
        </section>

        <section class="flex-column-justify-space-evenly">
            <article class="article-wrapper flex-column">
                <h2> Logger fra mine prosjekter </h2>
                <section class="blog-section flex-wrap-row-align-items-center-justify-space-between">
                    <NavigationButton v-if="currentPage > 1" :data="PageButtons[0]"/>
                    <section v-for="post in mappedPosts" :key="post.id" class="blog-content">
                        <ArticleHead :article="post" />
                    </section>
                    <NavigationButton v-if="currentPage < totalPages" :data="PageButtons[1]"/>
                </section>
            </article>
            <article v-for="(data, i) in dev" :key="i" class="bio">
                <h3 v-if="i === 1">{{ data.title }}</h3>
                <span>Sist oppdatert : <time :datetime="new Date(data.meta.date).toISOString()">{{ new Date(data.meta.date).toDateString() }}</time></span>
                <ContentRenderer :value="data" class="bio-content"/>
                <MDC :value="data.meta.strength" class="bio-content"></MDC>
                <MDC :value="data.meta.agile" class="bio-content"></MDC>
            </article>
        </section>
    </section>
</template>

<script setup lang="ts">

    //  --- Import & types logic
    import { ref, computed } from 'vue';                        // @ts-ignore
    import { startTimer } from '~/utils/utils';
    import { onMounted, onUnmounted, fetchCollection } from '#imports';
    import { blogPagination } from '@/composables/pagination';  // @ts-ignore

    import type { DevCollectionItem, DevPostsCollectionItem,ReferenceCollectionItem } from '@nuxt/content';


    //  --- Conent logic
    const devPath = 'devProfile';
    const devCache = 'devProfileCache';
    const dev = await fetchCollection<DevCollectionItem>(devPath, devCache);

    const referencePath = 'reference';
    const referenceCache = 'referenceCache';
    const reference = await fetchCollection<ReferenceCollectionItem>(referencePath, referenceCache);
    const sortedReference = reactive(mapReference(reference));

    const devPostPath = 'devPosts';
    const devPostCache = 'devPostCache';
    const rawPosts = await fetchCollection<DevPostsCollectionItem>(devPostPath, devPostCache)
    const mappedPosts =  computed(() => {currentPage.value; return blogPagination(rawPosts.value, currentPage.value)});
    
    //  --- Pagination Logic
    const currentPage = ref<number>(1);
    const totalPages = computed(() => { if (rawPosts.value) { const n = 3; return Math.ceil(rawPosts.value.length / n); } return 0; });
    const PageButtons = computed(() =>
    [
        { id: 0, label: 'Forrige', cls: ['button', 'pagination-btn'], action: () => currentPage.value -- },
        { id: 1, label: 'Neste', cls: ['button', 'pagination-btn'], action: () => currentPage.value ++ }
    ]);

    //  --- Progress Bar Logic
    const codeProsessionList =
    [
        { name:'C',  tech:"c", value: 42.91 },
        { name:'GO-Lang',  tech:"go", value: 5.00 },    
        { name:'SASS', tech:"sass", value: 42.91 },
        { name:'Python', tech:"python", value: 42.91 },
        { name:'C#', tech:"cs", value: 25.00 },
        { name:'SQL / Databaser', tech:"sqlite", value: 50.00 },
        { name:'TypeScript', tech:"typescript", value: 26.00 },
    ];

    const n = codeProsessionList.length;
    const codeActivity = computed(() => codeProsessionList.slice().sort((a, b) => b.value - a.value));
    const totalCodeActivity = computed(() => (codeProsessionList.reduce((acc, item) => acc + item.value, 0) + n) / n);
    

    let timerInterval: ReturnType<typeof setInterval> | null = null;

    // --- Lifecycle Logic
    onMounted(() => { timerInterval = startTimer(sortedReference); });
    onUnmounted(() => { if (timerInterval) { clearInterval(timerInterval); }});

    //  --- Debugging Logic ---
    //console.warn('Reference Data:', sortedReference.value);
    console.log(dev.value);
</script>
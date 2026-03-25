<template>
    <section class="flex-wrap-column repo-container">
        <h2>Tekniske Prosjekter</h2>
        
        <section v-if="!!paginationData && paginationData.length > 0" class="flex-wrap-column">
            <p>Filtrer prosjekter etter type:</p>
        
            <section class="flex-wrap-row-justify-center">
                <NavigationButton :data="btn[0]"/>
                <NavigationButton :data="btn[1]"/>
                <NavigationButton :data="btn[2]"/>
                <NavigationButton :data="btn[3]"/>
                <NavigationButton :data="btn[4]"/>
            </section>
            <section class="flex-wrap-row-justify-space-evenly" v-if="totalPages > num">
            <NavigationButton v-if="currentPage > num" :data="btn[5]"/>
                <span>Side {{ currentPage }} / {{ totalPages }}</span>
            <NavigationButton v-if="currentPage < totalPages" :data="btn[6]"/>
            </section>
            <section class="flex-wrap-row-align-items-center-justify-space-around ">

                <section class="flex-wrap-row project-wrapper">
                    <RepositoryBusinessCard v-for="repo in paginationData" :key="repo.repo_id" :data="repo" />
                </section>
            </section>
        </section>

        <section class="flex-wrap-column" v-if="!!repoError && !repoData">
        <p>Github prosjekter er for tiden under revisjon. Vennligst benytt <NavigationAnchor :data="error"/> for mer informasjon.</p>
        <p>for å se min generelle GitHub-aktivitet og historikk. Jeg jobber med å oppdatere og strukturere mine nyeste kodeeksempler.</p>
    </section>
    </section>
</template>

<script setup lang="ts">

    //  Importing dependencies & types
    import { storeToRefs } from 'pinia';
    import { ref, watch, computed } from 'vue';
    import { fetchRepositories} from '#imports';
    import { useLanguageStore } from '@/stores/languageBytesStore';

    const num: number = 1;

    //  --- API Fetching Logic
    const { data: repoData, error: repoError } = await fetchRepositories('github');

    //  --- Pagination Logic
    const totalPages = ref<number>(num);
    const currentPage = ref<number>(num);
    const type = ref<string | null>(null);

    const paginationData =  computed(() =>
    {
        if (!repoData.value) return
        const n = 9;
        let data = computed(() => repoData.value);
        if (type.value) data = computed(() =>  { return repoData.value?.filter(repo => repo.flags[type.value] === true); });
        
        const start = (currentPage.value - num) * n;
        const end = start + n;

        data.value.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

        totalPages.value = Math.ceil(data.value.length / n);
        return  data.value.slice(start, end) ?? null;
    });

        //  --- Store Logic
    const { increment } = useLanguageStore();

    for (let i = 0; i < repoData.value.length; i++) {
        const repo = repoData.value[i];
        if (!repo.languages) continue;
        for (let j = 0; j < repo.languages.length; j++) {
            const lang = repo.languages[j];
            if (!lang || !lang.label || !lang.bytes) continue;
            increment(lang.label, lang.bytes);
        }
    }
    watch(() => repoData.value, (newValue) => { repoData.value = newValue; });
    watch(() => totalPages.value, (newValue) => { totalPages.value = newValue; });
    watch(() => currentPage.value, (newValue) => { currentPage.value = newValue; });
    watch(() => type.value, (newValue) => { type.value = newValue; currentPage.value = num; });

    const btn = computed(() =>
        [
            { id: 0, label: 'Frontend', cls: ['button', 'filter-btn'], action: () => type.value = 'frontend' },
            { id: 1, label: 'Backend', cls: ['button', 'filter-btn'], action: () => type.value = 'backend' },
            { id: 2, label: 'Fullstack', cls: ['button', 'filter-btn'], action: () => type.value = 'fullstack' },
            { id: 3, label: 'Diverse', cls: ['button', 'filter-btn'], action: () => type.value = 'misc' },
            { id: 4, label: 'Samarbeidsprosjekt', cls: ['button', 'filter-btn'], action: () => type.value = 'collaborator' },
            { id: 5, label: 'Forrige', cls: ['button', 'pagination-btn'], action: () => changePage(currentPage.value - num) },
            { id: 6, label: 'Neste', cls: ['button', 'pagination-btn'], action: () => changePage(currentPage.value + num) },
        ]);

    const error = computed(() =>
    {
        if (repoError.value)
        {
            console.error("An Error occured during the extraction of Repo data:", repoError.value);   
            const error =  { type: ["external"], label: "Github Repositories", href: "https://github.com/krigjo25?tab=repositories", };
            return error;
        }
        return false;
    });



    function changePage(page: number) { const total = totalPages.value; if (page >= 1 && page <= total) currentPage.value = page; }
    // Debug logic
    //console.error(paginationData.value)
    //console.error(repoData.value)
    //console.log("Pagination data:", paginationData.value);
    // console.log('Pagination component initialized with data:', data);
</script>
<template>
    <section class="flex-wrap-column repo-container">
        <h2>Tekniske Prosjekter</h2>
        
        <section v-if="hasProjects" class="flex-wrap-column">
            <p>Filtrer prosjekter etter type:</p>
        
            <section class="flex-wrap-row-justify-center">
                <NavigationButton v-for="(btn, i) in buttons" :key="i" :data="btn" :class="btn?.cls"/>
            </section>

            <section class="flex-wrap-row-justify-space-evenly" v-if="totalPages > num">
                <NavigationButton v-if="currentPage > num" :data="prevPage" :class="['button', 'pagination-btn']"/>
                <span>Side {{ currentPage }} / {{ totalPages }}</span>
                <NavigationButton v-if="currentPage < totalPages" :data="nextPage" :class="['button', 'pagination-btn']"/>
            </section>

            <section class="flex-wrap-row-align-items-center-justify-space-around ">
                <section class="flex-wrap-row-justify-center project-wrapper">
                    <RepositoryBusinessCard v-for="repo in paginationData" :key="repo.repo_id" :data="repo" />
                </section>
            </section>

        </section>

        <section class="flex-wrap-column" v-if="!hasProjects">
        <p>Github prosjekter er for tiden under revisjon. Vennligst benytt <NavigationAnchor :data="errorLink"/> for mer informasjon.</p>
        <p>for å se min generelle GitHub-aktivitet og historikk. Jeg jobber med å oppdatere og strukturere mine nyeste kodeeksempler.</p>
    </section>
    </section>
</template>

<script setup lang="ts">

    //  Importing dependencies & types
    import { ref, watch, computed } from 'vue';
    import { fetchRepositories} from '#imports';
    import { useLanguageStore } from '@/stores/languageBytesStore';

    import type { GithubData } from '~/types/props';
    import type { ButtonItem } from '~/types/navigation';
    


    const num: number = 1;

    //  --- API Fetching Logic
    const { data, error } = await fetchRepositories('github');
    const errorLink = computed(() => {  if (error.value) console.log("Repo error:", error.value); return { label: "Github Repositories", href: "https://github.com/krigjo25?tab=repositories" }; });

    //  --- Pagination Logic
    const totalPages = ref<number>(num);
    const currentPage = ref<number>(num);
    const type: Ref<string> = ref<string>('0');

    const paginationData =  computed(() =>
    {
        if (!data.value) return
        const n: number = 9;

        let filteredData = computed<Array<GithubData>>(() => {return data.value});
        if (type.value != '0') filteredData = computed(() =>  { return data.value?.filter((item: any) => item.flags[type.value] === true); });

        const start = (currentPage.value - num) * n;
        const end = start + n;

        filteredData.value.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        totalPages.value = Math.ceil(filteredData.value.length / n);

        return  filteredData.value.slice(start, end) ?? null;
    });

    //  --- Flags & Computed Logic
    const hasProjects = computed(() => !!paginationData.value && paginationData.value.length > 0);

    //  --- Store Logic
    const { increment } = useLanguageStore();

    for (let i = 0; i < data.value.length; i++)
    {
        const repo = data.value[i];
        if (!repo.languages) continue;

        for (let j = 0; j < repo.languages.length; j++)
        {
            const lang = repo.languages[j];
            if (lang && lang.label & lang.bytes) increment(lang.label, lang.bytes);
        }
    }

    //  --- Watchers
    watch(() => data.value, (newValue) => { data.value = newValue; });
    watch(() => totalPages.value, (newValue) => { totalPages.value = newValue; });
    watch(() => currentPage.value, (newValue) => { currentPage.value = newValue; });
    watch(() => type.value, (newValue) => { type.value = newValue; currentPage.value = num; });

    //  --- Navigation Logic
    const nextPage = computed<ButtonItem>(() => ({label: 'Neste', action: () => changePage(currentPage.value + num) }));
    const prevPage = computed<ButtonItem>(() => ({ label: 'Forrige', action: () => changePage(currentPage.value - num) }));
    const buttons = computed<ButtonItem[]>(() => [ { label: 'Diverse', cls: ['button', 'filter-btn'], action: () => type.value = 'misc' }, { label: 'Backend', cls: ['button', 'filter-btn'], action: () => type.value = 'backend' }, { label: 'Frontend', cls: ['button', 'filter-btn'], action: () => type.value = 'frontend' }, { label: 'Fullstack', cls: ['button', 'filter-btn'], action: () => type.value = 'fullstack' }, { label: 'Samarbeidsprosjekt', cls: ['button', 'filter-btn'], action: () => type.value = 'collaborator' } ]);

    function changePage(page: number) { const total = totalPages.value; if (page >= 1 && page <= total) currentPage.value = page; }

    //  --- Debug logic
    //console.log("--- Portfolio component ---");
    //console.error(data.value)
    //console.error(paginationData.value)
    //console.log("Repository data:", data.value);
    //console.log("Repository error:", error.value);
    //console.log("Pagination data:", paginationData.value);
    // console.log('Pagination component initialized with data:', data);
</script>
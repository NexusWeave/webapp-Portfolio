<template>
    <section class="flex-wrap-column repo-container">
        <h2>Tekniske Prosjekter</h2>
        
        <section v-if="hasProjects" class="flex-wrap-column">
            <template v-if="hasMultipleCategories">
                <p>Filtrer prosjekter etter type:</p>
            
                <section class="flex-wrap-row-justify-center">
                    <template v-for="(btn, i) in buttons" :key="i">
                        <NavigationButton v-if="shouldShowButton(btn)" :data="btn" :class="btn?.cls"/>
                    </template>
                </section>
            </template>

            <section v-if="totalPages > 1" class="flex-wrap-row-justify-space-evenly">
                <NavigationButton v-if="currentPage > 1" :data="prevPage" :class="['button', 'pagination-btn']"/>
                <span>Side {{ currentPage }} / {{ totalPages }}</span>
                <NavigationButton v-if="currentPage < totalPages" :data="nextPage" :class="['button', 'pagination-btn']"/>
            </section>

            <section class="flex-wrap-row-align-items-center-justify-space-around ">
                <section class="flex-wrap-row-justify-center project-wrapper">
                    <RepositoryBusinessCard v-for="repo in paginationData" :key="repo.id" :data="repo" />
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
    import { fetchRepositories} from '#imports';
    import { ref, watch, computed, onMounted } from 'vue';
    import { useLanguageStore } from '@/stores/languageBytesStore';

    import type { RepositoryData, LanguageData, GithubData } from '~/types/props';
    import type { ButtonItem } from '~/types/navigation';


    const num: number = 1;

    //  --- API Fetching Logic
    const  { repo, refresh } = await fetchRepositories<RepositoryData>('github');
    const errorLink = computed(() => { return { label: "Github Repositories", href: "https://github.com/krigjo25?tab=repositories" }; });

    //  --- Pagination Logic
    const totalPages = ref<number>(num);
    const currentPage = ref<number>(num);
    const type: Ref<string> = ref<string>('0');

    const filteredRepo = computed(() => {
        if (!repo.value) return [];
        if (type.value === '0') return repo.value;
        return repo.value.filter((item: any) => item.flags[type.value] === true);
    });

    const paginationData = computed(() => {
        const n: number = 9;
        const start = (currentPage.value - num) * n;
        const end = start + n;
        return filteredRepo.value.slice(start, end) ?? [];
    });

    watch(filteredRepo, (newVal) => {
        const n: number = 9;
        totalPages.value = Math.ceil(newVal.length / n);
        if (currentPage.value > totalPages.value) {
            currentPage.value = Math.max(1, totalPages.value);
        }
    }, { immediate: true });

    //  --- Flags & Computed Logic
    const hasProjects = computed(() => !!repo.value && repo.value.length > 0);
    const hasMultipleCategories = computed(() => {
        if (!repo.value) return false;
        // Sjekk kategorier (ekskludert misc og reset)
        const categories = ['backend', 'frontend', 'fullstack', 'collaborator'];
        const activeCategories = categories.filter(cat => 
            repo.value?.some((item: any) => {
                if (cat === 'collaborator') {
                    return item.flags.collaborator === true || (item.collaborators && item.collaborators.length > 1);
                }
                return item.flags[cat] === true;
            })
        );
        return activeCategories.length > 1;
    });

    //  --- Watchers
    watch(() => currentPage.value, (newValue) => { currentPage.value = newValue; });

    //  --- Navigation Logic
    const nextPage = computed<ButtonItem>(() => ({label: 'Neste', action: () => changePage(currentPage.value + num) }));
    const prevPage = computed<ButtonItem>(() => ({ label: 'Forrige', action: () => changePage(currentPage.value - num) }));
    
    function shouldShowButton(btn: ButtonItem) {
        if (!repo.value || !btn.cls) return false;
        if (btn.label === 'reset' || btn.label === 'Diverse') return true;
        
        // Finn hvilken flag-nøkkel knappen representerer basert på class
        const filterType = btn.cls.find(c => ['backend', 'frontend', 'fullstack', 'collaborator', 'misc'].includes(c));
        if (!filterType) return true;

        // Spesialhåndtering for samarbeidsprosjekter (sjekker både flag og faktisk innhold)
        if (filterType === 'collaborator') {
            return repo.value.some((item: any) => 
                item.flags.collaborator === true || (item.collaborators && item.collaborators.length > 1)
            );
        }

        return repo.value.some((item: any) => item.flags[filterType] === true);
    }

    const buttons = computed<ButtonItem[]>(() => [ 
        { label: 'Diverse', cls: ['button', 'filter-btn', 'misc'], action: () => type.value = 'misc' }, 
        { label: 'Backend', cls: ['button', 'filter-btn', 'backend'], action: () => type.value = 'backend' }, 
        { label: 'Frontend', cls: ['button', 'filter-btn', 'frontend'], action: () => type.value = 'frontend' }, 
        { label: 'Fullstack', cls: ['button', 'filter-btn', 'fullstack'], action: () => type.value = 'fullstack' }, 
        { label: 'Samarbeidsprosjekt', cls: ['button', 'filter-btn', 'collaborator'], action: () => type.value = 'collaborator' }, 
        { label: 'reset', cls: ['button', 'filter-btn', 'reset-btn'], action: () => type.value = '0' } 
    ]);

    function changePage(page: number) { const total = totalPages.value; if (page >= 1 && page <= total) currentPage.value = page; }


    //  --- Lifecycle Hooks

    const { updateFromRepositories, resetBytes } = useLanguageStore();

    watch(() => repo.value, (newVal) => 
    {
    if (newVal && newVal.length > 0) {
        updateFromRepositories(newVal);
    }
}, { immediate: true, deep: true });
    onMounted(() => {
        resetBytes();
        if (repo.value) updateFromRepositories(repo.value);
                
        refresh() });

    //  --- Debug logic
    //console.log("--- Portfolio component ---");
    //console.error(data.value)
    //console.error(paginationData.value)
    //console.log("Repository data:", data.value);
    //console.log("Repository error:", error.value);
    //console.log("Pagination data:", paginationData.value);
    // console.log('Pagination component initialized with data:', data);
</script>
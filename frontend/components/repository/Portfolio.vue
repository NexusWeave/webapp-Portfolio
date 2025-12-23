<template>
    <section class="flex-wrap-column repo-container">
        <h2>Technical Repositories</h2>
        <section class="repo-container flex-wrap-row-justify-center">
                <UtilsPagination v-if="totalPages > 1"
                    :activePage="currentPage" 
                    :totalPage="totalPages" 
                    @update="currentPage = $event"
                />
            <section class="flex-wrap-row-justify-space-evenly"  v-if="!!paginationData && paginationData.length > 0">
                <RepositoryBusinessCard v-for="repo in paginationData" :key="repo.repo_id" :data="repo" />
            </section>
            <section class="flex-wrap-column" v-if="!!repoError && !repoData">
                <p>Github repository er for tiden under revisjon. Vennligst benytt <NavigationAnchor :data="error"/> for mer informasjon.</p>
                <p>for å se min generelle GitHub-aktivitet og historikk. Jeg jobber med å oppdatere og strukturere mine nyeste kodeeksempler.</p>
            </section>
        </section>
    </section>
</template>

<script setup lang="ts">

    //  Importing dependencies & types
    import { computed } from 'vue';
    import { fetchRepositories } from '#imports';


    //  --- API Fetching Logic
    const { data: repoData, error: repoError } = await fetchRepositories('github');

    const error = computed(() =>
    {

        if (repoError.value)
        {
            
            const error = 
                {
                    type: ["external"],
                    label: "Github Repositories",
                    href: "https://github.com/krigjo25?tab=repositories",
                };

            console.error("An Error occured during the extraction of Repo data:", repoError.value);    
            return error;
        }
    return false;
    });


    //  --- Filtering Logic
    const n = 9;
    const currentPage = ref<number>(1);
    const totalPages = computed(() => {
        const data = repoData.value
        if (data)
        {
            return Math.ceil(data.length / n);
        }
        return 0;
    });

    const paginationData =  computed(() =>
    {
        const data = computed(() => repoData.value);

        const start = (currentPage.value - 1) * n;
        const end = start + n;


        return !!data.value ? data.value.slice(start, end) : null;
    });
    //console.error(paginationData.value)
    //console.error(repoData.value)
    
</script>
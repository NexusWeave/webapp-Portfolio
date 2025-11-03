<template>
    <section class="flex-wrap-column repo-container">
        <h2>Technical Repositories</h2>

        <section class="repo-container flex-wrap-row-justify-center">
                <UtilsPagination v-if="repoData.page > 1"
                    :activePage="currentPage" 
                    :totalPage="repoData.page" 
                    @update="currentPage = $event"
                />
            <section class="flex-wrap-row"  v-if="!!repoData.data && data && data.length > 0">
                <RepositoryBusinessCard v-for="repo in data"
                    :key="repo.id"
                    :data="repo"
                />
            </section>
            <section class="flex-wrap-column" v-if="!!repoError && !!error">
                <p>Github repository er for tiden under revisjon. Vennligst benytt <NavigationAnchor :data="error"/> for mer informasjon.</p>
                <p>for å se min generelle GitHub-aktivitet og historikk. Jeg jobber med å oppdatere og strukturere mine nyeste kodeeksempler.</p>
            </section>
        </section>
    </section>
</template>

<script setup lang="ts">

    //  Importing dependencies & types
    import { computed } from 'vue';
    import { fetchRestApi as fetchRestApi } from '#imports';


    //  --- API Fetching Logic
    const { data: repoData, error: repoError } = await fetchRestApi('github', 'repo-data')

    const error: Array<Record<string, string>> | boolean = computed(() =>
    {

    if (repoError.value)
    {
        
        const error = 
            {
            href: "https://github.com/krigjo25?tab=repositories",
            type: ["external"],
            label: "Github Repositories",
        };

        
        return error;
    }
    console.error("Error fetching repository data:", repoError.value);
    return false;
    });


    //  --- Filtering Logic
    const n = 6;
    const currentPage = ref<number>(1);

    const data =  computed(() =>
    {
        const data = repoData.value.data;
        const start = (currentPage.value - 1) * n;
        const end = start + n;

        return !!data ? data.slice(start, end) : null;
    });
</script>
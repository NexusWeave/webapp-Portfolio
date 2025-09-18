// Plugins -> Pinia stores
import { portfolioStore } from '~/stores/portfolioStore'
//import { academicStore } from '~/stores/academicStore.js'
//import { achievementsStore } from '~/stores/achievementsStore.js'
//import { repositoryStore } from '~/stores/repoStore.js'
//import { academicStore } from '#imports'


export default defineNuxtPlugin(async (nuxtApp) =>
    {
        
        const portfolio = portfolioStore();
        await portfolio.fetchData();

        //const useRepoStore = repositoryStore();
        //await useRepoStore.fetchData();

        //const useAcademicStore = academicStore();
        //await useAcademicStore.fetchData();

        

        //const useAchievementsStore = achievementStore();
        //await useAchievementsStore.fetchData();
})
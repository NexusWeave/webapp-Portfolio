//  Portfolio Store
import { reactive, ref } from 'vue';
import { defineStore } from 'pinia';
import { FetchApiResponse } from '../utils/apiHandler.js';

export const portfolioStore = defineStore('portfolio', 
    {
        state: () => (
            {
                data:
                {
                    current: 1,
                    total : null,
                    isLoaded: false,
                    repositories: [],
                    
                },
            }),
            actions: {
                addToStore(repo)
                {
                    repo.name = this.splitName(repo.name.toLowerCase());

                    const repositories = this.data.repositories;
                    repositories.push(repo);
                    //console.warn("Added repository:", repo);
                },
                splitName(name)
                {
                    return name.split('-');
                },
                async fetchData(data)
                {
                    //console.warn("Fetching portfolio data from:", data);
                    try
                    {
                        FetchApiResponse(data).then(response =>
                        {
                            this.data.total = response.total;
                            response.data.forEach(repo => this.addToStore(repo));
                            
                            //console.warn("portfolioStore.js Api response :", response);
                        });
                        
                    }
                    catch (error)
                    {
                        this.data.isLoaded = false;
                        console.error('Error fetching data:', error);
                        return;
                    }
                    this.data.isLoaded = true;
                }
            },
            getters: {
                isLoaded: (state) => state.data.isLoaded,
                repositories: (state) => state.data.repositories,
                displayData: (state) => (filter = null) =>
                    {
                        const n = 9;
                        const repositories = state.data.repositories;
                        
                        if (!state.data.isLoaded) return false;
                        if (filter) return repositories.filter(item => item.name.includes(filter.name.toLowerCase()));

                        const start = ref(1);
                        const end = ref((start.value * n));


                        console.warn("Displaying data from:", start.value, "to:", end.value, "of total:", n);
                        const date = reactive(repositories.slice(start.value, end.value));

                        return date;

                    }
            }
    })
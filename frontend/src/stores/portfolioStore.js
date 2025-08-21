//  Portfolio Store
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
                addToStore(repository)
                {

                    const repo = this.splitName(repository);
                    const repositories = this.data.repositories;
                    repositories.push(repo);
                    //console.warn("Added repository:", repo);
                },
                splitName(repository)
                {
                    return repository.name.split('-');
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
                        this.data.isLoaded = true;
                    }
                    catch (error)
                    {
                        console.error('Error fetching data:', error);
                    }
                }
            },
            getters: {
                isLoaded: (state) => state.data.isLoaded,
                repositories: (state) => state.data.repositories,
                displayRepositories: (state) => (filter, start, end, n = 9) =>
                    {
                        n = state.data.repositories.length;
                        const repositories = state.data.repositories;

                        if (!state.data.isLoaded) return false;
                        if (filter.name) return repositories.filter(item => item.name.includes(filter.name.toLowerCase()));

                        end = (start * n);
                        start = (start-1) * n;

                        const data = repositories.slice(start, end);
                        return data;

                    }
            }
    })
import { createRouter, createWebHistory } from 'vue-router'

import { academicStore } from '@/stores/academicStore.js';
import { portfolioStore } from '@/stores/portfolioStore.js';
import { achievementStore } from '@/stores/achievementsStore.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/HomeView.vue'),

      beforeEnter: async (to, from, next) => {

        const academic = academicStore();
        await academic.fetchData();

        const achievement = achievementStore();
        await achievement.fetchData();

        const portfolio = portfolioStore();
        await portfolio.fetchData("http://127.0.0.1:5000/api/github");

        !!academic.timelines && !!achievement.isLoaded && !!portfolio.isLoaded ? next() : next();

      }
    },
    {
      name: 'About',
      path: '/about',
      //component: () => import('../views/AboutView.vue')
    },
    {
      path: '/dev',
      name: 'DevProfile',
      //component: () => import('../views/AboutView.vue')
    },
    
  ]
})

export default router

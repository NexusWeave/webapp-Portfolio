import { createRouter, createWebHistory } from 'vue-router'

import { timelineStore } from '@/stores/academicStore.js';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/HomeView.vue'),

      beforeEnter: async (to, from, next) => {

        const timeline = timelineStore();
        await timeline.fetchData();
        !!timeline.timeline ? next() : next();

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

import { createRouter, createWebHistory } from 'vue-router'
import home from '../views/home.vue'
import details from '../views/details.vue'
import search from '../views/search.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: home
    },
    {
      path: '/details/:id',
      name: 'Details',
      component: details
    },
    {
      path: '/search',
      name: 'Search',
      component: search
    }
  ]
})

export default router

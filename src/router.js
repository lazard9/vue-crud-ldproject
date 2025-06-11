import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { path: '/', component: () => import('./views/Home.vue') },
    { path: '/destinations', component: () => import('./views/Destinations.vue') },
    { path: '/destinations/:slug', component: () => import('./views/DestinationSingle.vue') },
    { path: '/destinations/add', component: () => import('./views/DestinationAdd.vue') },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router

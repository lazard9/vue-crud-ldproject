import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { path: '/', component: () => import('./views/Home.vue') },
    { path: '/destinations', component: () => import('./views/Destinations.vue') },
    { path: '/destinations/:slug', component: () => import('./views/DestinationSingle.vue') },
    { path: '/destinations/add', component: () => import('./views/DestinationAdd.vue') },
    { path: '/destinations/edit/:slug', component: () => import('./views/DestinationEdit.vue') },
    { path: '/:pathMatch(.*)*', component: () => import('./views/NotFound.vue') }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export default router

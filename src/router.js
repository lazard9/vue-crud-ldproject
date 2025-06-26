import { createRouter, createWebHistory } from 'vue-router'
import { isLoggedIn } from '@/utils/auth'

const routes = [
    { path: '/', component: () => import('./views/Home.vue') },
    { path: '/destinations', component: () => import('./views/Destinations.vue') },
    { path: '/destinations/:slug', component: () => import('./views/DestinationSingle.vue') },
    {
        path: '/destinations/add',
        component: () => import('./views/DestinationAdd.vue'),
        meta: { requiresAuth: true } // guard
    },
    {
        path: '/destinations/edit/:slug',
        component: () => import('./views/DestinationEdit.vue'),
        meta: { requiresAuth: true } // guard
    },
    { path: '/:pathMatch(.*)*', component: () => import('./views/NotFound.vue') }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

// global guard
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !isLoggedIn()) {
        alert('You are not logged in!')
        next('/')
    } else {
        next()
    }
})

export default router

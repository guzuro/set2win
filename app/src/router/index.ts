import AppLayout from '@/layout/AppLayout.vue'
import AuthPage from '@/views/auth-page.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/auth',
                    name: 'AuthPage',
                    component: AuthPage,
                },
            ],
        },
    ],
})

export default router

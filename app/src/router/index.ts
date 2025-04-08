import AppLayout from '@/layout/AppLayout.vue'
import TestPage from '@/views/test-page.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/',
                    name: "TestView",
                    component: TestPage,
                }
            ],
        },
    ],
})

export default router

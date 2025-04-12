import AppLayout from '@/layout/AppLayout.vue'
import AuthPage from '@/views/Auth/auth-page.vue'
import AuthSignIn from '@/views/Auth/auth-sign-in.vue'
import AuthSignUp from '@/views/Auth/auth-sign-up.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '',
            component: AppLayout,
            children: [
                {
                    path: '/auth',
                    component: AuthPage,
                    children: [
                        {
                            path: 'sign-in',
                            name: 'SignIn',
                            component: AuthSignIn,
                        },
                        {
                            path: 'sign-up',
                            name: 'SignUp',
                            component: AuthSignUp,
                        },
                    ],
                },
            ],
        },
    ],
})

export default router

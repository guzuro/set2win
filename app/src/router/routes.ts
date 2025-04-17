import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '',
        component: () => import('../layout/AppLayout.vue'),
        children: [
            {
                path: '/auth',
                component: () => import('../views/Auth/auth-page.vue'),
                meta: {
                    public: true
                },
                children: [
                    {
                        path: 'sign-in',
                        name: 'SignIn',
                        component: () => import('../views/Auth/auth-sign-in.vue'),
                    },
                    {
                        path: 'sign-up',
                        name: 'SignUp',
                        component: () => import('../views/Auth/auth-sign-up.vue'),
                    },
                ],
            },
            {
                name: 'Dashboard',
                path: '',
                component: () => import('../views/dashboard.vue'),
            }
        ],
    },
]

export default routes
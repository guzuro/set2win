import type { RouteRecordRaw } from 'vue-router'

export const authRoutes: Array<RouteRecordRaw> = [
    {
        path: '/auth',
        component: () => import('../pages/auth-page.vue'),
        meta: {
            public: true,
        },
        children: [
            {
                path: 'sign-in',
                name: 'SignIn',
                component: () => import('../pages/auth-sign-in.vue'),
            },
            {
                path: 'sign-up',
                name: 'SignUp',
                component: () => import('../pages/auth-sign-up.vue'),
            },
        ],
    },
]

import { authRoutes } from '@/modules/auth/routes'
import { playersRoutes } from '@/modules/players/routes'
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '',
        component: () => import('../layout/AppLayout.vue'),
        children: [
            ...authRoutes,
            ...playersRoutes,
            {
                name: 'Dashboard',
                path: '',
                component: () => import('../shared/pages/dashboard.vue'),
            },
        ],
    },
]

export default routes

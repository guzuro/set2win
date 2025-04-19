import type { RouteRecordRaw } from 'vue-router'

export const playersRoutes: Array<RouteRecordRaw> = [
    {
        path: '/players',
        children: [
            {
                path: '',
                name: 'PlayersList',
                component: () => import('../pages/players-list.vue'),
            },
        ],
    },
]

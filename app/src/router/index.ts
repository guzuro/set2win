import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { useUserStore } from '@/modules/user/store/userStore'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore()

    const isAuth = userStore.isAuthenticated

    if (!isAuth) {
        if (to.meta?.public) {
            next()
        } else {
            try {
                await userStore.getUser()

                return next()
            } catch (error) {
                return next({ name: 'SignIn' })
            }
        }
    }

    next()
})

export default router

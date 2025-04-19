import { useUserStore } from '@/modules/user/store/userStore'
import type { SignInData, SignUpData } from '@/modules/auth/types/auth.types'
import { useApi } from '../../../shared/composables/useApi'
import { AuthApi } from '../api/auth.api'
import { useRouter } from 'vue-router'

export default function useAuth() {
    const userStore = useUserStore()
    const { data, error, isLoading, resolve } = useApi()
    const { push } = useRouter()

    async function signIn(payload: SignInData) {
        try {
            await resolve(() => AuthApi.signIn(payload))

            if (data.value) {
                userStore.$patch({
                    user: data.value,
                })

                push({ name: 'Dashboard' })
            }
        } catch (error) {
            console.error(error)
        }
    }

    async function signUp(payload: SignUpData) {
        try {
            await resolve(() => AuthApi.signUp(payload))

            if (data.value) {
                push({ name: 'SignIn' })
            }
        } catch (error) {
            console.error(error)
        }
    }

    return {
        signIn,
        signUp,
        isLoading,
    }
}

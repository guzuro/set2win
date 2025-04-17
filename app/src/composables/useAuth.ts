import { useUserStore } from '@/stores/userStore'
import type { SignInData, SignUpData } from '@/types/auth.types'
import { useApi } from './useApi'
import { AuthApi } from '@/api/auth.api'
import { useRouter } from 'vue-router'

export default function useAuth() {
    const userStore = useUserStore()
    const { data, error, isLoading, resolve } = useApi()
    const {push} = useRouter()

    async function signIn(payload: SignInData) {
        try {
            await resolve(() => AuthApi.signIn(payload))

            userStore.$patch({
                user: data.value,
            })

            push({name: 'Dashboard'})
            
        } catch (error) {
            console.error(error)
        }
    }

    async function signUp(payload: SignUpData) {
        try {
            resolve(() => AuthApi.signUp(payload))
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

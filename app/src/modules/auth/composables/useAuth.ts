import { useUserStore } from '@/modules/user/store/userStore'
import type { SignInData, SignUpData } from '@/modules/auth/types/auth.types'
import { useApi } from '../../../shared/composables/useApi'
import { AuthApi } from '../api/auth.api'
import { useRouter } from 'vue-router'
import type { Rule } from 'ant-design-vue/es/form'
import { reactive } from 'vue'

export default function useAuth() {
    const userStore = useUserStore()
    const { data, isLoading, resolve } = useApi()
    const { push } = useRouter()

    const getSignUpModel = (): SignUpData => {
        return reactive({
            ...getSignInModel(),
            passwordConfirm: '',
        })
    }

    const getSignInModel = (): SignInData => {
        return reactive({
            login: '',
            password: '',
        })
    }

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

    const rules: Partial<Record<keyof SignUpData | keyof SignUpData, Array<Rule>>> = {
        login: [{ required: true, message: 'Login is required!', trigger: 'blur' }],
        password: [
            { required: true, message: 'Password is required!', trigger: 'blur' },
            { min: 5, message: 'Password must be minimum 5 symbols!', trigger: 'blur' },
        ],
    }

    return {
        signIn,
        signUp,
        isLoading,
        rules,
        getSignUpModel,
        getSignInModel,
    }
}

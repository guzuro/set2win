import type { SignInData, SignUpData } from '@/modules/auth/types/auth.types'
import { api } from '@/shared/api/axios'
import type { AxiosRequestConfig } from 'axios'

export const AuthApi = {
    signIn: (params: SignInData, config?: AxiosRequestConfig) => {
        return api.post('auth/signin', params, config)
    },
    signUp: (params: SignUpData, config?: AxiosRequestConfig) => {
        return api.post('auth/signup', params, config)
    },
}

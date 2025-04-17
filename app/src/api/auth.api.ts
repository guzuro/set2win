import type { SignInData, SignUpData } from '@/types/auth.types'
import { api } from './axios'
import type { AxiosRequestConfig } from 'axios'

export const AuthApi = {
    signIn: (params: SignInData, config?: AxiosRequestConfig) => {
        return api.post('auth/signup', params, config)
    },
    signUp: (params: SignUpData, config?: AxiosRequestConfig) => {
        return api.post('auth/signin', params, config)
    },
}

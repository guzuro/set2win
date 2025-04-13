import type { SignInData, SignUpData } from '@/types/auth.types'
import { api } from './axios'

export function signUpReq(params: SignUpData) {
    return api.post('auth/signup', params)
}

export function signInReq(params: SignInData) {
    return api.post('auth/signin', params)
}

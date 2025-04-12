import type { SignUpData } from '@/types/auth.types'
import axios from 'axios'

export function signUpReq(params: SignUpData) {
    axios.post('http://localhost:3000/api/auth/signup', params)
}

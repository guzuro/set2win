import { api } from './axios'
import type { AxiosRequestConfig } from 'axios'

export const UserApi = {
    getUser:(config?: AxiosRequestConfig) => {
        return api.get('user', config)
    },
}

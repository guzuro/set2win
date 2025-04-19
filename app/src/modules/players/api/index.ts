import { api } from '@/shared/api/axios'
import type { AxiosRequestConfig } from 'axios'

export const PlayersApi = {
    getUserPlayers: (config?: AxiosRequestConfig) => {
        return api.get('/players', config)
    },
}

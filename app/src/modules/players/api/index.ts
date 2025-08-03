import { api } from '@/shared/api/axios'
import type { AxiosRequestConfig } from 'axios'
import type { CreatePlayerDto } from '../types'

export const PlayersApi = {
    getUserPlayers: (config?: AxiosRequestConfig) => {
        return api.get('/players', config)
    },
    createPlayer: (body: CreatePlayerDto, config?: AxiosRequestConfig) => {
        return api.post('/players', body, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            ...config,
        })
    },
    getPlayersRankings: (config?: AxiosRequestConfig) => {
        return api.get('/players/rankings', config)
    },
}

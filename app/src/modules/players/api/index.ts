import { api } from '@/shared/api/axios'
import type { AxiosRequestConfig } from 'axios'
import type { CreatePlayerDto } from '../types'

type PaginationData = { limit: number; page: number }

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
    getPlayersRankings: (body: PaginationData, config?: AxiosRequestConfig) => {
        return api.post('/players/getrankings', body, config)
    },
}

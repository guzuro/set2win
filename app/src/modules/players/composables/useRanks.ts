import { useApi } from '@/shared/composables/useApi'
import { PlayersApi } from '../api'
import type { RawPlayer } from '../types'

export function useRanks() {
    const { data, isLoading, error, resolve } = useApi<{ players: RawPlayer[]; total: number }>()

    const PAGINATION_LIMIT = 10

    async function getRankings(page: number) {
        await resolve(() => PlayersApi.getPlayersRankings({ limit: PAGINATION_LIMIT, page }))

        if (error.value) {
            data.value = {
                players: [],
                total: 0,
            }
        }
    }

    return {
        getRankings,
        data,
        isLoading,
    }
}

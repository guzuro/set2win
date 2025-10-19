import { useApi } from '@/shared/composables/useApi'
import { PlayersApi } from '../api'
import { reactive } from 'vue'
import type { CreatePlayerDto, RawPlayer } from '../types'
import { getCreatePlayerModel } from '../includes/logic'

export function useRanks() {
    const { data, isLoading, error, resolve } = useApi<{ players: RawPlayer[] }>()

    const getRawPlayerModel = () => {
        return reactive<CreatePlayerDto>(getCreatePlayerModel())
    }
    async function getRankings() {
        await resolve(() => PlayersApi.getPlayersRankings())

        if (error.value) {
            data.value = {
                players: [],
            }
        }
    }

    return {
        getRawPlayerModel,
        getRankings,
        data,
        isLoading,
    }
}

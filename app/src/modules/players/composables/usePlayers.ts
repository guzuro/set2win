import { useApi } from '@/shared/composables/useApi'
import { PlayersApi } from '../api'

type Player = {
    field: string
}

export function usePlayers() {
    let { data: list, isLoading: listLoading, error, resolve } = useApi<Player[]>()

    async function getUserPlayers() {
        await resolve(() => PlayersApi.getUserPlayers())

        if (error) {
            list.value = []
        }
    }

    return {
        getUserPlayers,
        list,
        listLoading,
    }
}

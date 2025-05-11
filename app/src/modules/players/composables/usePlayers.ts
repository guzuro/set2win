import { useApi } from '@/shared/composables/useApi'
import { PlayersApi } from '../api'
import { reactive } from 'vue'
import type { CreatePlayerDto } from '../types'

type Player = {
    field: string
}

export function usePlayers() {
    let { data: list, isLoading: listLoading, error, resolve } = useApi<Player[]>()

    const getRawPlayerModel = () => {
        return reactive<CreatePlayerDto>({
            fullName: '',
            country: '',
            birthDate: '',
            hand: 'right',
            favoriteSurface: 'clay',
            avatar: null,
        })
    }

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
        getRawPlayerModel,
    }
}

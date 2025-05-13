import { useApi } from '@/shared/composables/useApi'
import { PlayersApi } from '../api'
import { reactive } from 'vue'

type Player = {
    field: string
}

export function usePlayers() {
    const { data: list, isLoading: listLoading, error, resolve } = useApi<Player[]>()

    const getRawPlayerModel = () => {
        return reactive({
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

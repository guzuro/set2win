import { useApi } from '@/shared/composables/useApi'
import { PlayersApi } from '../api'
import { reactive } from 'vue'
import type { CreatePlayerDto } from '../types'

type Player = {
    field: string
}

export function usePlayers() {
    const {
        data: list,
        isLoading: listLoading,
        error: listError,
        resolve: resolveList,
    } = useApi<{ players: Player[] }>()

    const {
        data: createData,
        isLoading: playerCreating,
        error: createError,
        resolve: resolveCreate,
    } = useApi<{ players: Player[] }>()

    const getRawPlayerModel = () => {
        return reactive<CreatePlayerDto>({
            fullName: '',
            country: '',
            birthDate: '',
            hand: 'right',
            favoriteSurface: 'clay',
            avatarUrl: null,
        })
    }

    async function getUserPlayers() {
        await resolveList(() => PlayersApi.getUserPlayers())

        if (listError.value) {
            list.value = {
                players: [],
            }
        }

        console.log(list.value)
    }

    async function createPlayer(player: CreatePlayerDto) {
        await resolveCreate(() => PlayersApi.createPlayer(player))

        if (createData.value && list.value) {
            list.value.players = createData.value.players
        }
    }

    return {
        getUserPlayers,
        list,
        listLoading,
        getRawPlayerModel,
        createPlayer,
        playerCreating,
    }
}

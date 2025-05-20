import { useApi } from '@/shared/composables/useApi'
import { PlayersApi } from '../api'
import { reactive } from 'vue'
import type { CreatePlayerDto, RawPlayer } from '../types'
import { message } from 'ant-design-vue'

export function usePlayers() {
    const {
        data: list,
        isLoading: listLoading,
        error: listError,
        resolve: resolveList,
    } = useApi<{ players: RawPlayer[] }>()

    const {
        data: createData,
        isLoading: playerCreating,
        error: createError,
        resolve: resolveCreate,
    } = useApi<{ players: RawPlayer[] }>()

    const getRawPlayerModel = () => {
        return reactive<CreatePlayerDto>({
            fullName: '',
            sex: 'men',
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
    }

    async function createPlayer(player: CreatePlayerDto) {
        const key = 'create'

        message.loading({ content: 'Creating...', key })

        await resolveCreate(() => PlayersApi.createPlayer(player))

        if (createData.value && list.value) {
            message.success({ content: 'Success!', key })

            console.log(createData.value)

            list.value.players = createData.value.players
        }
    }

    return {
        getUserPlayers,
        list,
        listLoading,
        getRawPlayerModel,
        createPlayer,
        createError,
        playerCreating,
    }
}

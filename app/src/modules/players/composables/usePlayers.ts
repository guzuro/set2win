import { useApi } from '@/shared/composables/useApi'
import { PlayersApi } from '../api'
import { reactive } from 'vue'
import type { CreatePlayerDto, RawPlayer } from '../types'
import { message } from 'ant-design-vue'
import type { Rule } from 'ant-design-vue/es/form'

export function usePlayers() {
    const createFormValidationRules: Record<string, Array<Rule>> = {
        fullName: [
            { required: true, message: 'Please input full name', trigger: 'change' },
            { min: 5, message: 'Length should be at least 5', trigger: 'blur' },
        ],
        birthDate: [{ required: true, message: 'Please pick a date', trigger: 'change' }],
        country: [{ required: true, message: 'Please pick a country', trigger: 'change' }],
    }

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
            sex: 'male',
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
        createFormValidationRules
    }
}

import type { CreatePlayerDto } from '../../types'

export const getCreatePlayerModel = (): CreatePlayerDto => {
    return {
        fullName: '',
        sex: 'male',
        country: '',
        birthDate: '',
        hand: 'right',
        favoriteSurface: 'clay',
        avatarUrl: null,
    }
}

export const getPlayerAvatarUrl = (path: string) => {
    return `http://localhost:3000/${path}`
}

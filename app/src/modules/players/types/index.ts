import type { SurfaceType } from '@/shared/includes/surface/types'

export type PlayerHand = 'left' | 'right'
export type PlayerSex = 'male' | 'female'

export type CreatePlayerDto = Pick<
    RawPlayer,
    'avatarUrl' | 'fullName' | 'sex' | 'country' | 'birthDate' | 'hand' | 'favoriteSurface'
>

export type RawPlayer = {
    hand: PlayerHand
    id: string
    userId: string
    sex: PlayerSex
    fullName: string
    country: string
    birthDate: string
    rating: number
    favoriteSurface: SurfaceType
    avatarUrl: string | null
    createdAt: Date
    updatedAt: Date
}

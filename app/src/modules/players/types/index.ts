import type { SurfaceType } from '@/shared/surface/types'

export type PlayerHand = 'left' | 'right'

export type CreatePlayerDto = {
    avatarUrl: string | null
    fullName: string
    country: string
    birthDate: string
    hand: PlayerHand
    favoriteSurface: SurfaceType
}

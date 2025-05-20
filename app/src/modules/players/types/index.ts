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

export type RawPlayer = {
    hand: PlayerHand
    id: string
    userId: string
    fullName: string
    country: string
    birthDate: string
    rating: number
    favoriteSurface: SurfaceType
    avatarUrl: string | null
    createdAt: Date
    updatedAt: Date
}
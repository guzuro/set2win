import type { CourtSurface } from '@/shared/courtSurface/types'
import type { UploadFile } from 'ant-design-vue'

export type PlayerHand = 'left' | 'right' | 'hard'

export type CreatePlayerDto = {
    fullName: string
    country: string
    birthDate: string
    hand: PlayerHand
    favoriteSurface: CourtSurface
    avatar?: UploadFile | null
}

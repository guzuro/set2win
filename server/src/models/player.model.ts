import { t } from 'elysia'

export const newPlayerSchema = t.Object({
    fullName: t.String(),
    country: t.String(),
    birthDate: t.String(),
    sex: t.Enum({
        men: 'men',
        women: 'women',
    }),
    hand: t.Enum({
        right: 'right',
        left: 'left',
    }),
    favoriteSurface: t.Enum({
        clay: 'clay',
        grass: 'grass',
        hard: 'hard',
    }),
    avatarUrl: t.Optional(t.String()),
})

export type PlayerCreateReq = typeof newPlayerSchema.static

export type PlayerCreateDto = PlayerCreateReq & {
    userId: string
}

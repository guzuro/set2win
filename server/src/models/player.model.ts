import { t } from 'elysia'

export const newPlayerSchema = t.Object({
    userId: t.String(),
    fullName: t.String(),
    country: t.String(),
    birthDate: t.String(),
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

export type RawPlayerDto = typeof newPlayerSchema.static

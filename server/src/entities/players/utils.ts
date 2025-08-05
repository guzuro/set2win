import { playersTable } from '.'

export const calculateAge = (birthDate: string) => {
    const diff_ms = Date.now() - new Date(birthDate).getTime()
    const age_dt = new Date(diff_ms)

    return Math.abs(age_dt.getUTCFullYear() - 1970)
}

export const playerWithAge = (player: typeof playersTable.$inferSelect) => {
    return {
        ...player,
        age: calculateAge(player.birthDate),
    }
}

import { eq } from 'drizzle-orm'
import { db } from '../../db'
import { PlayerCreateDto } from './player.model'
import { playersTable } from './playersTable'

class PlayersRepository {
    async getUserPlayers(userId: string) {
        return await db.select().from(playersTable).where(eq(playersTable.userId, userId))
    }

    async addPlayer(payload: PlayerCreateDto) {
        return await db.insert(playersTable).values(payload)
    }

    async removePlayer(id: string) {
        return await db.delete(playersTable).where(eq(playersTable.userId, id))
    }
}

export const playersRepository = new PlayersRepository()

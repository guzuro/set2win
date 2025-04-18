import { eq } from 'drizzle-orm'
import { db } from '../db'
import { playersTable } from '../db/schemas'
import { RawPlayerDto } from '../models/player.model'

class PlayersRepository {
    async getUserPlayers(userId: string) {
        return await db.select().from(playersTable).where(eq(playersTable.userId, userId))
    }

    async addPlayer(payload: RawPlayerDto) {
        return await db.insert(playersTable).values(payload)
    }

    async removePlayer(id: string) {
        return await db.delete(playersTable).where(eq(playersTable.userId, id))
    }
}

export const playersRepository = new PlayersRepository()

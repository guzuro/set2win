import PgException from '../exceptions/PgException'
import { CreatePlayerDto } from '../models/player.model'
import { playersRepository } from '../repositiry/players.repository'

class PlayersService {
    async getUserPlayers(userId: string) {
        try {
            return await playersRepository.getUserPlayers(userId)
        } catch (error) {
            throw new PgException(error)
        }
    }

    async addPlayer(player: CreatePlayerDto) {
        try {
            return await playersRepository.addPlayer(player)
        } catch (error) {
            throw new PgException(error)
        }
    }
}

export const playersService = new PlayersService()

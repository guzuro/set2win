import PgException from '../exceptions/PgException'
import { RawPlayerDto } from '../models/player.model'
import { playersRepository } from '../repositiry/players.repository'

class PlayersService {
    async getUserPlayers(userId: string) {
        try {
            return await playersRepository.getUserPlayers(userId)
        } catch (error) {
            throw new PgException(error)
        }
    }

    async addPlayer(player: RawPlayerDto) {
        try {
            return await playersRepository.addPlayer(player)
        } catch (error) {
            throw new PgException(error)
        }
    }
}

export const playersService = new PlayersService()

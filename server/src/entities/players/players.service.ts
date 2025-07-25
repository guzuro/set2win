import { AVATAR_PUBLIC_URL } from '../../common/static/static.route'
import PgException from '../../exceptions/PgException'
import { PlayerCreateDto } from './player.model'
import { playersRepository } from './players.repository'

class PlayersService {
    async getUserPlayers(userId: string) {
        try {
            return await playersRepository.getUserPlayers(userId)
        } catch (error) {
            throw new PgException(error)
        }
    }

    async addPlayer(player: PlayerCreateDto) {
        try {
            if (!player.avatarUrl) {
                const imgType = player.sex === 'men' ? 'default-men.jpg' : 'default-women.jpg'

                player.avatarUrl = `${AVATAR_PUBLIC_URL}/${imgType}`
            }

            return await playersRepository.addPlayer(player)
        } catch (error) {
            throw new PgException(error)
        }
    }
}

export const playersService = new PlayersService()

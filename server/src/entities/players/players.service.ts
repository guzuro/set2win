import { AVATAR_PUBLIC_URL } from '../../common/static/static.route'
import PgException from '../../exceptions/PgException'
import { PlayerCreateDto } from './player.model'
import { playersRepository } from './players.repository'
import { playerWithAge } from './utils'

class PlayersService {
    async getUserPlayers(userId: string) {
        try {
            const players = await playersRepository.getUserPlayers(userId)

            return players.map(playerWithAge)
        } catch (error) {
            throw new PgException(error)
        }
    }

    async addPlayer(player: PlayerCreateDto) {
        try {
            if (!player.avatarUrl) {
                const imgType = player.sex === 'male' ? 'default-male.jpg' : 'default-female.jpg'

                player.avatarUrl = `${AVATAR_PUBLIC_URL}/${imgType}`
            }

            return await playersRepository.addPlayer(player)
        } catch (error) {
            throw new PgException(error)
        }
    }

    async getPlayerRankings(limit: number, page: number) {
        try {
            const _limit = limit > 50 ? 50 : 10
            const _offset = (page - 1) * limit

            const [players, total] = await Promise.all([
                playersRepository.getPlayersPagination(_limit, _offset),
                playersRepository.getAllPlayers(),
            ])

            return { players: players.map(playerWithAge), total: total.length }
        } catch (error) {
            throw new PgException(error)
        }
    }
}

export const playersService = new PlayersService()

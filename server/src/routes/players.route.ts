import Elysia, { error } from 'elysia'
import { playersService } from '../services/players.service'
import PgException from '../exceptions/PgException'
import { CreatePlayerDto, newPlayerSchema } from '../models/player.model'

const playersRoutes = new Elysia().group('players', (app) =>
    app
        .get('/', async ({ cookie }) => {
            try {
                const userId = cookie?.userId?.value

                if (userId) {
                    return {
                        players: await playersService.getUserPlayers(userId),
                    }
                }
            } catch (e) {
                if (e instanceof PgException) {
                    return error(e.status, e.message)
                }

                return error(500, 'Internal server error')
            }
        })
        .post(
            '/',
            async ({ body, cookie: { userId } }) => {
                try {
                    if (!userId.value) {
                        return error(401)
                    }

                    const playerDto: CreatePlayerDto = {
                        ...body,
                        userId: userId.value,
                    }

                    await playersService.addPlayer(playerDto)

                    return {
                        players: await playersService.getUserPlayers(userId.value),
                    }
                } catch (e) {
                    if (e instanceof PgException) {
                        return error(e.status, e.message)
                    }

                    return error(500, 'Internal server error')
                }
            },
            {
                body: newPlayerSchema,
            },
        ),
)

export default playersRoutes

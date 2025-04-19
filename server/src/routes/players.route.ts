import Elysia, { error } from 'elysia'
import { playersService } from '../services/players.service'
import PgException from '../exceptions/PgException'
import { newPlayerSchema } from '../models/player.model'

const playersRoutes = new Elysia().group('players', (app) =>
    app
        .get('/', async ({ cookie }) => {
            try {
                const userId = cookie?.userId?.value

                if (userId) {
                    return await playersService.getUserPlayers(userId)
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
            async ({ body }) => {
                try {
                    return await playersService.addPlayer(body)
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

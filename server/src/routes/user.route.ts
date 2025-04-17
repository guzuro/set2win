import Elysia, { error } from 'elysia'
import PgException from '../exceptions/PgException'
import { userService } from '../services/user.service'

const userRoutes = new Elysia().group('user', (app) =>
    app.get('/', async ({ cookie }) => {
        try {
            const uLogin = cookie?.auth?.value

            if (uLogin) {
                return await userService.get(uLogin)
            } else {
                return error(401, 'Unauthorized')
            }
        } catch (e) {
            if (e instanceof PgException) {
                return error(e.status, e.message)
            }

            return error(500, 'Internal server error')
        }
    }),
)

export default userRoutes

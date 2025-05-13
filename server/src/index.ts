import { Elysia, error } from 'elysia'
import { node } from '@elysiajs/node'
import authRoutes from './routes/auth.route'
import { cors } from '@elysiajs/cors'
import userRoutes from './routes/user.route'
import playersRoutes from './routes/players.route'
import { staticPlugin } from '@elysiajs/static'
import staticRoutes from './routes/static.route'

const app = new Elysia({ adapter: node() })
    .use(cors())
    .use(
        staticPlugin({
            assets: 'static',
        }),
    )
    .group('/api', (app) =>
        app.use(authRoutes).guard(
            {
                beforeHandle({ cookie }) {
                    if (!cookie?.userId?.value) {
                        return error(401)
                    }
                },
            },
            (app) => app.use(userRoutes).use(playersRoutes).use(staticRoutes),
        ),
    )
    .listen(3000, ({ hostname, port }) => {
        console.log(`🦊 Elysia is running at ${hostname}:${port}`)
    })

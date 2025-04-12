import { Elysia } from 'elysia'
import { node } from '@elysiajs/node'
import authRoutes from './routes/auth.route'
import { cors } from '@elysiajs/cors'

const app = new Elysia({ adapter: node() })
    .use(cors())
    .group('/api', (app) => app.use(authRoutes))
    .listen(3000, ({ hostname, port }) => {
        console.log(`🦊 Elysia is running at ${hostname}:${port}`)
    })

import Elysia, { error } from 'elysia'
import { signInSchema, signUpchema } from '../models/auth.model'
import { PasswordNotMatchException } from '../exceptions/PasswordNotMatchException'
import { signupHandler } from '../controllers/auth.controller'

const authRoutes = new Elysia().group('auth', (app) =>
    app
        .post('/signin', ({ body }) => {}, { body: signInSchema })
        .post(
            '/signup',
            ({ body }) => {
                if (body.password !== body.passwordConfirm) {
                    return error(400, PasswordNotMatchException)
                }

                try {
                    signupHandler(body)

                    return {
                        message: 'User created, log in with your login and password',
                    }
                } catch (e) {
                    return error(500, e)
                }
            },
            { body: signUpchema },
        ),
)

export default authRoutes

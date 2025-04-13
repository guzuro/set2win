import Elysia, { error } from 'elysia'
import { signInSchema, signUpchema } from '../models/auth.model'
import { PasswordNotMatchException } from '../exceptions/PasswordNotMatchException'
import { authService } from '../services/auth.service'
import PgException from '../exceptions/PgException'

const authRoutes = new Elysia().group('auth', (app) =>
    app
        .post(
            '/signin',
            async ({ body, cookie }) => {
                try {
                    const userDetails = await authService.signin(body)

                    cookie.auth.set({
                        value: userDetails.login,
                        maxAge: 60 * 5, // 5m
                    })

                    return userDetails
                } catch (e) {
                    if (e instanceof PgException) {
                        return error(e.status, e.message)
                    }

                    return error(500, 'Internal server error')
                }
            },
            { body: signInSchema },
        )
        .post(
            '/signup',
            async ({ body }) => {
                if (body.password !== body.passwordConfirm) {
                    return error(400, PasswordNotMatchException)
                }

                try {
                    await authService.signup(body)

                    return {
                        message: 'User created, log in with your login and password',
                    }
                } catch (e) {
                    if (e instanceof PgException) {
                        return error(e.status, e.message)
                    }

                    return error(500, 'Internal server error')
                }
            },
            { body: signUpchema },
        ),
)

export default authRoutes

import { t } from 'elysia'

export const signInSchema = t.Object({
    login: t.String(),
    password: t.String({ minLength: 6 }),
})

export type SignInDto = typeof signInSchema.static

export const signUpchema = t.Object({
    login: t.String(),
    password: t.String({ minLength: 6 }),
    passwordConfirm: t.String({ minLength: 6 }),
})

export type SignUpDto = typeof signUpchema.static

export type CreateUserDto = Omit<SignUpDto, 'passwordConfirm'>

import { db } from '../db'
import { usersTable } from '../db/schemas'
import { SignInDto, SignUpDto } from '../models/auth.model'

export async function signupHandler(body: SignUpDto) {
    try {
        return await db.insert(usersTable).values(body)
    } catch (error) {
        console.error('Error while creating user', error)

        throw error
    }
}

export function signinHandler(body: SignInDto) {}

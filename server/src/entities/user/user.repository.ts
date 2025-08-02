import { eq } from 'drizzle-orm'
import { db } from '../../db'
import PgException from '../../exceptions/PgException'
import { CreateUserDto } from '../../common/auth/auth.model'
import { usersTable } from './userTable'

class UserRepository {
    async createUser(body: CreateUserDto) {
        try {
            return await db.insert(usersTable).values(body)
        } catch (error) {
            throw new PgException(error)
        }
    }

    async getUserByLogin(login: string) {
        return await db.select().from(usersTable).where(eq(usersTable.login, login))
    }

    async getUserById(id: string) {
        return await db.select().from(usersTable).where(eq(usersTable.id, id))
    }
}

export const userRepository = new UserRepository()

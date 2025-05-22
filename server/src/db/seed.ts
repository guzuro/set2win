import { faker } from '@faker-js/faker'
import { eq, count } from 'drizzle-orm'
import { db } from '.'
import { playersTable, usersTable } from './schemas'
import { countries } from '../../includes/countries'
import { CredentialsService } from '../services/credentials.service'
import { HandValues, SurfaceValues } from './schemas/constants'

const SYSTEM_USER_ID = process.env.SYSTEM_USER_ID!
const SYSTEM_USER_LOGIN = process.env.SYSTEM_USER_LOGIN!
const SYSTEM_USER_PASSWORD = process.env.SYSTEM_USER_PASSWORD!

export async function seedInitialData() {
    await seedSystemUser()

    await seedInitialPlayers()
}

async function seedSystemUser() {
    const existingUser = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.id, SYSTEM_USER_ID))
        .limit(1)

    if (!existingUser.length) {
        const hashedPassword = await CredentialsService.hashValue(SYSTEM_USER_PASSWORD)

        await db.insert(usersTable).values({
            id: SYSTEM_USER_ID,
            login: SYSTEM_USER_LOGIN,
            password: hashedPassword,
        })
    }
}

async function seedInitialPlayers() {
    const playersCount = await db.select({ count: count() }).from(playersTable)

    if (!playersCount[0].count) {
        await generatePlayers(10, 'men')
        await generatePlayers(10, 'women')
    }
}

async function generatePlayers(count: number, sex: 'men' | 'women') {
    const countryCodes = Object.keys(countries)

    for (let i = 0; i < count; i++) {
        await db.insert(playersTable).values({
            userId: SYSTEM_USER_ID,
            sex,
            fullName:
                sex === 'men'
                    ? faker.person.fullName({ sex: 'male' })
                    : faker.person.fullName({ sex: 'female' }),
            country: faker.helpers.arrayElement(countryCodes),
            birthDate: faker.date.birthdate().toISOString(),
            rating: faker.number.int({
                min: 1,
                max: 500,
            }),
            hand: faker.helpers.arrayElement(HandValues),
            favoriteSurface: faker.helpers.arrayElement(SurfaceValues),
            avatarUrl: null,
        })
    }
}

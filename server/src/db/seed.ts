import { faker } from '@faker-js/faker'
import { eq, count } from 'drizzle-orm'
import { db } from '.'
import { HandValues, SurfaceValues } from './schemas/constants'
import { hashValue } from '../../utils/credentials'
import { countries } from '../common/includes/countries'
import { playersTable, usersTable } from './schemas'

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
        const hashedPassword = await hashValue(SYSTEM_USER_PASSWORD)

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
        await generatePlayers(10, 'male')
        await generatePlayers(10, 'female')
    }
}

async function generatePlayers(count: number, sex: 'male' | 'female') {
    const countryCodes = Object.keys(countries)

    for (let i = 0; i < count; i++) {
        const rating = faker.number.int({
                min: 1,
                max: 100,
            })

        await db.insert(playersTable).values({
            userId: SYSTEM_USER_ID,
            sex,
            fullName: faker.person.fullName({ sex }),
            country: faker.helpers.arrayElement(countryCodes),
            birthDate: faker.date.birthdate().toISOString(),
            rating,
            points: 1000 - rating * 10,
            hand: faker.helpers.arrayElement(HandValues),
            favoriteSurface: faker.helpers.arrayElement(SurfaceValues),
            avatarUrl: `static/avatars/default-${sex}.jpg`,
        })
    }
}

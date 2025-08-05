import { pgTable, uuid, text, date, integer, timestamp, pgEnum } from 'drizzle-orm/pg-core'
import { sexEnum, handEnum, surfaceEnum } from '../../db/schemas'
import { usersTable } from '../user/userTable'

export const playersTable = pgTable('players', {
    id: uuid('id').primaryKey().defaultRandom(),

    userId: uuid('user_id')
        .references(() => usersTable.id)
        .notNull(),

    fullName: text('full_name').notNull(),
    sex: sexEnum('sex').notNull(),
    country: text('country').notNull(),
    birthDate: date('birth_date').notNull(),
    
    rating: integer('rating').notNull().default(100),
    points: integer('points').notNull().default(0),

    hand: handEnum('hand').notNull(),
    favoriteSurface: surfaceEnum('favorite_surface').notNull(),
    avatarUrl: text('avatar_url'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

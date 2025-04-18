import { pgTable, uuid, text, date, integer, timestamp, pgEnum } from 'drizzle-orm/pg-core'
import { usersTable } from './userTable' // если ты уже завёл таблицу пользователей

export const handEnum = pgEnum('hand', ['right', 'left'])
export const surfaceEnum = pgEnum('surface', ['clay', 'grass', 'hard'])

export const playersTable = pgTable('players', {
    id: uuid('id').primaryKey().defaultRandom(),

    userId: uuid('user_id')
        .references(() => usersTable.id)
        .notNull(),

    fullName: text('full_name').notNull(),
    country: text('country').notNull(),
    birthDate: date('birth_date').notNull(),
    rating: integer('rating').notNull().default(100),

    hand: handEnum('handedness').notNull(),
    favoriteSurface: surfaceEnum('favorite_surface').notNull(),

    avatarUrl: text('avatar_url'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

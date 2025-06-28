import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { usersTable } from '../../entities/user/userTable'
import { surfaceEnum } from './enums'

export const tournamentsTable = pgTable('tournaments', {
    id: uuid('id').primaryKey().defaultRandom(),

    userId: uuid('user_id')
        .notNull()
        .references(() => usersTable.id, { onDelete: 'cascade' }),
    name: text('name').notNull(),
    surface: surfaceEnum('surface').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
})

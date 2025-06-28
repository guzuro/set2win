import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core'

export const usersTable = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom().notNull(),
    login: varchar().notNull().unique(),
    password: varchar().notNull(),
})

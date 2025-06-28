import { jsonb, pgTable, uuid, timestamp } from 'drizzle-orm/pg-core'
import { playersTable } from '../../entities/players'
import { usersTable } from '../../entities/user/userTable'
import { tournamentsTable } from './tournamentsTable'

export const matches = pgTable('matches', {
    id: uuid('id').primaryKey().defaultRandom(),
    tournamentId: uuid('tournament_id').references(() => tournamentsTable.id, {
        onDelete: 'set null',
    }),
    userId: uuid('user_id')
        .notNull()
        .references(() => usersTable.id, { onDelete: 'cascade' }),

    player1Id: uuid('player_1_id')
        .notNull()
        .references(() => playersTable.id, { onDelete: 'cascade' }),
    player2Id: uuid('player_2_id')
        .notNull()
        .references(() => playersTable.id, { onDelete: 'cascade' }),
    winnerId: uuid('winner_id')
        .notNull()
        .references(() => playersTable.id, { onDelete: 'cascade' }),

    score: jsonb('score').notNull(),
    date: timestamp('date').defaultNow(),
})

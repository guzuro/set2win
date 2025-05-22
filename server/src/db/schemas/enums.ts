import { pgEnum } from 'drizzle-orm/pg-core'

export const surfaceEnum = pgEnum('surface', ['clay', 'grass', 'hard'])
export const handEnum = pgEnum('hand', ['right', 'left'])
export const sexEnum = pgEnum('sex', ['men', 'women'])

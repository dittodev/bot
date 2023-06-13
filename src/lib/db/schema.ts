import { pgTable, text, date, integer } from 'drizzle-orm/pg-core'

export const user = pgTable('users', {
  discordId: text('discord_id').primaryKey().notNull(),
  createdAt: date('created_at'),
  username: text('username')
})

export const guild = pgTable('guilds', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  memberCount: integer('member_count').notNull()
})

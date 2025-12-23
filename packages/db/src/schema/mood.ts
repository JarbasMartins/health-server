import { user } from './auth';
import { sql } from 'drizzle-orm'
import { sqliteTable, text, integer, uniqueIndex  } from "drizzle-orm/sqlite-core";

export const mood = sqliteTable('mood', {
  id: text('id').primaryKey(),
  userId: text("user_id").notNull().references(() => user.id, {onDelete: 'cascade'}),
  date: text('date').notNull(),
  mood: text('mood').notNull(),
  tags: text('tags').notNull(),
  comment: text('comment'),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
     .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
     .$onUpdate(() => new Date())
     .notNull(),
}, (table) => [
    uniqueIndex("mood_user_date_idx").on(table.userId, table.date),
  ])

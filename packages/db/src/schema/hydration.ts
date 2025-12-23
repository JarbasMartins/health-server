import { user } from './auth';
import { sql } from 'drizzle-orm'
import  {sqliteTable, integer, text, uniqueIndex }from 'drizzle-orm/sqlite-core'


export const hydration = sqliteTable('hydration', {
  id: text("id").primaryKey(),
  userId: text('user_id').notNull().references(() => user.id, {onDelete: 'cascade'}),
  totalMl: integer('total_ml').notNull(),
  date: text('date').notNull(),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
     .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
     .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
     .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
     .$onUpdate(() => new Date())
     .notNull(),
}, (table) => [
    uniqueIndex("hydration_user_date_idx").on(table.userId, table.date),
  ])

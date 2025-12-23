import { user } from './auth';
import { sql, relations }from 'drizzle-orm'
import { sqliteTable, text, integer  } from "drizzle-orm/sqlite-core";


export const medication = sqliteTable('medication', {
  id: text('id').primaryKey(),
  userId: text("user_id").notNull().references(() => user.id, {onDelete: 'cascade'}),
  name: text('name').notNull(),
  dosage: text('dosage').notNull(),
  frequency: text('frequency').notNull(),
  category: text('category').notNull(),
  comment: text('comment'),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
     .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
     .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
     .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
     .$onUpdate(() => new Date())
     .notNull(),
})

export const medicationSchedule = sqliteTable('medication_schedule', {
  id: text('id').primaryKey(),
  medicationId: text('medication_id')
      .notNull()
      .references(() => medication.id, { onDelete: 'cascade' }),
    time: text('time').notNull(),
})

export const medicationRelations = relations(medication, ({many}) => ({
  schedules: many(medicationSchedule),
}))

export const medicationScheduleRelations = relations(
  medicationSchedule,
  ({ one }) => ({
    medication: one(medication, {
      fields: [medicationSchedule.medicationId],
      references: [medication.id],
    }),
  })
);

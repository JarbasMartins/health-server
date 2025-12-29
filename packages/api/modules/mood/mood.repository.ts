import { and, eq } from 'drizzle-orm';
import { mood } from '@server/db/schema/mood';
import { LibSQLDatabase } from 'drizzle-orm/libsql';

interface SaveMoodInput {
    id: string;
    userId: string;
    date: string;
    mood: string;
    tags: string;
    comment?: string;
}

export const moodRepository = (db: LibSQLDatabase<any>) => ({
    findByUserAndDate: async (userId: string, date: string) => {
        const [result] = await db
            .select()
            .from(mood)
            .where(and(eq(mood.userId, userId), eq(mood.date, date)));

        return result;
    },

    saveDailyMood: async (data: SaveMoodInput) => {
        const [result] = await db
            .insert(mood)
            .values(data)
            .onConflictDoUpdate({
                target: [mood.userId, mood.date],
                set: {
                    mood: data.mood,
                    tags: data.tags,
                    comment: data.comment,
                    updatedAt: new Date(),
                },
            })
            .returning();

        return result;
    },
});

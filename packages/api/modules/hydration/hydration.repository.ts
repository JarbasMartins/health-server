import { and, eq } from 'drizzle-orm';
import { LibSQLDatabase } from 'drizzle-orm/libsql';
import { hydration } from '@server/db/schema/hydration';

interface SaveHydrationInput {
    id: string;
    userId: string;
    totalMl: number;
    date: string;
}

export const hydrationRepository = (db: LibSQLDatabase<any>) => ({
    findByUserAndDate: async (userId: string, date: string) => {
        const [result] = await db
            .select()
            .from(hydration)
            .where(and(eq(hydration.userId, userId), eq(hydration.date, date)));

        return result ?? null;
    },

    saveDailyIntake: async (data: SaveHydrationInput) => {
        return await db
            .insert(hydration)
            .values(data)
            .onConflictDoUpdate({
                target: [hydration.userId, hydration.date],
                set: {
                    totalMl: data.totalMl,
                    updatedAt: new Date(),
                },
            });
    },
});

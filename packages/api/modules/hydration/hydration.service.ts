import { hydrationRepository } from './hydration.repository';

interface SaveHydrationDTO {
    userId: string;
    totalMl: number;
    date: string;
}

export const hydrationService = (repo: ReturnType<typeof hydrationRepository>) => {
    return {
        saveIntake: async ({ userId, date, totalMl }: SaveHydrationDTO) => {
            const existingRecord = await repo.findByUserAndDate(userId, date);
            const payload = { id: existingRecord?.id ?? crypto.randomUUID(), userId: userId, date: date, totalMl: totalMl };
            return await repo.saveDailyIntake(payload);
        },

        getDailyIntake: async (userId: string, date: string) => {
            const record = await repo.findByUserAndDate(userId, date);
            if (!record) return { userId, date, totalMl: 0 };
            return record;
        },
    };
};

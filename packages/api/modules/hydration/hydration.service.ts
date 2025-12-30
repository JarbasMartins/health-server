import { hydrationRepository } from './hydration.repository';

interface SaveHydrationDTO {
    userId: string;
    totalMl: number;
    date: string;
}

export const hydrationService = (repo: ReturnType<typeof hydrationRepository>) => {
    return {
        getDailyIntake: async (userId: string, date: string) => {
            const record = await repo.findByUserAndDate(userId, date);
            if (!record) return { userId, date, totalMl: 0 };
            return record;
        },
        saveIntake: async (dto: SaveHydrationDTO) => {
            const payload = { id: crypto.randomUUID(), ...dto };
            return await repo.saveDailyIntake(payload);
        },
    };
};

import { moodRepository } from './mood.repository';

interface SaveMoodDTO {
    userId: string;
    date: string;
    mood: string;
    tags: string;
    comment?: string;
}

export const moodService = (repo: ReturnType<typeof moodRepository>) => {
    return {
        getDailyMood: async (userId: string, date: string) => {
            const record = await repo.findByUserAndDate(userId, date);
            if (!record) return { userId, date, mood: '', tags: '', comment: '' };
            return record;
        },

        saveMood: async (dto: SaveMoodDTO) => {
            const payload = { id: crypto.randomUUID(), ...dto };
            return await repo.saveDailyMood(payload);
        },
    };
};

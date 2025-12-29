import type { Request, Response } from 'express';
import { moodService } from './mood.service';

export const moodController = (svc: ReturnType<typeof moodService>) => {
    return {
        handleSaveMood: async (req: Request, res: Response) => {
            try {
                const { userId, date, mood, tags, comment } = req.body;
                if (!userId || !date || !mood || !tags || !comment) {
                    return res.status(400).json({ error: 'Faltam dados obrigatórios.' });
                }
                const result = await svc.saveMood({ userId, date, mood, tags, comment });
                return res.status(200).json(result);
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Erro interno ao salvar emoção.' });
            }
        },

        handleDailyMood: async (req: Request, res: Response) => {
            try {
                const { userId, date } = req.params;
                if (!userId || !date) {
                    return res.status(400).json({ error: 'User ID e Date são necessários.' });
                }
                const data = await svc.getDailyMood(userId as string, date as string);
                return res.status(200).json(data);
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Erro ao buscar dados do dia' });
            }
        },
    };
};

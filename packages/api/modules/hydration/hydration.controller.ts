import type { Request, Response } from 'express';
import { hydrationService } from './hydration.service';

export const hydrationController = (svc: ReturnType<typeof hydrationService>) => {
    return {
        handleSave: async (req: Request, res: Response) => {
            try {
                const { userId, date, totalMl } = req.body;
                if (!userId || !date || !totalMl) return res.status(400).json({ error: 'Faltam dados obrigatórios.' });
                const result = await svc.saveIntake({ userId, date, totalMl });
                return res.status(200).json(result);
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Erro interno ao salvar hidratação.' });
            }
        },

        handleGetDaily: async (req: Request, res: Response) => {
            try {
                const { userId, date } = req.params;
                if (!userId || !date) return res.status(400).json({ error: 'User ID e Date são necessários.' });
                const data = await svc.getDailyIntake(userId as string, date as string);
                return res.status(200).json(data);
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Erro ao buscar dados do dia' });
            }
        },
    };
};

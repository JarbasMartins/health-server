import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { auth } from '@server/auth';
import { toNodeHandler } from 'better-auth/node';
import { router as hydrationRoutes } from '@api/modules/hydration/hydration.routes';
import { router as moodRoutes } from '@api/modules/mood/mood.routes';

const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN || '',
        methods: ['GET', 'POST', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    })
);

app.all('/api/auth{/*path}', toNodeHandler(auth));

app.use(express.json());

app.use('/api/hydration', hydrationRoutes);
app.use('/api/mood', moodRoutes);

app.get('/', (_req, res) => {
    res.status(200).send('OK');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

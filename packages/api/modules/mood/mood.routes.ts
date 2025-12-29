import { controller } from '.';
import { Router } from 'express';

const router = Router();

router.post('/', controller.handleSaveMood);
router.get('/:userId/:date', controller.handleDailyMood);

export { router };

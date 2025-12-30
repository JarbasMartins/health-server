import { Router } from 'express';
import { controller } from './index';
const router = Router();

router.post('/', controller.handleSaveIntake);
router.get('/:userId/:date', controller.handleDailyIntake);

export { router };
